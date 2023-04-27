package com.monoder.mymanga.utils;

import com.monoder.mymanga.common.enums.ImageFormatEnum;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Iterator;

public class ImageUtils{

    /**
     * 压缩图片
     *
     * @param imageData 原始图片数据
     * @param format 压缩后的图片格式，如"jpg"、"png"
     * @param maxWidth 压缩后的最大宽度
     * @param maxHeight 压缩后的最大高度
     * @param quality 压缩质量，0.0~1.0
     * @return 压缩后的图片数据
     * @throws IOException IO异常
     */
    public static byte[] compressImage( byte[] imageData, ImageFormatEnum format, int maxWidth, int maxHeight, float quality ) throws IOException{
        // 读取原始图片
        ByteArrayInputStream input = new ByteArrayInputStream( imageData );
        BufferedImage originalImage = ImageIO.read( input );

        // 原始图片尺寸
        int originalWidth = originalImage.getWidth();
        int originalHeight = originalImage.getHeight();

        // 压缩后的尺寸
        int compressedWidth = originalWidth;
        int compressedHeight = originalHeight;

        // 如果图片宽度超过最大宽度，则进行等比缩放
        if( originalWidth > maxWidth ){
            compressedWidth = maxWidth;
            compressedHeight = ( int ) ( originalHeight * ( ( float ) maxWidth / originalWidth ) );
        }

        // 如果图片高度超过最大高度，则进行等比缩放
        if( compressedHeight > maxHeight ){
            compressedHeight = maxHeight;
            compressedWidth = ( int ) ( compressedWidth * ( ( float ) maxHeight / compressedHeight ) );
        }

        // 创建缩放后的图片
        BufferedImage compressedImage = new BufferedImage( compressedWidth, compressedHeight, BufferedImage.TYPE_INT_RGB );
        Graphics2D graphics = compressedImage.createGraphics();
        graphics.drawImage( originalImage, 0, 0, compressedWidth, compressedHeight, null );
        graphics.dispose();

        // 创建输出流
        ByteArrayOutputStream output = new ByteArrayOutputStream();

        // 获取图片压缩器
        Iterator< ImageWriter > iter = ImageIO.getImageWritersByFormatName( format.getFormatName() );
        if( !iter.hasNext() ){
            throw new IOException( "Unable to get image writer for " + format.getFormatName() + " format" );
        }
        ImageWriter writer = iter.next();

        // 设置压缩质量参数
        ImageWriteParam writeParam = writer.getDefaultWriteParam();
        writeParam.setCompressionMode( ImageWriteParam.MODE_EXPLICIT );
        writeParam.setCompressionQuality( quality );

        // 将图片写入输出流
        ImageOutputStream imageOutput = ImageIO.createImageOutputStream( output );
        writer.setOutput( imageOutput );
        IIOImage iioImage = new IIOImage( compressedImage, null, null );
        writer.write( null, iioImage, writeParam );
        writer.dispose();
        imageOutput.close();

        // 将输出流转为byte数组
        byte[] compressedData = output.toByteArray();

        // 关闭输入输出流
        input.close();
        output.close();

        return compressedData;
    }

    public static byte[] compressImageBySize( byte[] imageData, ImageFormatEnum format, long maxSize ) throws IOException{
        // 读取原始图片
        ByteArrayInputStream input = new ByteArrayInputStream( imageData );
        BufferedImage originalImage = ImageIO.read( input );

        // 计算原始图片大小
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        ImageIO.write( originalImage, format.getFormatName(), output );
        long originalSize = output.toByteArray().length;

        // 如果原始图片大小小于目标大小，则不进行压缩
        if( originalSize <= maxSize ){
            return imageData;
        }

        // 计算压缩比例
        double ratio = Math.sqrt( ( double ) maxSize / originalSize );

        // 计算压缩后的尺寸
        int compressedWidth = ( int ) Math.round( originalImage.getWidth() * ratio );
        int compressedHeight = ( int ) Math.round( originalImage.getHeight() * ratio );

        // 创建缩放后的图片
        BufferedImage compressedImage = new BufferedImage( compressedWidth, compressedHeight, BufferedImage.TYPE_INT_RGB );
        Graphics2D graphics = compressedImage.createGraphics();
        graphics.drawImage( originalImage, 0, 0, compressedWidth, compressedHeight, null );
        graphics.dispose();

        // 输出流
        ByteArrayOutputStream compressedOutput = new ByteArrayOutputStream();

        // 写入压缩后的图片
        ImageIO.write( compressedImage, format.getFormatName(), compressedOutput );

        // 将输出流转为byte数组
        byte[] compressedData = compressedOutput.toByteArray();

        // 关闭输入输出流
        input.close();
        output.close();
        compressedOutput.close();

        return compressedData;
    }


    public static byte[] imageToByte( String imagePath ){
        try( InputStream in = new FileInputStream( imagePath );
             ByteArrayOutputStream out = new ByteArrayOutputStream() ){
            byte[] buffer = new byte[ 1024 ];
            int length;
            while( ( length = in.read( buffer ) ) != -1 ){
                out.write( buffer, 0, length );
            }
            return out.toByteArray();
        } catch( IOException e ){
            throw new RuntimeException( e );
        }
    }
}

