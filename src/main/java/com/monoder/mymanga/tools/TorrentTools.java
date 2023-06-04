package com.monoder.mymanga.tools;

import java.io.File;

public class TorrentTools{
    public static void main( String[] args ){
        // 指定文件目录的路径
        String directoryPath = "J:\\♥EX-Hentai♥\\♥Torrent♥ - 副本";
        // 指定文件名前缀
        String targetPhrase = "{EHT PERSONALIZED TORRENT - DO NOT REDISTRIBUTE}";

        TorrentTools.removeFilenamePrefix( directoryPath, targetPhrase );
    }

    public static void removeFilenamePrefix( String directoryPath, String targetPhrase ){

        File directory = new File( directoryPath );
        // 检查目录是否存在
        if( !directory.exists() || !directory.isDirectory() ){
            System.out.println( "指定的目录不存在" );
            return;
        }
        // 获取目录中的所有文件
        File[] files = directory.listFiles();
        if( files == null ){
            System.out.println( "目录中没有文件" );
            return;
        }

        int count = 0;
        int failCount = 0;
        int deleteCount = 0;
        // 遍历文件并重命名
        for( File file: files ){
            String fileName = file.getName();
            if( fileName.startsWith( targetPhrase ) ){
                String newFileName = fileName.substring( targetPhrase.length() ).trim();
                File newFile = new File( directory, newFileName );
                // 检查是否存在同名文件
                if( newFile.exists() ){
                    System.out.println( "存在同名文件，无法重命名:" + fileName );
                    deleteCount++;
                    file.delete();
                } else{
                    // 重命名文件
                    boolean renamed = file.renameTo( newFile );
                    if( !renamed ){
                        count++;
                    } else {
                        failCount++;
                        System.out.println( "重命名失败: " + fileName );
                    }
                }
            }
        }
        System.out.println( "本次成功：" + count +"，失败：" + failCount +"，删除：" + deleteCount );
    }

}
