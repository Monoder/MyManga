package com.monoder.mymanga.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.monoder.mymanga.common.constant.MangaDetailConstant;
import com.monoder.mymanga.common.enums.ImageFormatEnum;
import com.monoder.mymanga.common.enums.MangaCategoryEnum;
import com.monoder.mymanga.entity.dto.MangaDetailDTO;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.entity.vo.MangaDetailVO;
import com.monoder.mymanga.mapper.MangaDetailMapper;
import com.monoder.mymanga.service.IMangaDetailService;
import com.monoder.mymanga.service.IMangaInfoService;
import com.monoder.mymanga.service.exception.InsertException;
import com.monoder.mymanga.service.exception.SelectException;
import com.monoder.mymanga.utils.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.monoder.mymanga.common.constant.MangaSourceConstant.DEFAULT_WRAPPER_BASE64_PREFIX;
import static com.monoder.mymanga.common.constant.MangaSourceConstant.MAX_SIZE;

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
    public JsonResult< PageInfo< MangaDetailDTO > > listMangaDetailByGuid( JsonResult< String > requestJsonResult ){
        DataTables dataTables = Optional.ofNullable( requestJsonResult.getDataTables() ).orElse( new DataTables() );
        if( dataTables.getOrder().isEmpty() ){
            dataTables.setOrder( Collections.singletonList( new DataTables.Order() ) );
        }
        dataTables.setPageNum( Optional.ofNullable( dataTables.getPageNum() ).orElse( 1 ) );
        dataTables.setPageSize( Optional.ofNullable( dataTables.getPageSize() ).orElse( 25 ) );
        // 配置 PageHelper
        PageHelper.startPage( dataTables.getPageNum(), dataTables.getPageSize() );
        List< MangaDetailVO > mangaDetailVOS = mangaDetailMapper.listMangaDetailByGuid( requestJsonResult.getData() );
        // 取出分页后的数据
        PageInfo< MangaDetailVO > mangaDetailVOPageInfo = new PageInfo<>( mangaDetailVOS );
        // 将VO对象从 PageHelper 中取出并转换成DTO对象
        List< MangaDetailVO > mangaDetailVOList = mangaDetailVOPageInfo.getList();
        List< MangaDetailDTO > mangaDetailDTOList = BeanConvertUtils.convertListWithNested( mangaDetailVOList, MangaDetailDTO.class );
        // 生成新的 PageInfo 对象，保留原来的分页信息
        PageInfo< MangaDetailDTO > mangaDetailDTOPageInfo = PageInfoUtil.copy( mangaDetailVOPageInfo, mangaDetailDTOList );
        // 初始化 JsonResult 用来存放分页后的数据
        JsonResult< PageInfo< MangaDetailDTO > > jsonResult = new JsonResult<>( mangaDetailDTOPageInfo );
        jsonResult.setDataTables( dataTables );
        return jsonResult;
    }

    @Override
    public String getPicSource( String picId ){
        // 1. 取出图片 ID
        MangaDetailVO mangaDetailVO = mangaDetailMapper.getPicPathById( picId );
        if( mangaDetailVO.getGuid() == null ){
            String errorMsg = "ERROR: 【getPicPathById】找不到对应图片！【ID-" + picId + "】";
            throw new SelectException( errorMsg );
        }
        String filePath = MANGA_PATH + mangaDetailVO.getPicPath();
        // 2. 处理本地图片
        File file = new File( filePath );
        if( !file.exists() ){
            throw new SelectException( "ERROR: 文件不存在：" + filePath );
        }
        try{
            byte[] imageBytes = Files.readAllBytes( file.toPath() );
            byte[] compressedImageBytes = ImageUtils.compressImageBySize( imageBytes, ImageFormatEnum.JPEG, MAX_SIZE );

            String base64String = DEFAULT_WRAPPER_BASE64_PREFIX + Base64.getEncoder().encodeToString( compressedImageBytes );
            return base64String;
        } catch( IOException e ){
            throw new SelectException( "ERROR: 读取图片文件失败：" + filePath, e );
        }
    }
}
