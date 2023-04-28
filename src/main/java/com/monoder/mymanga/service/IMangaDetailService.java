package com.monoder.mymanga.service;

import com.github.pagehelper.PageInfo;
import com.monoder.mymanga.entity.dto.MangaDetailDTO;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.vo.JsonResult;

import java.util.List;


public interface IMangaDetailService{

    Integer batchAddMangaDetail( MangaInfoDTO mangaInfoDTO );

    JsonResult< PageInfo< MangaDetailDTO > > listMangaDetailByGuid ( JsonResult <String> requestJsonResult );

    String getPicSource( String picId );

}
