package com.monoder.mymanga.service;

import com.github.pagehelper.PageInfo;
import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.JsonResult;

public interface IMangaInfoService{
    JsonResult listMangaInfo( JsonResult< Object> requestJsonResult );
}
