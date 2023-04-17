package com.monoder.mymanga.entity.po;

import lombok.Data;

@Data
public class DicEnumCategory{
    private String guid;
    private String categoryCode;
    private Integer dicEnumID;
    private String dicEnumName;
    private String transName;
    private Integer status;
    private String remark;
    private String createTime;

}
