package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.po.MangaDetail;
import com.monoder.mymanga.entity.vo.MangaDetailVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MangaDetailMapper{

    Integer batchAddMangaDetail( List< MangaDetailVO > mangaDetailVOList );

    List< MangaDetail > listMangaDetailByGuid( String MangaGuid );


}
