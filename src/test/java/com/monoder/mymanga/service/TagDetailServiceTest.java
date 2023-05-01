package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.dto.DataTables;
import com.monoder.mymanga.entity.dto.JsonResult;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith( SpringRunner.class )
public class TagDetailServiceTest {
    @Autowired
    private ITagDetailService iTagDetailService;

    @Test
    public void listTagDetail( ) {
        DataTables dataTables = new DataTables();
        dataTables.setPageNum( 1 );
        dataTables.setPageSize( 2 );
        JsonResult< Object > jsonResult = new JsonResult<>( dataTables );
        System.out.println( iTagDetailService.listTagDetail( jsonResult ) );

    }
}
