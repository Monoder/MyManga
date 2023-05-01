package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.dto.JsonResult;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import org.springframework.web.multipart.MultipartFile;

public interface IFileHandleService{

    JsonResult<String> MangaFileSave( MultipartFile file );

    MangaInfoDTO mangaFileRename( MangaInfoDTO mangaInfoDTO );

    void mangaFileMove( MangaInfoDTO srcMangaInfoDTO, MangaInfoDTO targetMangaInfoDTO );

    String getMangaSource( String picPath );

    void uploadFolderDelete( String uploadFolderPath );

    void mangaFolderDelete( String mangaFolderPath );


}
