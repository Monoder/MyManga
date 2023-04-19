package com.monoder.mymanga.entity.dto;

import lombok.Data;

@Data
public class MangaInfoDTO{
    private String guid;
    private String mangaName;
    private String transName;
    private byte[] wrapper;
    private String remark;
    private String isDeleted;
    private String isLiked;
    private String pageCount;
    private String categoryGuid;
    private DicEnumCategoryDTO dicEnumCategoryDTO;
    private String  updateTime;
    private String  createTime;
    private String creator;

    public MangaInfoDTO() {
        // 在构造函数中创建 DicEnumCategoryDTO 对象并设置给 dicEnumCategoryDTO 属性
        this.dicEnumCategoryDTO = new DicEnumCategoryDTO();
    }

}
