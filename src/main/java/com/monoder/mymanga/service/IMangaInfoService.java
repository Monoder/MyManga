package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.entity.vo.MangaInfoVO;

import java.util.List;

public interface IMangaInfoService{

    Integer batchAddMangaInfo ( List< MangaInfo > mangaInfoList );
    JsonResult listMangaInfo( JsonResult< Object> requestJsonResult );

    String getWrapperByGuid( String Guid );
}
