package com.monoder.mymanga.service.impl;

import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.mapper.MangaDetailMapper;
import com.monoder.mymanga.service.IMangaDetailService;
import com.monoder.mymanga.service.IMangaInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MangaDetailImpl implements IMangaDetailService{

    private final Logger logger = LoggerFactory.getLogger( IMangaInfoService.class );

    @Autowired
    private MangaDetailMapper mangaDetailMapper;

    @Override
    public Integer batchAddMangaInfo( String MangaPath ){
        return null;
    }

    @Override
    public JsonResult listMangaDetailByGuid( String MangaGuid ){
//        List< MangaDetail > mangaDetailList = mangaDetailMapper
        return null;
    }
}
