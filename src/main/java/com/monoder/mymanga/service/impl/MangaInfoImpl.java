package com.monoder.mymanga.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.monoder.mymanga.common.enums.ImageFormat;
import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.DicEnumCategoryVO;
import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.entity.vo.MangaInfoVO;
import com.monoder.mymanga.mapper.MangaInfoMapper;
import com.monoder.mymanga.service.IMangaInfoService;
import com.monoder.mymanga.service.exception.SelectException;
import com.monoder.mymanga.utils.BeanConvertUtils;
import com.monoder.mymanga.utils.ImageUtils;
import com.monoder.mymanga.utils.PageInfoUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.monoder.mymanga.common.constant.MangaWrapperConstant.DEFAULT_WRAPPER_BASE64_PREFIX;
import static com.monoder.mymanga.common.constant.MangaWrapperConstant.MAX_SIZE;

@Service
public class MangaInfoImpl implements IMangaInfoService{

    private final Logger logger = LoggerFactory.getLogger( IMangaInfoService.class );

    @Value( "${file.uploadFolder}" )
    private String uploadFolder;

    @Autowired
    private MangaInfoMapper mangaInfoMapper;

    @Override
    public MangaInfoDTO addMangaInfo( JsonResult< MangaInfoDTO > requestJsonRequest ){
        String wrapperName = requestJsonRequest.getData().getWrapper();
        // 1. 取出 MangaInfoVO 对象
        MangaInfoVO mangaInfoVO = BeanConvertUtils.convertWithNested( requestJsonRequest.getData(), MangaInfoVO.class, "dicEnumCategoryDTO", DicEnumCategoryVO.class );
        mangaInfoVO.setWrapper( ImageUtils.imageToByte( uploadFolder + wrapperName ) );
        System.out.println( mangaInfoVO.getWrapper().length );
        // 2. 根据 mangaName 判断是否存在
        String existGuid = mangaInfoMapper.getGuidByName( mangaInfoVO.getMangaName() );
        if( existGuid != null ) {
                String errorMsg = "ERROR: 该漫画已存在！【MangaName-" + mangaInfoVO.getMangaName() + "】";
                logger.error( errorMsg );
                throw new SelectException( errorMsg );
        }
        // 3. 补全其他信息
        mangaInfoVO.setIsDeleted( "2" );
        // 4. 开始插入，并返回插入行数
        Integer rows = mangaInfoMapper.addMangaInfo( mangaInfoVO );
        // 5. 根据 rows 判断是否插入成功
        if( rows != 1 ) {
            String errorMsg = "ERROR: 数据库插入失败，请联系管理员！";
            logger.error( errorMsg );
            throw new SelectException( errorMsg );
        }
        // 6. 获取插入的数据
        MangaInfoVO resultMangaInfoVO = mangaInfoMapper.getMangaInfoByGuid( mangaInfoVO.getGuid() );
        // 7. 转 DTO 返回
        MangaInfoDTO resultMangaInfoDTO = BeanConvertUtils.convertWithNested( resultMangaInfoVO, MangaInfoDTO.class, "dicEnumCategoryVO", DicEnumCategoryDTO.class );

        return resultMangaInfoDTO;
    }

    @Override
    public Integer batchAddMangaInfo( List< MangaInfo > mangaInfoList ){
        Integer rows = mangaInfoMapper.batchAddMangaInfo( mangaInfoList );
        return rows;
    }

    @Override
    public JsonResult listMangaInfo( JsonResult< Object > requestJsonResult ){
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
        List< MangaInfoDTO > mangaInfoDTOS = BeanConvertUtils.convertListWithNested( mangaInfoVOList, MangaInfoDTO.class, "dicEnumCategoryVO", DicEnumCategoryDTO.class );

        // 生成新的 PageInfo 对象，保留原来的分页信息
        PageInfo< MangaInfoDTO > mangaInfoDTOPageInfo = PageInfoUtil.copy( mangaInfoVOPageInfo, mangaInfoDTOS );

        // 初始化 JsonResult 用来存放分页后的数据
        JsonResult< Object > jsonResult = new JsonResult<>();
        jsonResult.getDataTables().setDraw( dataTables.getDraw() );
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
            compressedImageBytes = ImageUtils.compressImageBySize( imageBytes, ImageFormat.JPEG, MAX_SIZE );
        } catch( IOException e ){
            throw new RuntimeException( e );
        }
        // 将字节数组转换成 Base64 编码的字符串
        String base64String = DEFAULT_WRAPPER_BASE64_PREFIX + Base64.getEncoder().encodeToString( compressedImageBytes );

        return base64String;
    }


}
