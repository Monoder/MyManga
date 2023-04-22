package com.monoder.mymanga.controller;

import com.monoder.mymanga.service.IMangaDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( "MangaDetail" )
public class MangaDetailController{

    @Autowired
    private IMangaDetailService iMangaDetailService;

    @PostMapping( "listMangaDetail" )
    public ResponseEntity listMangaDetailByGuid( String mangaGuid ){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType( MediaType.APPLICATION_JSON );
        return new ResponseEntity<>( iMangaDetailService.listMangaDetailByGuid( mangaGuid ), headers, HttpStatus.OK );
    }
}
