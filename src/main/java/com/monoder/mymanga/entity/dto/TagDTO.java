package com.monoder.mymanga.entity.dto;

import lombok.Data;

@Data
public class TagDTO{
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
    private DicEnumCategoryDTO dicEnumCategoryDTO;

}
