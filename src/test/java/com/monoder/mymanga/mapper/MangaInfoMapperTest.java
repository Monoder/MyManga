package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.po.DicEnumCategory;
import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.MangaInfoVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;


@RunWith( SpringRunner.class )
@SpringBootTest
public class MangaInfoMapperTest{
    @Autowired
    private MangaInfoMapper mangaInfoMapper;

    @Test
    public void testListMangaInfo(){
        List< MangaInfoVO > mangaInfoList = mangaInfoMapper.listMangaInfo();
        for( MangaInfoVO mangaInfo: mangaInfoList ){
            System.out.println( mangaInfo);
        }
    }

    @Test
    public void listMangaInfo(){
        DataTables dataTables = new DataTables();
        dataTables.setPageSize( 5 );
        dataTables.setPageNum( 1 );

        List< MangaInfoVO > mangaInfoList = mangaInfoMapper.listMangaInfo( dataTables );
        for( MangaInfoVO mangaInfo: mangaInfoList ){
            System.out.println( mangaInfo);
        }
    }
}
