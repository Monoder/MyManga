package com.monoder.mymanga.base.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.monoder.mymanga.tools.SystemInfoTools;

@RestController
@RequestMapping( "upload" )
public class UploadController{

    private final Logger logger = LoggerFactory.getLogger( UploadController.class );
    @Value( "${file.uploadFolder}" )
    private String uploadFolder;

    @PostMapping( "/mangaUpload" )
    public ResponseEntity mangaUpload( @RequestParam( "file" ) MultipartFile file ){
        try{
            // 获取上传的文件名
            String originalFilename = file.getOriginalFilename();
            // 获取文件夹和原文件名
            String folderName = originalFilename.substring( 0, originalFilename.lastIndexOf( "/" ) );
            String fileName = originalFilename.substring( originalFilename.lastIndexOf( "/" ) + 1 );
            // 原文件后缀
            // String suffix = originalFilename.substring( originalFilename.lastIndexOf( "." ) );
            // 设置新的文件名
            String newFileName = SystemInfoTools.getFileTime() + fileName;
            // 设置文件上传的目标路径
            Path targetPath = Paths.get( uploadFolder + folderName + "/" + newFileName );
            //创建目录
            File folder = new File( uploadFolder + folderName );
            if( !folder.exists() ){
                folder.mkdirs();
            }
            //将上传的文件保存到目标路径
            Files.copy( file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING );
            return ResponseEntity.ok().body( newFileName );
        } catch( IOException ex ){
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build();
        }
    }


}
