package com.monoder.mymanga.utils;

import com.monoder.mymanga.common.constant.MangaDetailConstant;
import com.monoder.mymanga.service.exception.FileHandleException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Random;

public class FileUploadUtils{

    private static final Logger logger = LoggerFactory.getLogger( FileUploadUtils.class );

    public static final String MANGA_HOME = MangaDetailConstant.MANGA_HOME;

    public static String getRandomNumber(){
        Random random = new Random();
        int randomNumber = random.nextInt( 900000 ) + 100000;
        return String.valueOf( randomNumber );
    }

    public static String getPicNamePrefix(){
        return getRandomNumber() + "_pic_";
    }

    /**
     * @param oldPicName 原图片名，用来获取后缀名
     * @param namePrefix 新图片名前缀
     * @param index 编号
     * @return 新图片名
     */
    public static String getNewPicName( String oldPicName, String namePrefix, int index ){
        String suffix = oldPicName.substring( oldPicName.lastIndexOf( "." ) + 1 );
        return namePrefix + String.format( "%04d", index ) + "." + suffix;
    }


    /**
     * 传入参数，删除指定路径以及路径下所有文件
     *
     * @param folderPath 目标文件夹
     */
    public static boolean deleteDirectory( String folderPath ){
        File file = new File( folderPath );
        if( !file.exists() ){
            String errorMsg = "ERROR: 删除失败！文件夹不存在！【path-" + folderPath + "】";
            throw new FileHandleException( errorMsg );
        }
        if( file.isFile() ){
            return file.delete();
        }
        File[] files = file.listFiles();
        if( files != null ){
            for( File f: files ){
                if( f.isDirectory() ){
                    deleteDirectory( f.getPath() );
                } else{
                    f.delete();
                }
            }
        }
        return file.delete();
    }


    /**
     * 用于漫画图库从 uploads 到本地的迁移
     *
     * @param srcPath 原图片路径
     * @param targetPath 目标文件夹路径
     * @param targetName 名称前缀
     * @param index
     */
    public static void movePicFile( String srcPath, String targetPath, String targetName, int index ){
        try{
            File mangaHome = new File( MANGA_HOME );
            if( !mangaHome.exists() ) {
                String errorMsg = "ERROR: 【movePicFile】保存文件失败，失败原因：目标目录已脱机！请联系管理员！";
                throw new FileHandleException( errorMsg );
            }
            File srcFile = new File( srcPath );
            File destDir = new File( targetPath );
            if( index == 0 && destDir.exists() ){
                String errorMsg = "ERROR: 【movePicFile】保存文件失败，失败原因：目标文件夹已存在！【targetPath-" + targetPath + "】";
                throw new FileHandleException( errorMsg );
            }
            destDir.mkdirs();
            if( !srcFile.exists() ) {
                String errorMsg = "ERROR: 【movePicFile】保存文件失败，失败原因：源文件不存在！【srcPath-" + srcPath + "】";
                throw new FileHandleException( errorMsg );
            }
            Path destPath = destDir.toPath().resolve( targetName );
            Files.copy( srcFile.toPath(), destPath, StandardCopyOption.REPLACE_EXISTING );
        } catch( IOException e ){
            throw new RuntimeException( e );
        }
    }

}

