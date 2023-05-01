package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;

import java.util.List;

public interface IDicEnumCategoryService{

    List < DicEnumCategoryDTO > listDicEnumCategory ( String categoryCode );

}
