package com.monoder.mymanga.common.enums;

public enum ImageFormat{
    JPEG( "jpg", "image/jpeg" ),
    PNG( "png", "image/png" ),
    GIF( "gif", "image/gif" ),
    BMP( "bmp", "image/bmp" ),
    WEBP( "webp", "image/webp" );

    private final String extension; // 图片格式的扩展名
    private final String mimeType; // 图片格式的MIME类型

    ImageFormat( String extension, String mimeType ){
        this.extension = extension;
        this.mimeType = mimeType;
    }

    public String getExtension(){
        return extension;
    }

    public String getMimeType(){
        return mimeType;
    }

    public String getFormatName(){
        return name();
    }


    /**
     * 根据扩展名获取对应的图片格式
     *
     * @param extension 扩展名
     * @return 对应的图片格式，如果不存在则返回null
     */
    public static ImageFormat fromExtension( String extension ){
        for( ImageFormat format: ImageFormat.values() ){
            if( format.getExtension().equalsIgnoreCase( extension ) ){
                return format;
            }
        }
        return null;
    }

    /**
     * 根据MIME类型获取对应的图片格式
     *
     * @param mimeType MIME类型
     * @return 对应的图片格式，如果不存在则返回null
     */
    public static ImageFormat fromMimeType( String mimeType ){
        for( ImageFormat format: ImageFormat.values() ){
            if( format.getMimeType().equalsIgnoreCase( mimeType ) ){
                return format;
            }
        }
        return null;
    }

}

