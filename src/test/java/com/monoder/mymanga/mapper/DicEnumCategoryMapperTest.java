package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;
import com.monoder.mymanga.entity.po.DicEnumCategory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
@RunWith( SpringRunner.class )
public class DicEnumCategoryMapperTest{

    @Autowired
    private DicEnumCategoryMapper dicEnumCategoryMapper;

    @Test
    public void listDicEnum(){
        String categoryCode = "TAG";
        List< DicEnumCategoryDTO > dicEnumCategoryList = dicEnumCategoryMapper.listDicEnumCategory( categoryCode );
        for( DicEnumCategoryDTO i: dicEnumCategoryList ){
            System.out.println( i.toString() );
        }
    }

    @Test
    public void getGuidByID(){
        Integer id = 26960010;
        System.out.println( dicEnumCategoryMapper.getGuidByID( id ) == null );
    }
}
