package com.monoder.mymanga.entity.vo;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import java.io.Serializable;

@Data
public class JsonResult< E > implements Serializable{
    /**
     * 定义jackson对象
     */
    private static final ObjectMapper MAPPER = new ObjectMapper();
    /**
     * 响应业务状态
     */
    private Integer status;
    /**
     * 响应消息
     */
    private String message;
    /**
     * 涉及数据行数
     */
    private Integer rows;
    /**
     * DataTables 返回固定格式数据
     */
    private DataTables dataTables;
    /**
     * 响应中的数据
     */
    private Object data;

    public JsonResult(){
    }

    public JsonResult( DataTables dataTables ){
        this.dataTables = dataTables;
    }

    public JsonResult( Integer status, Integer rows ){
        this.status = status;
        this.rows = rows;
    }

    public JsonResult( Object data ){
        this.data = data;
    }

}
