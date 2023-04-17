package com.monoder.mymanga.controller;

import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;
import com.monoder.mymanga.service.IDicEnumCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Monoder
 */
@RestController
@RequestMapping ( "DicEnum" )
public class DicEnumCategoryController{

    @Autowired
    private IDicEnumCategoryService iDicEnumCategoryService;

    @RequestMapping ( "listDicEnum" )
    public List < DicEnumCategoryDTO > listDicEnumCategory ( String categoryCode ) {
        return iDicEnumCategoryService.listDicEnumCategory ( categoryCode );
    }

}
