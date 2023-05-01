package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.vo.MangaDetailVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MangaDetailMapper{

    Integer batchAddMangaDetail( List< MangaDetailVO > mangaDetailVOList );

    Integer batchDeleteMangaDetail( @Param( "mainGuidList" ) List<String> mainGuidList );

    List< MangaDetailVO > listMangaDetailByGuid( @Param( "mainGuid" ) String mainGuid );

    Integer getRowsByGuids( @Param( "mainGuidList" ) List<String> mainGuid );

    MangaDetailVO getPicPathById( @Param( "id" ) String picId );

}
