package com.monoder.mymanga.utils;

import java.util.Random;

public class StringUtils{

    public static String getRandomNumber(){
        Random random = new Random();
        int randomNumber = random.nextInt( 900000 ) + 100000;
        return String.valueOf( randomNumber );
    }

    public static void main( String[] args ){
        System.out.println( "getRandomNumber() = " + getRandomNumber() );
    }

    public static String getFileNamePrefix(){
        return getRandomNumber() + "_pic_";
    }

    public static String getFileName( String namePrefix, int index ){
        return namePrefix + String.format( "%04d", index );
    }

}
