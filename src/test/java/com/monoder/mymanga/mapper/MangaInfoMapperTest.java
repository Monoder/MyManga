package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.po.DicEnumCategory;
import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.MangaInfoVO;
import com.monoder.mymanga.utils.BeanConvertUtils;
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
    public void getMangaInfoByGuid(){
        String guid = "F9C15BD586DF10DEE0535858A8C0C20A";
        MangaInfoVO mangaInfoVO = mangaInfoMapper.getMangaInfoByGuid( guid );
        System.out.println( mangaInfoVO );
        MangaInfoDTO mangaInfoDTO = BeanConvertUtils.convertWithNested( mangaInfoVO, MangaInfoDTO.class, "dicEnumCategoryVO", DicEnumCategoryDTO.class );
        System.out.println( mangaInfoDTO );

    }
}
