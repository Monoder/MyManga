package com.monoder.mymanga.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.monoder.mymanga.common.constant.MangaDetailConstant;
import com.monoder.mymanga.common.enums.ImageFormatEnum;
import com.monoder.mymanga.entity.dto.DataTables;
import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;
import com.monoder.mymanga.entity.dto.JsonResult;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.DicEnumCategoryVO;
import com.monoder.mymanga.entity.vo.MangaInfoVO;
import com.monoder.mymanga.mapper.MangaDetailMapper;
import com.monoder.mymanga.mapper.MangaInfoMapper;
import com.monoder.mymanga.service.IFileHandleService;
import com.monoder.mymanga.service.IMangaDetailService;
import com.monoder.mymanga.service.IMangaInfoService;
import com.monoder.mymanga.service.exception.FileHandleException;
import com.monoder.mymanga.service.exception.InsertException;
import com.monoder.mymanga.service.exception.SelectException;
import com.monoder.mymanga.tools.SystemInfoTools;
import com.monoder.mymanga.utils.BeanConvertUtils;
import com.monoder.mymanga.utils.ImageUtils;
import com.monoder.mymanga.utils.PageInfoUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.monoder.mymanga.common.constant.MangaSourceConstant.DEFAULT_WRAPPER_BASE64_PREFIX;
import static com.monoder.mymanga.common.constant.MangaSourceConstant.MAX_SIZE;

@Service
public class MangaInfoImpl implements IMangaInfoService{

    private final Logger logger = LoggerFactory.getLogger( IMangaInfoService.class );

    @Value( "${file.uploadFolder}" )
    private String UPLOAD_HOME;
    public static final String MANGA_HOME = MangaDetailConstant.MANGA_HOME;     // MANGA_PATH = "J:\\♥EX-Hentai♥\\♥MyManga♥\\"
    @Autowired
    private IFileHandleService iFileHandleService;
    @Autowired
    private IMangaDetailService iMangaDetailService;
    @Autowired
    private MangaInfoMapper mangaInfoMapper;
    @Autowired
    private MangaDetailMapper mangaDetailMapper;

    @Override
    @Transactional
    public JsonResult< String > addManga( MangaInfoDTO mangaInfoDTO ){
        // 1. 取出数据转VO并判断图库是否存在
        MangaInfoVO mangaInfoVO = BeanConvertUtils.convertWithNested( mangaInfoDTO, MangaInfoVO.class, "dicEnumCategoryDTO", DicEnumCategoryVO.class );
        String existGuid = mangaInfoMapper.getGuidByName( mangaInfoVO.getMangaName() );
        String uploadMangaPath = mangaInfoDTO.getMangaPath();
        if( existGuid != null ){
            String errorMsg = "ERROR: 该漫画已存在！【MangaName-" + mangaInfoVO.getMangaName() + "】";
            logger.error( errorMsg );
            iFileHandleService.uploadFolderDelete( uploadMangaPath );
            throw new InsertException( errorMsg );
        }
        // 1. IFileHandleService 进行处理
        MangaInfoDTO newMangaInfoDTO = iFileHandleService.mangaFileRename( mangaInfoDTO );
        String mangaPath = newMangaInfoDTO.getMangaPath();
        try{
            // 2. 图片保存到本地
            iFileHandleService.mangaFileMove( mangaInfoDTO, newMangaInfoDTO );
            // 3. IMangaInfoService 将封面添加到数据库，并获取添加后的对象
            newMangaInfoDTO = addMangaInfo( newMangaInfoDTO );
            // 4. iMangaDetailService 将漫画详情添加到数据库
            Integer rows = iMangaDetailService.batchAddMangaDetail( newMangaInfoDTO );
            // 5. 删除上传文件夹中的文件
            iFileHandleService.uploadFolderDelete( uploadMangaPath );
            // 6. 包装成 JsonResult 并返回图库 Guid
            JsonResult< String > jsonResult = new JsonResult<>( newMangaInfoDTO.getGuid() );
            jsonResult.setRows( rows );
            return jsonResult;
        } catch( FileHandleException e ){
            iFileHandleService.uploadFolderDelete( uploadMangaPath );
            throw new InsertException( e.getMessage() );
        } catch( Exception e ){
            iFileHandleService.uploadFolderDelete( uploadMangaPath );
            iFileHandleService.mangaFolderDelete( mangaPath );
            throw new InsertException( e.getMessage() );
        }
    }

    @Override
    public MangaInfoDTO addMangaInfo( MangaInfoDTO mangaInfoDTO ){
        // 1. 取出数据
        String wrapperPath = UPLOAD_HOME + mangaInfoDTO.getWrapper();
        // 2. 转 VO
        MangaInfoVO mangaInfoVO = BeanConvertUtils.convertWithNested( mangaInfoDTO, MangaInfoVO.class, "dicEnumCategoryDTO", DicEnumCategoryVO.class );
        // 3. 补全其他信息
        mangaInfoVO.setWrapper( ImageUtils.imageToByte( wrapperPath ) );
        mangaInfoVO.setIsDeleted( 2 );
        mangaInfoVO.setUpdateTime( SystemInfoTools.getDataBaseTime() );
        mangaInfoVO.setCreateTime( SystemInfoTools.getDataBaseTime() );
        mangaInfoVO.setCreator( SystemInfoTools.getUser() );
        // 4. 添加数据库，设置了 selectKey，会将生成的 Guid 自动返回到 newMangaInfoVO 中
        Integer rows = mangaInfoMapper.addMangaInfo( mangaInfoVO );
        // 5. 根据 rows 判断是否插入成功
        if( rows != 1 ){
            String errorMsg = "ERROR: 【addMangaInfo】插入失败，请联系管理员！";
            logger.error( errorMsg );
            throw new InsertException( errorMsg );
        }
        // 6. 获取插入的数据
        MangaInfoVO resultMangaInfoVO = mangaInfoMapper.getMangaInfoByGuid( mangaInfoVO.getGuid() );
        // 7. 转 DTO 返回
        MangaInfoDTO newMangaInfoDTO = BeanConvertUtils.convertWithNested( resultMangaInfoVO, MangaInfoDTO.class, "dicEnumCategoryVO", DicEnumCategoryDTO.class );
        newMangaInfoDTO.setMangaDetailDTOList( mangaInfoDTO.getMangaDetailDTOList() );
        return newMangaInfoDTO;
    }

    @Override
    public Integer batchAddMangaInfo( List< MangaInfo > mangaInfoList ){
        Integer rows = mangaInfoMapper.batchAddMangaInfo( mangaInfoList );
        return rows;
    }

    @Override
    public Integer deleteMangaInfo( String guid ){
        return mangaInfoMapper.deleteMangaInfo( guid );
    }

    @Override
    @Transactional
    public boolean batchDeleteMangaInfo( List< String > guidList ){
        Integer originMangaInfoRows = mangaInfoMapper.getRowsByGuids( guidList );
        Integer deleteMangaInfoRows = mangaInfoMapper.batchDeleteMangaInfo( guidList );
        Integer originMangaDetailRows = mangaDetailMapper.getRowsByGuids( guidList );
        Integer deleteMangaDetailRows = mangaDetailMapper.batchDeleteMangaDetail( guidList );
        if( deleteMangaInfoRows != originMangaInfoRows || deleteMangaDetailRows != originMangaDetailRows ){
            throw new RuntimeException( "删除操作失败，整个事务被回滚" );
        }
        return true;
    }

    @Override
    public JsonResult listMangaInfo( JsonResult< Void > requestJsonResult ){
        // 从 requestJsonResult 中获取 DataTables 格式的请求参数
        DataTables dataTables = Optional.ofNullable( requestJsonResult.getDataTables() ).orElse( new DataTables() );

        // 如果 DataTables 中的 order 为空，则添加一个默认的 order
        if( dataTables.getOrder().isEmpty() ){
            dataTables.setOrder( Collections.singletonList( new DataTables.Order() ) );
        }
        // 如果 DataTables 中的 pageNum 为空，则设置默认值 1
        dataTables.setPageNum( Optional.ofNullable( dataTables.getPageNum() ).orElse( 1 ) );
        // 如果 DataTables 中的 pageSize 为空，则设置默认值 25
        dataTables.setPageSize( Optional.ofNullable( dataTables.getPageSize() ).orElse( 25 ) );

        // 配置 PageHelper
        PageHelper.startPage( dataTables.getPageNum(), dataTables.getPageSize() );
        List< MangaInfoVO > mangaInfoVOS = mangaInfoMapper.listMangaInfo( dataTables );

        // 取出分页后的数据
        PageInfo< MangaInfoVO > mangaInfoVOPageInfo = new PageInfo<>( mangaInfoVOS );

        // 将VO对象从 PageHelper 中取出并转换成DTO对象
        List< MangaInfoVO > mangaInfoVOList = mangaInfoVOPageInfo.getList();
        List< MangaInfoDTO > mangaInfoDTOList = BeanConvertUtils.convertListWithNested( mangaInfoVOList, MangaInfoDTO.class, "dicEnumCategoryVO", DicEnumCategoryDTO.class );

        // 生成新的 PageInfo 对象，保留原来的分页信息
        PageInfo< MangaInfoDTO > mangaInfoDTOPageInfo = PageInfoUtil.copy( mangaInfoVOPageInfo, mangaInfoDTOList );

        // 初始化 JsonResult 用来存放分页后的数据
        JsonResult< Object > jsonResult = new JsonResult<>();
        jsonResult.setDataTables( dataTables );
        jsonResult.setData( mangaInfoDTOPageInfo );

        return jsonResult;
    }

    @Override
    public JsonResult getMangaInfoByGuid( String mangaGuid ){
        MangaInfoVO mangaInfoVO = mangaInfoMapper.getMangaInfoByGuid( mangaGuid );
        MangaInfoDTO mangaInfoDTO = BeanConvertUtils.convertWithNested( mangaInfoVO, MangaInfoDTO.class, "dicEnumCategoryVO", DicEnumCategoryDTO.class );
        return new JsonResult( mangaInfoDTO );
    }

    @Override
    public String getWrapperByGuid( String guid ){
        // 查询数据库获取 MangaInfoWrapper 对象
        MangaInfo mangaInfo = mangaInfoMapper.getWrapperByGuid( guid );
        // 1. 判断 guid 是否存在
        if( guid == null || mangaInfo == null ){
            String errorMsg = "ERROR: 漫画Guid为空或找不到对应漫画，请刷新重试或联系管理员！";
            logger.error( errorMsg );
            throw new SelectException( errorMsg );
        }
        if( mangaInfo.getWrapper() == null ){
            String errorMsg = "ERROR: 漫画封面未上传，请联系管理员！ 【GUID-" + guid + "】";
            logger.error( errorMsg );
            throw new SelectException( errorMsg );
        }

        // 获取包装器的字节数组
        byte[] imageBytes = mangaInfo.getWrapper();
        // 进行图片压缩
        byte[] compressedImageBytes = new byte[ 0 ];
        try{
            compressedImageBytes = ImageUtils.compressImageBySize( imageBytes, ImageFormatEnum.JPEG, MAX_SIZE );
        } catch( IOException e ){
            throw new RuntimeException( e );
        }
        // 将字节数组转换成 Base64 编码的字符串
        String base64String = DEFAULT_WRAPPER_BASE64_PREFIX + Base64.getEncoder().encodeToString( compressedImageBytes );

        return base64String;
    }


}
