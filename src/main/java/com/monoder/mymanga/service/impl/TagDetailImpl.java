package com.monoder.mymanga.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.monoder.mymanga.entity.dto.TagDTO;
import com.monoder.mymanga.entity.po.TagDetail;
import com.monoder.mymanga.entity.vo.DataTables;
import com.monoder.mymanga.entity.vo.JsonResult;
import com.monoder.mymanga.mapper.DicEnumCategoryMapper;
import com.monoder.mymanga.mapper.TagDetailMapper;
import com.monoder.mymanga.service.ITagDetailService;
import com.monoder.mymanga.service.exception.InsertException;
import com.monoder.mymanga.tools.SystemInfoTools;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Monoder
 */
@Service
public class TagDetailImpl implements ITagDetailService{

    // 创建日志对象
    private final Logger logger = LoggerFactory.getLogger( ITagDetailService.class );
    @Autowired
    private TagDetailMapper tagDetailMapper;
    @Autowired
    private DicEnumCategoryMapper dicEnumCategoryMapper;

    @Override
    public TagDTO addTag(TagDTO tagDTO) {
        // 1. 判断 TagName 是否存在
        Integer result = tagDetailMapper.findTagByName(tagDTO.getTagName());
        if (result != 0) {
            String errorMsg = "Tag: \"" + tagDTO.getTagName() + "\" 已存在！";
            logger.error(errorMsg);
            throw new InsertException(errorMsg);
        }

        // 2. 判断所属分类是否存在
        String categoryGuid = dicEnumCategoryMapper.getGuidByID(tagDTO.getDicEnumCategoryDTO().getDicEnumID());
        if (categoryGuid == null) {
            String errorMsg = "找不到所属分类，请刷新重试！";
            logger.error(errorMsg);
            throw new InsertException(errorMsg);
        }
        tagDTO.setCategoryGuid(categoryGuid);

        // 3. 获取最大 ID
        Integer nextId = tagDetailMapper.getMaxTagDetailId() + 1;
        tagDTO.setId(nextId);

        // 4. 复制到 po 层
        TagDetail tagDetail = new TagDetail();
        BeanUtils.copyProperties(tagDTO, tagDetail);


        // 5. 补全其他信息
        tagDetail.setIsDeleted(2);
        tagDetail.setCreateTime(SystemInfoTools.getDataBaseTime());
        tagDetail.setUpdateTime(SystemInfoTools.getDataBaseTime());
        tagDetail.setCreator(SystemInfoTools.getUser());

        // 6. 插入并返回结果
        Integer rows = tagDetailMapper.addTag(tagDetail);
        return tagDetailMapper.getTagDetailById(nextId);
    }


    @Override
    public Integer logicalDelete( List< TagDetail > tagDetailList ){
        return null;
    }

    @Override
    public Integer logicalDeleteByGuids( String[] tagGuids ){
        Integer rows = tagDetailMapper.logicalDeleteByGuids( tagGuids );
        return rows;
    }

    @Override
    public TagDTO updateTagDetail( TagDTO tagDTO ){
        // 1. 补全分类 Guid、更新时间
        tagDTO.setCategoryGuid( dicEnumCategoryMapper.getGuidByID( tagDTO.getDicEnumCategoryDTO().getDicEnumID() ) );
        tagDTO.setUpdateTime( SystemInfoTools.getDataBaseTime() );
        // 2. 复制 到 po 层
        TagDetail tagDetail = new TagDetail();
        BeanUtils.copyProperties( tagDTO, tagDetail );
        // 3. 更新返回结果
        Integer rows = tagDetailMapper.updateTagDetail( tagDetail );
        return tagDetailMapper.getTagDetailByGuid( tagDetail.getGuid() );

    }

    @Override
    public JsonResult< Object > listTagDetail( JsonResult< Object > requestJsonRequest ){
        // 1. 获取传入数据中的 DataTables 对象
        DataTables dataTables = requestJsonRequest.getDataTables();
        // 2. 设定 PageHelper
        PageHelper.startPage( dataTables.getPageNum(), dataTables.getPageSize() );
        // 3. 访问数据库获取数据
        List< TagDTO > tagDTOS = tagDetailMapper.listTagDetail( dataTables );
        // 3. 取出分页后的数据
        PageInfo< TagDTO > tagDetailPageInfo = new PageInfo<>( tagDTOS );
        // 4. 对数据进行封装返回
        JsonResult< Object > jsonResult = new JsonResult<>( );
        jsonResult.getDataTables().setDraw( dataTables.getDraw() );
        jsonResult.setData( tagDetailPageInfo );
        //5. 输出日志
        logger.info( "【service-listTagDetail】处理完成" );
        return jsonResult;

    }

}
