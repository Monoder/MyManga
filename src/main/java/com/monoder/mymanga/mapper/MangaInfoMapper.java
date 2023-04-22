package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.MangaInfoVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MangaInfoMapper{

    Integer batchAddMangaInfo( List< MangaInfo > mangaInfoList );

    List< MangaInfoVO > listMangaInfo( DataTables dataTables );

    List< MangaInfoVO > listMangaInfo();

    MangaInfoVO getMangaInfoByGuid( String mangaGuid );

    MangaInfo getWrapperByGuid( String guid );


}
