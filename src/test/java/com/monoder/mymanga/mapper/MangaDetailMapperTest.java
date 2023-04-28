package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.vo.MangaDetailVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.*;

@RunWith( SpringRunner.class )
@SpringBootTest
public class MangaDetailMapperTest{

    @Autowired
    private MangaDetailMapper mangaDetailMapper;
    @Test
    public void listMangaDetailByGuid(){

    }

    @Test
    public void getPicPathById(){

    }
}