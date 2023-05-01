package com.monoder.mymanga.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.monoder.mymanga.common.constant.MangaDetailConstant;
import com.monoder.mymanga.entity.dto.DataTables;
import com.monoder.mymanga.entity.dto.JsonResult;
import com.monoder.mymanga.entity.dto.MangaDetailDTO;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.vo.MangaDetailVO;
import com.monoder.mymanga.mapper.MangaDetailMapper;
import com.monoder.mymanga.service.IFileHandleService;
import com.monoder.mymanga.service.IMangaDetailService;
import com.monoder.mymanga.service.exception.FileHandleException;
import com.monoder.mymanga.service.exception.InsertException;
import com.monoder.mymanga.service.exception.SelectException;
import com.monoder.mymanga.utils.BeanConvertUtils;
import com.monoder.mymanga.utils.PageInfoUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class MangaDetailImpl implements IMangaDetailService{

    @Autowired
    private IFileHandleService iFileHandleService;
    @Autowired
    private MangaDetailMapper mangaDetailMapper;

    private final Logger logger = LoggerFactory.getLogger( IMangaDetailService.class );

    @Value( "${file.uploadFolder}" )
    private String UPLOAD_HOME;

    public static final String MANGA_PATH = MangaDetailConstant.MANGA_HOME;     // MANGA_PATH = "J:\\♥EX-Hentai♥\\♥MyManga♥\\"

    @Override
    public Integer batchAddMangaDetail( MangaInfoDTO mangaInfoDTO ){
        // 1. 取出需要的数据
        String mainGuid = mangaInfoDTO.getGuid();
        List< MangaDetailDTO > mangaDetailDTOList = mangaInfoDTO.getMangaDetailDTOList();    // 漫画详情集合
        // 2. 转 VO 进行处理
        List< MangaDetailVO > mangaDetailVOList = BeanConvertUtils.convertListWithNested( mangaDetailDTOList, MangaDetailVO.class );
        // 3. 数据补全
        for( MangaDetailVO mangaDetailVO: mangaDetailVOList ){
            mangaDetailVO.setMainGuid( mainGuid );
        }
        // 4. 添加到数据库
        Integer rows = mangaDetailMapper.batchAddMangaDetail( mangaDetailVOList );
        // 5. 根据 rows 判断是否插入成功
        if( rows != mangaDetailVOList.size() ){
            String errorMsg = "ERROR: 【batchAddMangaDetail】插入失败，请联系管理员！";
            logger.error( errorMsg );
            throw new InsertException( errorMsg );
        }
        return rows;
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
    public String getPicSource( String picId ) throws FileHandleException{
        // 1. 取出图片 ID
        MangaDetailVO mangaDetailVO = mangaDetailMapper.getPicPathById( picId );
        if( mangaDetailVO.getGuid() == null ){
            String errorMsg = "ERROR: 【getPicPathById】找不到对应图片！【ID-" + picId + "】";
            throw new SelectException( errorMsg );
        }
        String picPath = MANGA_PATH + mangaDetailVO.getPicPath();
        // 2. 处理本地图片
        return iFileHandleService.getMangaSource( picPath );
    }
}
