package com.monoder.mymanga.utils;

import com.github.pagehelper.PageInfo;

import java.util.List;

public class PageInfoUtil{
    /**
     * 复制 PageInfo 对象，并将其 List 集合替换为新的 List 集合
     * @param pageInfo 待复制的 PageInfo 对象
     * @param list 新的 List 集合
     * @param <T> 集合中元素的类型
     * @return 新的 PageInfo 对象
     */
    public static <T> PageInfo<T> copy( PageInfo<?> pageInfo, List<T> list) {
        PageInfo<T> newPageInfo = new PageInfo<>();
        newPageInfo.setList(list);
        newPageInfo.setPageNum(pageInfo.getPageNum());
        newPageInfo.setPageSize(pageInfo.getPageSize());
        newPageInfo.setStartRow(pageInfo.getStartRow());
        newPageInfo.setEndRow(pageInfo.getEndRow());
        newPageInfo.setTotal(pageInfo.getTotal());
        newPageInfo.setPages(pageInfo.getPages());
        newPageInfo.setIsFirstPage(pageInfo.isIsFirstPage());
        newPageInfo.setIsLastPage(pageInfo.isIsLastPage());
        newPageInfo.setHasPreviousPage(pageInfo.isHasPreviousPage());
        newPageInfo.setHasNextPage(pageInfo.isHasNextPage());
        newPageInfo.setNavigatePages(pageInfo.getNavigatePages());
        newPageInfo.setNavigatepageNums(pageInfo.getNavigatepageNums());
        newPageInfo.setNavigateFirstPage(pageInfo.getNavigateFirstPage());
        newPageInfo.setNavigateLastPage(pageInfo.getNavigateLastPage());
        return newPageInfo;
    }
}
