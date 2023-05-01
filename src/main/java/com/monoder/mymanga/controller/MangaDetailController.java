package com.monoder.mymanga.controller;

import com.github.pagehelper.PageInfo;
import com.monoder.mymanga.base.controller.BaseController;
import com.monoder.mymanga.entity.dto.JsonResult;
import com.monoder.mymanga.entity.dto.MangaDetailDTO;
import com.monoder.mymanga.service.IMangaDetailService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( "MangaDetail" )
public class MangaDetailController extends BaseController{

    @Autowired
    private IMangaDetailService iMangaDetailService;

    @PostMapping( "listMangaDetail" )
    public ResponseEntity listMangaDetailByGuid( @RequestBody JsonResult< String > requestJsonResult ){
        JsonResult< PageInfo< MangaDetailDTO > > mangaDetailDTO = iMangaDetailService.listMangaDetailByGuid( requestJsonResult );
        return ResponseEntity.ok( mangaDetailDTO );
    }

    @GetMapping( "getPic" )
    public ResponseEntity listMangaDetailByGuid( @Param( "picId" ) String picId ){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType( MediaType.APPLICATION_JSON );
        return ResponseEntity.ok( iMangaDetailService.getPicSource( picId ) );
    }

}
