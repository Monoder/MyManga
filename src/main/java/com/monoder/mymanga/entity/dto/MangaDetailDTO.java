package com.monoder.mymanga.entity.dto;

import lombok.Data;

@Data
public class MangaDetailDTO{
    private String guid;
    private String id;
    private Integer picNo;
    private String picName;
    private String picPath;
    private String mainGuid;
}
