package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.JsonResult;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IMangaInfoService{

    MangaInfoDTO addMangaInfo( JsonResult< MangaInfoDTO > requestJsonRequest );

    Integer batchAddMangaInfo ( List< MangaInfo > mangaInfoList );

    Integer deleteMangaInfo( String guid );

    @Transactional
    boolean batchDeleteMangaInfo( List<String> guidList );

    JsonResult listMangaInfo( JsonResult< Object> requestJsonResult );

    JsonResult getMangaInfoByGuid( String mangaGuid );

    String getWrapperByGuid( String Guid );

}
