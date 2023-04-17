package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.dto.TagDTO;
import com.monoder.mymanga.entity.po.TagDetail;
import com.monoder.mymanga.entity.vo.JsonResult;

import java.util.List;

public interface ITagDetailService{

    /**
     * 新增一行
     *
     * @param tagDTO
     */
    TagDTO addTag( TagDTO tagDTO );

    /**
     * 批量逻辑删除
     *
     * @param tagDetailList
     */
    Integer logicalDelete( List< TagDetail > tagDetailList );

    /**
     * 通过 Guids 批量逻辑删除
     *
     * @param tagGuids
     */
    Integer logicalDeleteByGuids( String[] tagGuids );

    /**
     * 通过 TagDetail 对象的 guid 更新数据
     *
     * @param tagDTO
     */
    TagDTO updateTagDetail( TagDTO tagDTO );

    /**
     * 获取集合
     *
     * @param objectJsonResult
     */
    JsonResult listTagDetail( JsonResult< Object > objectJsonResult );


}
