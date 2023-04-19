package com.monoder.mymanga.entity.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DicEnumCategoryVO{
    private String guid;
    private String categoryCode;
    private Integer dicEnumID;
    private String dicEnumName;
    private String transName;
    private Integer status;
    private String remark;
    private String createTime;

}
