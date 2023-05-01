package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.dto.TagDTO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

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
