package com.monoder.mymanga.entity.po;

import lombok.Data;

@Data
public class TagInfo{
    private String guid;
    private String mangaGuid;
    private String tagGuid;
    private String tagCategory;
    private String createTime;
}
