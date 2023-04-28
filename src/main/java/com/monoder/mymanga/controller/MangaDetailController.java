package com.monoder.mymanga.controller;

import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.service.IMangaDetailService;
import com.monoder.mymanga.service.exception.SelectException;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( "MangaDetail" )
public class MangaDetailController{

    @Autowired
    private IMangaDetailService iMangaDetailService;

    @PostMapping( "listMangaDetail" )
    public ResponseEntity listMangaDetailByGuid( @RequestBody JsonResult< String > requestJsonResult ){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType( MediaType.APPLICATION_JSON );
        return new ResponseEntity<>( iMangaDetailService.listMangaDetailByGuid( requestJsonResult ), headers, HttpStatus.OK );
    }

    @PostMapping( "getPic" )
    public ResponseEntity listMangaDetailByGuid( String picId ){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType( MediaType.APPLICATION_JSON );
        try{
            return new ResponseEntity<>( iMangaDetailService.getPicSource( picId ), headers, HttpStatus.OK );
        } catch( SelectException e ){
            return new ResponseEntity<>( e.getMessage(), headers, HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

}
