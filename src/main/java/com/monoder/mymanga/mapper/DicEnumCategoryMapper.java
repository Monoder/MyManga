package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;
import com.monoder.mymanga.entity.po.DicEnumCategory;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DicEnumCategoryMapper{

    /**
     * 传入 CATEGORY_CODE，返回对应的分类
     * @param categoryCode
     * @return
     */
    List< DicEnumCategoryDTO > listDicEnumCategory( String categoryCode );

    /**
     * 传入 ID 返回对应 Guid
     * @param cicEnumID
     * @return
     */
    String getGuidByID( Integer dicEnumID );
}
