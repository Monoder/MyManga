package com.monoder.mymanga.base.controller;

import com.monoder.mymanga.entity.dto.JsonResult;
import com.monoder.mymanga.service.IFileHandleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping( "upload" )
public class UploadController extends BaseController{

    @Autowired
    private IFileHandleService iFileHandleService;

    private final Logger logger = LoggerFactory.getLogger( UploadController.class );

    @Value( "${file.uploadFolder}" )
    private String UPLOAD_HOME;

    @PostMapping( "/mangaUpload" )
    public ResponseEntity mangaUpload( @RequestParam( "file" ) MultipartFile file ){
        JsonResult< String > jsonResult = iFileHandleService.MangaFileSave( file );
        jsonResult.setStatus( 201 );
        return ResponseEntity.ok( jsonResult );
    }


}
