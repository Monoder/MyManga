package com.monoder.mymanga.tools;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SystemInfoTools{

    public static void main ( String[] args ) {
        String now = getNow ( );
        String getCurrentTime = getCurrentTime ();
        System.out.println ( now );
        System.out.println ( getCurrentTime );
        System.out.println ( getUser () );
    }

    /**
     * 用于 git 同步时间戳
     * @return
     */
    public static String getNow ( ) {
        //设置日期格式
        SimpleDateFormat df = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss" );
        // new Date()为获取当前系统时间
        String now = "[" + df.format ( new Date ( ) ) + "]";
        return now;
    }

    /**
     * 数据库时间戳
     * @return
     */
    public static String getCurrentTime ( ) {
        //设置日期格式
        SimpleDateFormat df = new SimpleDateFormat ( "yyyyMMddHHmmssSSS" );
        // new Date()为获取当前系统时间
        String getNow = df.format ( new Date ( ) );
        return getNow;
    }


    public static String getUser ( ) {
        String userIP = null;
        String userName = null;
        try {
            // 获取IP地址
            userIP = InetAddress.getLocalHost ( ).getHostAddress ( );
            // 获取计算机名
            userName = InetAddress.getLocalHost ( ).getHostName ( );
        } catch ( UnknownHostException e ) {
            e.printStackTrace ( );
        }
        return userName;
    }

}

