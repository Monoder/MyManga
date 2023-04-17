package com.monoder.mymanga.entity.po;

import lombok.Data;

@Data
public class MangaInfo{
    private String guid;
    private String mangaName;
    private String transName;
    private String remark;
    private Integer isDeleted;
    private Integer isLiked;
    private Integer pageCount;
    private String updateTime;
    private String createTime;
    private String creator;
}
