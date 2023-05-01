package com.monoder.mymanga.utils;

import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.vo.DicEnumCategoryVO;
import com.monoder.mymanga.entity.vo.MangaInfoVO;
import org.springframework.beans.BeanUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith( SpringRunner.class )
@SpringBootTest
public class BeanConvertUtilsTest{

    /**
     * VO --> DTO
     */
    @Test
    public void convert(){

        DicEnumCategoryDTO dicEnumCategoryDTO = new DicEnumCategoryDTO();
        dicEnumCategoryDTO.setGuid( "dicEnumCategoryVOGuid" );

        MangaInfoDTO mangaInfoDTO = new MangaInfoDTO();
        mangaInfoDTO.setGuid( "TestGuid" );
        mangaInfoDTO.setDicEnumCategoryDTO( dicEnumCategoryDTO );

        System.out.println( "mangaInfoDTO = " + mangaInfoDTO );

        MangaInfoDTO newMangaInfoDTO = new MangaInfoDTO();
        String[] ignoreProperties = { "mangaDetailDTOList" };
        BeanUtils.copyProperties( newMangaInfoDTO, mangaInfoDTO, ignoreProperties );

        System.out.println( "newMangaInfoDTO = " + newMangaInfoDTO );


    }

    @Test
    public void convertListWithNested(){
        DicEnumCategoryVO dicEnumCategoryVO = new DicEnumCategoryVO();
        dicEnumCategoryVO.setGuid( "dicEnumCategoryVOGuid" );

        MangaInfoVO mangaInfoVO = new MangaInfoVO();
        mangaInfoVO.setGuid( "TestGuid" );
        mangaInfoVO.setDicEnumCategoryVO( dicEnumCategoryVO );

        List< MangaInfoVO > mangaInfoVOS = new ArrayList<>();
        mangaInfoVOS.add( mangaInfoVO );

        List< MangaInfoDTO > mangaInfoDTOS = BeanConvertUtils.convertListWithNested(
                mangaInfoVOS, MangaInfoDTO.class,
                "dicEnumCategoryVO", DicEnumCategoryDTO.class );
        System.out.println( mangaInfoVOS.get( 0 ) );
        System.out.println( mangaInfoDTOS.get( 0 ) );
    }
}


