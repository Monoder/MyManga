package com.monoder.mymanga.service;

import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.utils.MangaWrapperUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith( SpringRunner.class )
@SpringBootTest
public class MangaInfoServiceTest{
    @Autowired
    private IMangaInfoService iMangaInfoService;

    @Test
    public void batchAddMangaInfo(){
        String folderPath = "J:\\♥EX-Hentai♥\\♥New♥\\2023_03_07";
        List< MangaInfo > mangaInfoList = MangaWrapperUtils.getMangaInfoList( folderPath );
        Integer rows = iMangaInfoService.batchAddMangaInfo( mangaInfoList );
        System.out.println( "新增成功: " + rows );

    }

    @Test
    public void listMangaInfo(){

        DataTables dataTables = new DataTables();
        dataTables.setPageNum( 1 );
        dataTables.setPageSize( 2 );

        JsonResult jsonResult = new JsonResult<>( dataTables );

        JsonResult result = iMangaInfoService.listMangaInfo( jsonResult );

    }

    @Test
    public void getWrapperByGuid(){
        String guid = "F992A79DA02B34C9E0535858A8C094DB";
        String result = iMangaInfoService.getWrapperByGuid( guid );
        System.out.println( result.length() );
    }
}
