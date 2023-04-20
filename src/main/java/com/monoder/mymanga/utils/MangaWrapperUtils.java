package com.monoder.mymanga.utils;

import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.tools.SystemInfoTools;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;

public class MangaWrapperUtils{

    public static void main( String[] args ){
        String folderPath = "J:\\♥EX-Hentai♥\\♥New♥\\2023_03_21\\Part_03";
        List< MangaInfo > mangaInfoList = getMangaInfoList( folderPath );
        for( MangaInfo mangaInfo: mangaInfoList ){
            System.out.println( "Manga Name: " + mangaInfo.getMangaName()
                    + ", Wrapper Size: " + mangaInfo.getWrapper().length
                    + ", Page Count: " + mangaInfo.getPageCount()
                    + ", Create Time: " + mangaInfo.getCreateTime()
                    + ", Is Deleted:" + mangaInfo.getIsDeleted()
            );
        }
    }


    public static List< MangaInfo > getMangaInfoList( String rootDirPath ){
        List< MangaInfo > mangaInfoList = new ArrayList<>();

        File rootDir = new File( rootDirPath );
        if( !rootDir.exists() || !rootDir.isDirectory() ){
            return mangaInfoList;
        }

        File[] mangaDirs = rootDir.listFiles( File :: isDirectory );
        if( mangaDirs == null || mangaDirs.length == 0 ){
            return mangaInfoList;
        }

        Arrays.sort( mangaDirs, Comparator.comparing( File :: getName ) );

        for( File mangaDir: mangaDirs ){
            String time = SystemInfoTools.getDataBaseTime();

            MangaInfo mangaInfo = new MangaInfo();

            mangaInfo.setMangaName( mangaDir.getName() );
            mangaInfo.setIsDeleted( "2" );
            mangaInfo.setCreateTime( time );
            mangaInfo.setUpdateTime( time );
            mangaInfo.setCreator( SystemInfoTools.getUser() );
            mangaInfo.setCategoryGuid( "F6C5B7B69A001100A8C0A74B11111111" );

            File[] mangaFiles = mangaDir.listFiles( file -> file.isFile() && isImageFile( file.getName() ) );
            if( mangaFiles != null ){
                mangaInfo.setPageCount( String.valueOf( mangaFiles.length ) );
                Arrays.sort( mangaFiles, Comparator.comparing( File :: getName ) );
                if( mangaFiles.length > 0 ){
                    try( FileInputStream fis = new FileInputStream( mangaFiles[ 0 ] ) ){
                        byte[] wrapper = new byte[ ( int ) mangaFiles[ 0 ].length() ];
                        fis.read( wrapper );
                        mangaInfo.setWrapper( wrapper );
                    } catch( FileNotFoundException e ){
                        e.printStackTrace();
                    } catch( IOException e ){
                        e.printStackTrace();
                    }
                }
            }

            mangaInfoList.add( mangaInfo );
        }

        return mangaInfoList;
    }

    private static boolean isImageFile( String fileName ){
        return fileName.endsWith( ".jpg" ) || fileName.endsWith( ".jpeg" ) || fileName.endsWith( ".png" ) || fileName.endsWith( ".gif" );
    }

}
