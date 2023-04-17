package com.monoder.mymanga.entity.po;

import lombok.Data;

@Data
public class TagDetail{
    private String guid;
    private Integer id;
    private String tagName;
    private String transName;
    private String remark;
    private Integer isDeleted;
    private Integer isLiked;
    private String categoryGuid;
    private String updateTime;
    private String createTime;
    private String creator;
}
