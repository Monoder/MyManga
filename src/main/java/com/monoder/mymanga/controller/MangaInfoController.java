package com.monoder.mymanga.controller;

import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.service.IMangaDetailService;
import com.monoder.mymanga.service.IMangaInfoService;
import com.monoder.mymanga.service.exception.InsertException;
import com.monoder.mymanga.service.exception.SelectException;
import com.monoder.mymanga.utils.FileUploadUtils;
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

    @Autowired
    private IMangaDetailService iMangaDetailService;

    @PostMapping( "mangaImport" )
    public ResponseEntity addMangaInfo( @RequestBody JsonResult< MangaInfoDTO > mangaInfoDTOJsonResult ){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType( MediaType.APPLICATION_JSON );
        String folderName = mangaInfoDTOJsonResult.getData().getMangaName();
        try{
            MangaInfoDTO mangaInfoDTO = iMangaInfoService.addMangaInfo( mangaInfoDTOJsonResult );
            mangaInfoDTO.setMangaDetailDTOList( mangaInfoDTOJsonResult.getData().getMangaDetailDTOList() );
            try{
                Integer rows = iMangaDetailService.batchAddMangaDetail( mangaInfoDTO );
                FileUploadUtils.deleteDirectory( folderName, 1 );
                JsonResult< String > jsonResult = new JsonResult<>( mangaInfoDTO.getGuid() );
                jsonResult.setRows( rows );
                return new ResponseEntity<>( jsonResult, headers, HttpStatus.OK );
            } catch( InsertException e ){
                // 【batchAddMangaDetail】插入失败，将上传到本地的文件夹及文件全部删除，将已经插入的漫画主体删除
                FileUploadUtils.deleteDirectory( folderName, 1 );
                Integer rows = iMangaInfoService.deleteMangaInfo( mangaInfoDTO.getGuid() );
                return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( e.getMessage() );
            }
        } catch( InsertException e ){
            // 【addMangaInfo】插入失败，将上传到本地的文件夹及文件全部删除
            FileUploadUtils.deleteDirectory( folderName, 1 );
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( e.getMessage() );
        }
    }

    @PostMapping( "deleteMangaInfo" )
    public ResponseEntity deleteMangaInfo( @RequestBody JsonResult< List< String > > requestJsonRequest ){
        List< String > deleteGuidList = requestJsonRequest.getData();
        boolean flag = iMangaInfoService.batchDeleteMangaInfo(deleteGuidList);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType( MediaType.APPLICATION_JSON );
        return new ResponseEntity<>(flag, headers, HttpStatus.OK );
    }

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
