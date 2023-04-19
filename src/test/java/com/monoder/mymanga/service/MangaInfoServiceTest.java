package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.JsonResult;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith( SpringRunner.class )
@SpringBootTest
public class MangaInfoServiceTest{
    @Autowired
    private IMangaInfoService iMangaInfoService;
    @Test
    public void listMangaInfo(){

        DataTables dataTables = new DataTables();
        dataTables.setPageNum( 1 );
        dataTables.setPageSize( 2 );

        JsonResult jsonResult = new JsonResult<>( dataTables );

        JsonResult result = iMangaInfoService.listMangaInfo( jsonResult );

    }
}
