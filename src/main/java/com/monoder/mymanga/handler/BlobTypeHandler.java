package com.monoder.mymanga.handler;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.sql.*;

/**
 * 自定义 MyBatis 类型处理器，用于将 byte[] 类型字段与数据库 BLOB 类型映射。
 */
public class BlobTypeHandler extends BaseTypeHandler< byte[] >{

    private final Logger logger = LoggerFactory.getLogger( BlobTypeHandler.class );

    /**
     * 将非 null 的 byte[] 类型参数转换成 InputStream 后设置到 PreparedStatement 中。
     *
     * @param preparedStatement PreparedStatement 对象
     * @param columnIndex        参数下标
     * @param parameter          参数值
     * @param jdbcType           JDBC 类型
     * @throws SQLException SQL 异常
     */
    @Override
    public void setNonNullParameter( PreparedStatement preparedStatement, int columnIndex, byte[] parameter, JdbcType jdbcType ) throws SQLException{
        logger.info( "【setNonNullParameter】处理开始" );
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(parameter);
        preparedStatement.setBlob(columnIndex, byteArrayInputStream);
    }

    /**
     * 获取可空的 byte[] 类型结果。
     *
     * @param resultSet   ResultSet 对象
     * @param columnName  列名
     * @return 可空的 byte[] 类型结果
     * @throws SQLException SQL 异常
     */
    @Override
    public byte[] getNullableResult( ResultSet resultSet, String columnName ) throws SQLException{
        Blob blob = resultSet.getBlob( columnName );
        return blob.getBytes( 1, ( int ) blob.length() );
    }

    /**
     * 获取可空的 byte[] 类型结果。
     *
     * @param resultSet   ResultSet 对象
     * @param columnIndex 列下标
     * @return 可空的 byte[] 类型结果
     * @throws SQLException SQL 异常
     */
    @Override
    public byte[] getNullableResult( ResultSet resultSet, int columnIndex ) throws SQLException{
        Blob blob = resultSet.getBlob( columnIndex );
        return blob.getBytes( 1, ( int ) blob.length() );
    }

    /**
     * 获取可空的 byte[] 类型结果。
     *
     * @param callableStatement CallableStatement 对象
     * @param columnIndex       列下标
     * @return 可空的 byte[] 类型结果
     * @throws SQLException SQL 异常
     */
    @Override
    public byte[] getNullableResult( CallableStatement callableStatement, int columnIndex ) throws SQLException{
        Blob blob = callableStatement.getBlob( columnIndex );
        return blob.getBytes( 1, ( int ) blob.length() );
    }
}
