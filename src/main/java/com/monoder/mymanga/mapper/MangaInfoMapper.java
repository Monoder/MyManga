package com.monoder.mymanga.mapper;

import com.monoder.mymanga.entity.po.MangaInfo;
import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.MangaInfoVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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

    Integer deleteMangaInfo( @Param( "guid" ) String guid );

    Integer batchDeleteMangaInfo( @Param( "guidList" ) List<String> guidList );

    List< MangaInfoVO > listMangaInfo( DataTables dataTables );

    Integer getRowsByGuids( @Param( "guidList" ) List<String> guidList );

    MangaInfoVO getMangaInfoByGuid( String mangaGuid );

    String getGuidByName( String mangaName );

    MangaInfo getWrapperByGuid( String guid );


}
