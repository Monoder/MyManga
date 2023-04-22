package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.po.MangaDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MangaDetailMapper{

    Integer batchAddMangaInfo( String MangaPath );

    List< MangaDetail > listMangaDetailByGuid( String MangaGuid );


}
