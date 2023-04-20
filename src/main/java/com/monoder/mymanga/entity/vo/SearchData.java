package com.monoder.mymanga.entity.vo;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SearchData{
    private String searchText;
    private List< String > categoryIdList;

    public SearchData(){
        this.categoryIdList = new ArrayList<>();
    }

    public SearchData( String searchText, List< String > categoryIdList ){
        this.searchText = searchText;
        this.categoryIdList = categoryIdList;
    }
}
