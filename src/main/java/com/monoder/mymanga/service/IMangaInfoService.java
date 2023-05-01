package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.dto.JsonResult;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.po.MangaInfo;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IMangaInfoService{

    @Transactional
    JsonResult< String > addManga( MangaInfoDTO mangaInfoDTO );

    MangaInfoDTO addMangaInfo( MangaInfoDTO mangaInfoDTO );

    Integer batchAddMangaInfo ( List< MangaInfo > mangaInfoList );

    Integer deleteMangaInfo( String guid );

    @Transactional
    boolean batchDeleteMangaInfo( List<String> guidList );

    JsonResult listMangaInfo( JsonResult< Void > requestJsonResult );

    JsonResult getMangaInfoByGuid( String mangaGuid );

    String getWrapperByGuid( String Guid );

}
