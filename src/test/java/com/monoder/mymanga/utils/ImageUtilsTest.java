package com.monoder.mymanga.utils;

import com.monoder.mymanga.common.enums.ImageFormatEnum;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RunWith( SpringRunner.class )
@SpringBootTest
public class ImageUtilsTest{

    @Test
    public void compressImage() throws IOException{
        // 读取原始图片
        File imageFile = new File( "J:\\♥EX-Hentai♥\\♥New♥\\[Gomennasai] Dakara Kami-sama, Boku ni shika Mienai Chiisana Koibito o Kudasai. [Chinese]\\001.png" );
        byte[] imageBytes = Files.readAllBytes( Paths.get( imageFile.toURI() ) );

        // 指定压缩后的最大宽度为500
        int maxWidth = 500;
        byte[] compressedBytes = ImageUtils.compressImage( imageBytes, ImageFormatEnum.JPEG, maxWidth, 1200, 0.8f );

        // 保存压缩后的图片到指定路径
        String compressedFilePath = "D:\\A_Monodery\\Desktop\\Image\\image_01_compressed.jpg";
        Path compressedPath = Paths.get( compressedFilePath );
        Files.write( compressedPath, compressedBytes );
    }
}
