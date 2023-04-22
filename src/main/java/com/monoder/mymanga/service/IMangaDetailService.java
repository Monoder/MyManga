package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.po.MangaDetail;
import com.monoder.mymanga.entity.vo.JsonResult;

import java.util.List;


public interface IMangaDetailService{

    Integer batchAddMangaInfo( String MangaPath );

    JsonResult listMangaDetailByGuid ( String MangaGuid );
}
