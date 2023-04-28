package com.monoder.mymanga.entity.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.ALWAYS)
public class MangaInfoDTO{
    private String guid;
    private String mangaName;
    private String transName;
    private String wrapper;
    private String remark;
    private Integer isDeleted;
    private Integer isLiked;
    private Integer pageCount;
    private String categoryGuid;
    private DicEnumCategoryDTO dicEnumCategoryDTO;
    private String  updateTime;
    private String  createTime;
    private String creator;
    private List< MangaDetailDTO > mangaDetailDTOList;

    public MangaInfoDTO() {
        // 在构造函数中创建 DicEnumCategoryDTO 对象并设置给 dicEnumCategoryDTO 属性
        this.dicEnumCategoryDTO = new DicEnumCategoryDTO();
        this.mangaDetailDTOList = new ArrayList<>();
    }

}
