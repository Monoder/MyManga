package com.monoder.mymanga.common.constant;

import com.monoder.mymanga.common.enums.ImageFormatEnum;

public class MangaSourceConstant{
    private MangaSourceConstant(){
    }

    public static final long MAX_SIZE = 100 * 1024;
    public static final int MAX_WRAPPER_WIDTH = 240;
    public static final int MAX_WRAPPER_HEIGHT = 340;
    public static final float MAX_WRAPPER_QUALITY = 0.7f;

    public static final long MIN_SIZE = 50 * 1024;
    public static final int MIN_WRAPPER_WIDTH = 120;
    public static final int MIN_WRAPPER_HEIGHT = 170;
    public static final float MIN_WRAPPER_QUALITY = 0.4f;


    public static final ImageFormatEnum DEFAULT_WRAPPER_FORMAT = ImageFormatEnum.JPEG;
    public static final String DEFAULT_WRAPPER_MIME = DEFAULT_WRAPPER_FORMAT.getMimeType();
    public static final String DEFAULT_WRAPPER_BASE64_PREFIX = "data:" + DEFAULT_WRAPPER_MIME + ";base64,";


}
