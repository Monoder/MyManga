package com.monoder.mymanga.entity.vo;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DataTables{
    /**
     * 每次查询后自增
     */
    private Integer draw;
    /**
     * 开始位置
     */
    private Integer start;
    /**
     * 页面大小
     */
    private Integer length;
    /**
     * 页码
     */
    private Integer pageNum;
    /**
     * 页面大小
     */
    private Integer pageSize;
    private List< Order > order = new ArrayList<>();

    @Data
    public static class Order{
        private String orderColumn;
        private String orderType;

    }


}
