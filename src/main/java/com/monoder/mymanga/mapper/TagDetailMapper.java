package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.dto.DataTables;
import com.monoder.mymanga.entity.dto.TagDTO;
import com.monoder.mymanga.entity.po.TagDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TagDetailMapper{

    /**
     * 新增一行
     *
     * @param tagDetail TagDetail 对象
     * @return 新增行数
     */
    Integer addTag( TagDetail tagDetail );

    /**
     * 批量物理删除
     *
     * @param tagDetailList
     */
    Integer deleteTagDetail( List< TagDetail > tagDetailList );

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
     * 根据 TagDetail 对象的 guid 更新数据
     *
     * @param tagDetail
     */
    Integer updateTagDetail( TagDetail tagDetail );

    /**
     * 获取 TagDetail 集合
     */
    List< TagDTO > listTagDetail();

    List< TagDTO > listTagDetail( DataTables dataTables );

    Integer findTagByName( String tagName );

    /**
     * 通过 ID 获取 TagDTO
     *
     * @param Id
     */
    TagDTO getTagDetailById( Integer Id );

    /**
     * 通过 Guid 获取 TagDTO
     *
     * @param Guid
     */
    TagDTO getTagDetailByGuid( String Guid );


    /**
     * 获取当前最大的 ID
     */
    Integer getMaxTagDetailId();


}
