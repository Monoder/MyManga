package com.monoder.mymanga.service.impl;

import com.monoder.mymanga.common.constant.MangaDetailConstant;
import com.monoder.mymanga.common.enums.MangaCategoryEnum;
import com.monoder.mymanga.entity.dto.MangaDetailDTO;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.entity.vo.MangaDetailVO;
import com.monoder.mymanga.mapper.MangaDetailMapper;
import com.monoder.mymanga.service.IMangaDetailService;
import com.monoder.mymanga.service.IMangaInfoService;
import com.monoder.mymanga.service.exception.InsertException;
import com.monoder.mymanga.utils.BeanConvertUtils;
import com.monoder.mymanga.utils.FileUploadUtils;
import com.monoder.mymanga.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MangaDetailImpl implements IMangaDetailService{

    @Autowired
    private MangaDetailMapper mangaDetailMapper;

    private final Logger logger = LoggerFactory.getLogger( IMangaInfoService.class );

    @Value( "${file.uploadFolder}" )
    private String uploadFolder;

    public static final String MANGA_PATH = MangaDetailConstant.MANGA_PATH;     // MANGA_PATH = "J:\\♥EX-Hentai♥\\♥MyManga♥\\"

    @Override
    public Integer batchAddMangaDetail( MangaInfoDTO mangaInfoDTO ){
        // 1. 取出需要的数据
        String mainGuid = mangaInfoDTO.getGuid();   // 漫画主体Guid
        Integer categoryId = mangaInfoDTO.getDicEnumCategoryDTO().getDicEnumID();    // 漫画分类ID
        String mangaName = mangaInfoDTO.getMangaName();     // 漫画名称
        List< MangaDetailDTO > mangaDetailDTOList = mangaInfoDTO.getMangaDetailDTOList();    // 漫画详情集合
        // 已上传的文件路径和保存到本地的文件路径
        // originalPath = src/main/resources/static/uploads/UploadTest
        String originalPath = uploadFolder + mangaName;
        // relativePath = Doujinshi\UploadTest
        String relativePath = MangaCategoryEnum.getNameById( categoryId ) + "\\" + mangaName;
        // targetPath = J:\♥EX-Hentai♥\♥MyManga♥\Doujinshi\UploadTest
        String targetPath = MANGA_PATH + relativePath;
        String namePrefix = StringUtils.getFileNamePrefix();
        // 2. 转 VO 进行处理
        List< MangaDetailVO > mangaDetailVOList = BeanConvertUtils.convertListWithNested( mangaDetailDTOList, MangaDetailVO.class );
        // 3. 复制文件
        for( int index = 0; index < mangaDetailVOList.size(); index++ ){
            MangaDetailVO mangaDetailVO = mangaDetailVOList.get( index );
            String originalPicPath = originalPath + "/" + mangaDetailVO.getPicPath();
            String newFileName = FileUploadUtils.copyAndRenameFile( originalPicPath, targetPath, namePrefix, index );
            // 补全数据
            mangaDetailVO.setPicName( newFileName );
            mangaDetailVO.setPicPath( relativePath + "\\" + newFileName );
            mangaDetailVO.setMainGuid( mainGuid );
        }
        try{
            // 4. 添加到数据库
            Integer rows = mangaDetailMapper.batchAddMangaDetail( mangaDetailVOList );
            // 5. 根据 rows 判断是否插入成功
            if( rows != mangaDetailVOList.size() ){
                // 【batchAddMangaDetail】插入失败，将复制到本地的文件夹及文件全部删除
                FileUploadUtils.deleteDirectory( targetPath, 2 );
                String errorMsg = "ERROR: 【batchAddMangaDetail】插入失败，请联系管理员！";
                logger.error( errorMsg );
                throw new InsertException( errorMsg );
            }
            return rows;
        } catch( Exception e ){
            // 插入失败，将复制到本地的文件夹及文件全部删除
            FileUploadUtils.deleteDirectory( targetPath, 2 );
            String errorMsg = "ERROR: 【batchAddMangaDetail】数据库插入失败，请联系管理员！";
            logger.error( errorMsg, e );
            throw new InsertException( errorMsg, e );
        }

    }

    @Override
    public JsonResult listMangaDetailByGuid( String MangaGuid ){
//        List< MangaDetail > mangaDetailList = mangaDetailMapper
        return null;
    }
}
