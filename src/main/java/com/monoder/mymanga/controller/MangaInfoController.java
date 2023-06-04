package com.monoder.mymanga.controller;

import com.monoder.mymanga.base.controller.BaseController;
import com.monoder.mymanga.entity.dto.JsonResult;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.service.IMangaInfoService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "MangaInfo" )
public class MangaInfoController extends BaseController{
    @Autowired
    private IMangaInfoService iMangaInfoService;

    @PostMapping( "mangaImport" )
    public ResponseEntity addMangaInfo( @RequestBody JsonResult< MangaInfoDTO > mangaInfoDTOJsonResult ){
        MangaInfoDTO mangaInfoDTO = mangaInfoDTOJsonResult.getData();
        JsonResult< String > jsonResult = iMangaInfoService.addManga( mangaInfoDTO );
        return ResponseEntity.ok().body( jsonResult );
    }

    @PostMapping( "deleteMangaInfo" )
    public ResponseEntity< Boolean > batchDeleteMangaInfo( @RequestBody JsonResult< List< String > > requestJsonRequest ){
        List< String > deleteGuidList = requestJsonRequest.getData();
        boolean flag = iMangaInfoService.batchDeleteMangaInfo( deleteGuidList );
        return ResponseEntity.ok().build();
    }

    @PostMapping( "listMangaInfo" )
    public ResponseEntity listMangaInfo( @RequestBody JsonResult< Void > requestJsonRequest ){
        return ResponseEntity.ok( iMangaInfoService.listMangaInfo( requestJsonRequest ) );
    }

    @GetMapping( "getMangaInfo" )
    public ResponseEntity getMangaInfoByGuid( @Param( "mangaGuid" ) String mangaGuid ){
        return ResponseEntity.ok( iMangaInfoService.getMangaInfoByGuid( mangaGuid ) );
    }

    @GetMapping( "getWrapper" )
    public ResponseEntity getWrapper( @Param( "mangaGuid" ) String mangaGuid ){
        return ResponseEntity.ok( iMangaInfoService.getWrapperByGuid( mangaGuid ) );
    }

    @PostMapping( "search" )
    public ResponseEntity searchManga( @RequestBody JsonResult< Object > requestJsonRequest ){
        List< String > categoryIdList = requestJsonRequest.getSearchData().getCategoryIdList();
        return null;
    }


}
