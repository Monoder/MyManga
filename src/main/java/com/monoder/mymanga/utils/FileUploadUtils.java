package com.monoder.mymanga.utils;

import com.monoder.mymanga.common.constant.FileUploadConstant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class FileUploadUtils{

    private static final Logger logger = LoggerFactory.getLogger( FileUploadUtils.class );


    /**
     * 传入参数，删除指定路径以及路径下所有文件
     * 当 deleteType = 1 时，指定删除【上传路径】下的文件夹
     * 当 deleteType = 2 时，指定删除传入的【完整路径】下的文件夹
     *
     * @param folderName
     * @param deleteType
     */
    public static boolean deleteDirectory( String folderName, int deleteType ){
        File file;
        if( deleteType == 1 ){
            file = new File( FileUploadConstant.UPLOAD_FOLDER + folderName );
        } else if( deleteType == 2 ){
            file = new File( folderName );
        } else{
            logger.error( "ERROR: 删除失败！请指定删除类型！" );
            return false;
        }
        if( !file.exists() ){
            logger.error( "ERROR: 删除失败！文件夹不存在！【path-{}】", folderName );
            return false;
        }
        if( file.isFile() ){
            return file.delete();
        }
        File[] files = file.listFiles();
        if( files != null ){
            for( File f: files ){
                if( f.isDirectory() ){
                    deleteDirectory( f.getPath(), deleteType );
                } else{
                    f.delete();
                }
            }
        }
        return file.delete();
    }

    /**
     * 用于漫画图库从 uploads 到本机的迁移
     *
     * @param srcFilePath 原图片路径
     * @param destFolderPath 目标文件夹路径
     * @param namePrefix 名称前缀
     * @param index 传入的文件索引
     */
    public static String copyAndRenameFile( String srcFilePath, String destFolderPath, String namePrefix, int index ){
        try{
            File srcFile = new File( srcFilePath );
            File destDir = new File( destFolderPath );
            String srcFileName = srcFile.getName();
            String suffix = srcFileName.substring( srcFileName.lastIndexOf( "." ) + 1 );
            String newName = StringUtils.getFileName( namePrefix, index ) + "." + suffix;
            if( !destDir.exists() ){
                destDir.mkdirs();
            }
            Path destPath = destDir.toPath().resolve( newName );
            Files.copy( srcFile.toPath(), destPath, StandardCopyOption.REPLACE_EXISTING );
            return newName;
        } catch( IOException e ){
            throw new RuntimeException( e );
        }
    }

}

