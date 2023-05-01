package com.monoder.mymanga.entity.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MangaInfoVO{
    private String guid;
    private String mangaName;
    private String transName;
    private byte[] wrapper;
    private String mangaPath;
    private String remark;
    private Integer isDeleted;
    private Integer isLiked;
    private Integer pageCount;
    private String categoryGuid;
    private DicEnumCategoryVO dicEnumCategoryVO;
    private String updateTime;
    private String createTime;
    private String creator;

    public MangaInfoVO(){
        // 在构造函数中创建 DicEnumCategoryDTO 对象并设置给 dicEnumCategoryDTO 属性
        this.dicEnumCategoryVO = new DicEnumCategoryVO();
    }
}
