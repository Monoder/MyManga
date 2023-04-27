package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.vo.JsonResult;


public interface IMangaDetailService{

    Integer batchAddMangaDetail( MangaInfoDTO mangaInfoDTO );

    JsonResult listMangaDetailByGuid ( String MangaGuid );

}
