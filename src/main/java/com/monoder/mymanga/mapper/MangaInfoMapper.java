package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.MangaInfoVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MangaInfoMapper{

    /**
     *
     * @param mangaInfoVO
     * @return 返回Guid
     */
    Integer addMangaInfo( MangaInfoVO mangaInfoVO );

    Integer batchAddMangaInfo( List< MangaInfo > mangaInfoList );

    List< MangaInfoVO > listMangaInfo( DataTables dataTables );

    List< MangaInfoVO > listMangaInfo();

    MangaInfoVO getMangaInfoByGuid( String mangaGuid );

    String getGuidByName( String mangaName );

    MangaInfo getWrapperByGuid( String guid );


}
