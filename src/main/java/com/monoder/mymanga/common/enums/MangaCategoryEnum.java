package com.monoder.mymanga.common.enums;

public enum MangaCategoryEnum{
    DOUJINSHI( "Doujinshi", 42390000 ),
    MANGA( "Manga", 42391111 ),
    ARTIST_CG( "Artist CG", 42392222 ),
    GAME_CG( "Game CG", 42393333 ),
    WESTERN( "Western", 42394444 ),
    NON_H( "Non-H", 42395555 ),
    IMAGE_SET( "Image Set", 42396666 ),
    COSPLAY( "Cosplay", 42397777 ),
    ASIAN_PORN( "Asian Porn", 42398888 ),
    MISC( "Misc", 42399999 );

    private String name;
    private Integer id;

    MangaCategoryEnum( String name, Integer id ){
        this.name = name;
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public Integer getId(){
        return id;
    }

    public static Integer getIdByName( String name ){
        for( MangaCategoryEnum category: MangaCategoryEnum.values() ){
            if( category.getName().equalsIgnoreCase( name ) ){
                return category.getId();
            }
        }
        throw new IllegalArgumentException( "非法的Name: " + name );
    }

    public static String getNameById( Integer id ){
        for( MangaCategoryEnum category: MangaCategoryEnum.values() ){
            if( category.getId().equals( id ) ){
                return category.getName();
            }
        }
        throw new IllegalArgumentException( "非法的ID: " + id );
    }

}
