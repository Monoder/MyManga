package com.monoder.mymanga.entity.dto;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
@RunWith( SpringRunner.class )
public class MangaInfoDTOTest{
    @Test
    public void getMangaInfoDTO(){
        MangaInfoDTO mangaInfoDTO = new MangaInfoDTO();
        System.out.println( mangaInfoDTO );
        MangaDetailDTO mangaDetailDTO = new MangaDetailDTO();
        mangaInfoDTO.getMangaDetailDTOList().add( mangaDetailDTO );
        System.out.println( mangaInfoDTO );
    }
}
