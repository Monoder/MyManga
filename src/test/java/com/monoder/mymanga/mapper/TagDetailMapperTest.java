package com.monoder.mymanga.mapper;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.monoder.mymanga.entity.dto.TagDTO;
import com.monoder.mymanga.entity.po.TagDetail;
import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.JsonResult;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@RunWith( SpringRunner.class )
public class TagDetailMapperTest{

    @Autowired
    private TagDetailMapper tagDetailMapper;

    @Test
    public void listTagDetail(){
/*
        DataTables dataTables = new DataTables();
        DataTables.Order order = new DataTables.Order( );
        order.setOrderColumn( "guid" );
        order.setOrderType( "ASC" );
        dataTables.getOrder().add( order );
*/
        List< TagDTO > tagDTOS = tagDetailMapper.listTagDetail();
        System.out.println( tagDTOS );
    }

    @Test
    public void findTagByName(){
        String name = "chinese";
        System.out.println( tagDetailMapper.findTagByName( name ) );
    }

    @Test
    public void getTagDetailById(){
    }

    @Test
    public void getMaxTagDetailId(){
        System.out.println( tagDetailMapper.getMaxTagDetailId() );
    }

}
