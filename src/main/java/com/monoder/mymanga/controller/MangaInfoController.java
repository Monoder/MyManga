package com.monoder.mymanga.controller;

import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.service.IMangaInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( "MangaInfo" )
public class MangaInfoController{

    @Autowired
    private IMangaInfoService iMangaInfoService;

    @PostMapping( "listMangaInfo" )
    public ResponseEntity listMangaInfo ( @RequestBody JsonResult< Object > requestJsonResult ) {
        HttpHeaders headers = new HttpHeaders ( );
        headers.setContentType ( MediaType.APPLICATION_JSON );
        return new ResponseEntity <> ( iMangaInfoService.listMangaInfo ( requestJsonResult ), headers, HttpStatus.OK );
    }

}
