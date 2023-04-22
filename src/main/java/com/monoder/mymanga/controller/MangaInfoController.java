package com.monoder.mymanga.controller;

import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.service.IMangaInfoService;
import com.monoder.mymanga.service.exception.SelectException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "MangaInfo" )
public class MangaInfoController{

    @Autowired
    private IMangaInfoService iMangaInfoService;

    @PostMapping( "listMangaInfo" )
    public ResponseEntity listMangaInfo( @RequestBody JsonResult< Object > requestJsonRequest ){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType( MediaType.APPLICATION_JSON );
        return new ResponseEntity<>( iMangaInfoService.listMangaInfo( requestJsonRequest ), headers, HttpStatus.OK );
    }

    @PostMapping( "getMangaInfo" )
    public ResponseEntity getMangaInfo( String mangaGuid ){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType( MediaType.APPLICATION_JSON );
        return new ResponseEntity<>( iMangaInfoService.getMangaInfoByGuid( mangaGuid ), headers, HttpStatus.OK );
    }

    @PostMapping( "getWrapper" )
    public ResponseEntity getWrapper( String mangaGuid ){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType( MediaType.IMAGE_JPEG );
        try{
            return new ResponseEntity<>( iMangaInfoService.getWrapperByGuid( mangaGuid ), headers, HttpStatus.OK );
        } catch( SelectException e ){
            return new ResponseEntity<>( e.getMessage(), headers, HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    @PostMapping( "search" )
    public ResponseEntity searchManga( @RequestBody JsonResult< Object > requestJsonRequest ){
        List< String > categoryIdList = requestJsonRequest.getSearchData().getCategoryIdList();
        for( String i: categoryIdList ){
            System.out.println( i );
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType( MediaType.APPLICATION_JSON );
        return null;
    }

}
