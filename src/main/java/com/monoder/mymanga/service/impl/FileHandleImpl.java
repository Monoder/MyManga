package com.monoder.mymanga.service.impl;

import com.monoder.mymanga.common.constant.MangaDetailConstant;
import com.monoder.mymanga.common.enums.ImageFormatEnum;
import com.monoder.mymanga.common.enums.MangaCategoryEnum;
import com.monoder.mymanga.entity.dto.JsonResult;
import com.monoder.mymanga.entity.dto.MangaDetailDTO;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.service.IFileHandleService;
import com.monoder.mymanga.service.exception.DeleteException;
import com.monoder.mymanga.service.exception.FileHandleException;
import com.monoder.mymanga.tools.SystemInfoTools;
import com.monoder.mymanga.utils.FileUploadUtils;
import com.monoder.mymanga.utils.ImageUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;

import static com.monoder.mymanga.common.constant.MangaSourceConstant.DEFAULT_WRAPPER_BASE64_PREFIX;
import static com.monoder.mymanga.common.constant.MangaSourceConstant.MAX_SIZE;

@Service
public class FileHandleImpl implements IFileHandleService{

    private final Logger logger = LoggerFactory.getLogger( IFileHandleService.class );

    @Value( "${file.uploadFolder}" )
    private String UPLOAD_HOME;
    public static final String MANGA_HOME = MangaDetailConstant.MANGA_HOME;     // MANGA_PATH = "J:\\♥EX-Hentai♥\\♥MyManga♥\\"


    @Override
    public JsonResult< String > MangaFileSave( MultipartFile file ){
        // 1. 获取上传的文件名
        String originalFilename = file.getOriginalFilename();
        // 2. 获取上传的文件夹和原文件名
        String originalFolderName = originalFilename.substring( 0, originalFilename.lastIndexOf( "/" ) );
        String fileName = originalFilename.substring( originalFilename.lastIndexOf( "/" ) + 1 );
        // 原文件后缀
        // String suffix = originalFilename.substring( originalFilename.lastIndexOf( "." ) );
        // 3. 设置新的文件名
        String time = SystemInfoTools.getFileUpdateTime();
        String newFileName = time + fileName;
        // 4. 设置文件上传的目标路径
        Path targetPath = Paths.get( UPLOAD_HOME + originalFolderName + "/" + newFileName );
        try{
            //创建目录
            File targetFolder = new File( UPLOAD_HOME + originalFolderName );
            if( !targetFolder.exists() ){
                targetFolder.mkdirs();
            }
            // 5. 将上传的文件保存到目标路径
            Files.copy( file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING );
            // 6. 获取上传后的文件目录并包装返回
            String picPath = originalFolderName + "/" + newFileName;
            return new JsonResult<>( picPath );
        } catch( IOException e ){
            String errorMsg = "ERROR: 上传文件失败！【fileName-" + originalFilename + "】";
            throw new FileHandleException( errorMsg, e );
        }
    }

    @Override
    public MangaInfoDTO mangaFileRename( MangaInfoDTO mangaInfoDTO ){
        // 1. 取出数据准备进行处理
        List< MangaDetailDTO > oldMangaDetailDTOList = mangaInfoDTO.getMangaDetailDTOList();    // 漫画详情集合
        Integer categoryId = mangaInfoDTO.getDicEnumCategoryDTO().getDicEnumID();    // 漫画分类ID
        String mangaName = mangaInfoDTO.getMangaName();     // 漫画名称

        // 2. 获取存放本地的相对路径：${categoryName}\${mangaName}
        String relativePath = MangaCategoryEnum.getNameById( categoryId ) + "\\" + mangaName;

        // 3. 获取漫画图片文件名前缀：000000_pic_0000
        String picNamePrefix = FileUploadUtils.getPicNamePrefix();

        // 4. 开始进行处理，新建对象接收处理结果
        MangaInfoDTO newMangaInfoDTO = new MangaInfoDTO( mangaInfoDTO );
        List< MangaDetailDTO > newMangaDetailDTOList = newMangaInfoDTO.getMangaDetailDTOList();
        // 4.1 处理 mangaInfoDTO
        newMangaInfoDTO.setMangaPath( relativePath );
        // 4.2 处理 oldMangaDetailDTOList
        for( MangaDetailDTO mangaDetailDTO: oldMangaDetailDTOList ){
            MangaDetailDTO detailTrans = new MangaDetailDTO();
            Integer picNo = mangaDetailDTO.getPicNo();
            // picNo 不变，生成新的 picName、picPath
            detailTrans.setPicNo( picNo );
            String newPicName = FileUploadUtils.getNewPicName( mangaDetailDTO.getPicName(), picNamePrefix, picNo );
            detailTrans.setPicName( newPicName );
            detailTrans.setPicPath( relativePath + "\\" + newPicName );
            // 放入集合
            newMangaDetailDTOList.add( detailTrans );
        }
        return newMangaInfoDTO;
    }

    @Override
    public void mangaFileMove( MangaInfoDTO srcMangaInfoDTO, MangaInfoDTO targetMangaInfoDTO ) throws FileHandleException{
        List< MangaDetailDTO > srcMangaDetailList = srcMangaInfoDTO.getMangaDetailDTOList();
        List< MangaDetailDTO > targetMangaDetailList = targetMangaInfoDTO.getMangaDetailDTOList();
        String targetFolder = MANGA_HOME + targetMangaInfoDTO.getMangaPath();
        for( int index = 0; index < srcMangaDetailList.size(); index++ ){
            String srcPath = UPLOAD_HOME + srcMangaDetailList.get( index ).getPicPath();
            String targetName = targetMangaDetailList.get( index ).getPicName();
            // 将图片从上传目录移动至下载目录
            FileUploadUtils.movePicFile( srcPath, targetFolder, targetName, index );
        }
    }

    @Override
    public String getMangaSource( String picPath ){
        File file = new File( picPath );
        if( !file.exists() ){
            String errorMsg = "ERROR: 文件不存在!【picPath-" + picPath + "】";
            throw new FileHandleException( errorMsg );
        }
        try{
            byte[] imageBytes = Files.readAllBytes( file.toPath() );
            byte[] compressedImageBytes = ImageUtils.compressImageBySize( imageBytes, ImageFormatEnum.JPEG, MAX_SIZE );
            String base64String = DEFAULT_WRAPPER_BASE64_PREFIX + Base64.getEncoder().encodeToString( compressedImageBytes );
            return base64String;
        } catch( IOException e ){
            String errorMsg = "ERROR: 读取图片文件失败!【picPath-" + picPath + "】";
            throw new FileHandleException( errorMsg, e );
        }
    }

    @Override
    public void uploadFolderDelete( String uploadFolderPath ) throws FileHandleException{
        if( uploadFolderPath == null || uploadFolderPath.isEmpty() ){
            String errorMsg = "ERROR: 传入的上传目录为空！请联系管理员";
            throw new FileHandleException( errorMsg );
        }
        String folderPath = UPLOAD_HOME + uploadFolderPath;
        // 传入上传目录路径，将目录下文件全部删除
        FileUploadUtils.deleteDirectory( folderPath );
    }

    @Override
    public void mangaFolderDelete( String mangaFolderPath ) throws FileHandleException{
        if( mangaFolderPath == null || mangaFolderPath.isEmpty() ){
            String errorMsg = "ERROR: 传入的漫画目录为空！请联系管理员";
            throw new DeleteException( errorMsg );
        }
        String folderPath = MANGA_HOME + mangaFolderPath;
        // 传入保存目录路径，将目录下文件全部删除
        FileUploadUtils.deleteDirectory( folderPath );
    }

}
