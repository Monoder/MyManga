package com.monoder.mymanga.base.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.monoder.mymanga.tools.SystemInfoTools;

@RestController
@RequestMapping( "upload" )
public class UploadController{

    @Value( "${file.uploadFolder}" )
    private String uploadFolder;

    @PostMapping( "/mangaUpload" )
    public ResponseEntity mangaUpload( @RequestParam( "file" ) MultipartFile file ){
        try{
            // 获取上传的文件名
            String originalFilename = file.getOriginalFilename();
            // 去掉文件夹名
            String filename = originalFilename.substring( originalFilename.lastIndexOf( "/" ) + 1 );
            // 原文件后缀
            String suffix = originalFilename.substring( originalFilename.lastIndexOf( "." ) );
            // 设置新的文件名
            String newFileName = SystemInfoTools.getCurrentTime() + suffix;
            // 设置文件上传的目标路径
            Path targetPath = Paths.get( uploadFolder + newFileName );
            System.out.println( "targetPath.toUri() = " + targetPath.toUri() );
            //将上传的文件保存到目标路径
            Files.copy( file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING );
            return ResponseEntity.ok().body( newFileName );
        } catch( IOException ex ){
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build();
        }
    }

}
