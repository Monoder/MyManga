package com.monoder.mymanga.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.entity.vo.MangaInfoVO;
import com.monoder.mymanga.mapper.MangaInfoMapper;
import com.monoder.mymanga.service.IMangaInfoService;
import com.monoder.mymanga.utils.BeanConvertUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class MangaInfoImpl implements IMangaInfoService{

    @Autowired
    private MangaInfoMapper mangaInfoMapper;

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
        List< MangaInfoDTO > mangaInfoDTOs = BeanConvertUtils.convertListWithNested( mangaInfoVOList, MangaInfoDTO.class, "dicEnumCategoryVO", DicEnumCategoryDTO.class );
        // 放回 PageHelper 中
        PageInfo< MangaInfoDTO > mangaInfoDTOPageInfo = new PageInfo<>( mangaInfoDTOs );


        // 初始化 JsonResult 用来存放分页后的数据
        JsonResult< Object > jsonResult = new JsonResult<>( dataTables );
        jsonResult.getDataTables().setDraw( dataTables.getDraw() );
        jsonResult.setData( mangaInfoDTOPageInfo );

        return jsonResult;
    }
}
