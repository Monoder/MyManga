package com.monoder.mymanga.entity.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MangaInfo{
    private String guid;
    private String mangaName;
    private String transName;
    private byte[] wrapper;
    private String remark;
    private Integer isDeleted;
    private Integer isLiked;
    private Integer pageCount;
    private String categoryGuid;
    private String  updateTime;
    private String  createTime;
    private String creator;

}
