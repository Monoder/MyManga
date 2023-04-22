package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.JsonResult;

import java.util.List;

public interface IMangaInfoService{

    Integer batchAddMangaInfo ( List< MangaInfo > mangaInfoList );
    JsonResult listMangaInfo( JsonResult< Object> requestJsonResult );

    JsonResult getMangaInfoByGuid( String mangaGuid );

    String getWrapperByGuid( String Guid );


}
