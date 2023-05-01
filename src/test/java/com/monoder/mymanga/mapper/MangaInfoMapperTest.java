package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.vo.MangaInfoVO;
import com.monoder.mymanga.utils.BeanConvertUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;


@RunWith( SpringRunner.class )
@SpringBootTest
public class MangaInfoMapperTest{
    @Autowired
    private MangaInfoMapper mangaInfoMapper;


    @Test
    public void getMangaInfoByGuid(){
        String guid = "F9C15BD586DF10DEE0535858A8C0C20A";
        MangaInfoVO mangaInfoVO = mangaInfoMapper.getMangaInfoByGuid( guid );
        System.out.println( mangaInfoVO );
        MangaInfoDTO mangaInfoDTO = BeanConvertUtils.convertWithNested( mangaInfoVO, MangaInfoDTO.class, "dicEnumCategoryVO", DicEnumCategoryDTO.class );
        System.out.println( mangaInfoDTO );
    }

    @Test
    public void addMangaInfo(){
        MangaInfoVO mangaInfoVO = new MangaInfoVO();
        mangaInfoVO.setMangaName( "UploadTest" );
        mangaInfoVO.setIsDeleted( 2 );
        mangaInfoVO.getDicEnumCategoryVO().setDicEnumID( 42392222 );
        Integer rows = mangaInfoMapper.addMangaInfo(mangaInfoVO);
        System.out.println( rows );
        System.out.println( mangaInfoVO.getGuid() );
    }

    @Test
    public void getRowsByGuids(){
        List<String> guidList = new ArrayList<>();
        guidList.add( "FA670805A69392A2E0535858A8C0A5F0" );
        guidList.add( "FA66B1664A3B9134E0535858A8C0D1F3" );
        Integer rows = mangaInfoMapper.getRowsByGuids( guidList );
        System.out.println( "rows = " + rows );
    }
}
