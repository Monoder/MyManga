package com.monoder.mymanga.service.impl;

import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;
import com.monoder.mymanga.mapper.DicEnumCategoryMapper;
import com.monoder.mymanga.service.IDicEnumCategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Monoder
 */
@Service
public class DicEnumCategoryImpl implements IDicEnumCategoryService {

    @Autowired
    private DicEnumCategoryMapper dicEnumCategoryMapper;
    private final Logger logger = LoggerFactory.getLogger( IDicEnumCategoryService.class );
    @Override
    public List < DicEnumCategoryDTO > listDicEnumCategory ( String categoryCode ) {
        logger.info( "CategoryCode: " + categoryCode );
        return dicEnumCategoryMapper.listDicEnumCategory ( categoryCode );
    }

}
