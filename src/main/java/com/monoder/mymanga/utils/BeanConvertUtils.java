package com.monoder.mymanga.utils;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

/**
 * Bean属性拷贝工具类
 */
public class BeanConvertUtils< S, T >{

    /**
     * 单个对象转换
     *
     * @param source 原对象
     * @param targetClass 目标对象类型
     * @return 目标对象
     */
    public static < S, T > T convert( S source, Class< T > targetClass ){
        if( source == null ){
            return null;
        }
        try{
            T targetObject = targetClass.getDeclaredConstructor().newInstance();
            BeanUtils.copyProperties( source, targetObject );
            return targetObject;
        } catch( InstantiationException | IllegalAccessException | InvocationTargetException |
                 NoSuchMethodException e ){
            throw new RuntimeException( e );
        }
    }

    /**
     * 集合转换
     *
     * @param sources 原集合
     * @param targetClass 目标对象类型
     * @return 目标集合
     */
    public static < S, T > List< T > convertList( List< S > sources, Class< T > targetClass ){
        if( sources == null || sources.isEmpty() ){
            return new ArrayList<>();
        }
        List< T > targets = new ArrayList<>();
        for( S source: sources ){
            T target = convert( source, targetClass );
            targets.add( target );
        }
        return targets;
    }


    /**
     * 使用 BeanUtils 实现对象属性拷贝，并支持嵌套对象属性的拷贝
     * @param sourceObj 源对象
     * @param targetObjClass 目标对象类
     * @param nestedObjects 嵌套对象数组，包含原对象中的嵌套对象名和 目标对象对应的嵌套对象class，如："dicEnumCategoryVO", DicEnumCategoryDTO.class
     * @param <T> 目标对象类型
     * @return 目标对象实例
     */
    public static <T> T convertWithNested(Object sourceObj, Class<T> targetObjClass, Object... nestedObjects) {
        // 参数校验
        if (sourceObj == null || targetObjClass == null) {
            throw new IllegalArgumentException("sourceObj 和 targetObjClass 不能为空");
        }

        T targetObj;
        try {
            targetObj = targetObjClass.newInstance();
        } catch (Exception e) {
            throw new RuntimeException("创建目标对象实例失败", e);
        }

        // 将源对象属性拷贝到目标对象中
        try {
            BeanUtils.copyProperties(targetObj, sourceObj);
        } catch (IllegalAccessException | InvocationTargetException e) {
            throw new RuntimeException("拷贝源对象属性到目标对象失败", e);
        }

        // 处理嵌套对象
        if (nestedObjects != null && nestedObjects.length > 0) {
            for (int i = 0; i < nestedObjects.length - 1; i += 2) {
                // 获取嵌套对象名和目标嵌套对象class
                String nestedObjName = (String) nestedObjects[i];
                Class<?> targetNestedObjClass = (Class<?>) nestedObjects[i + 1];
                if (nestedObjName == null || targetNestedObjClass == null) {
                    continue;
                }
                try {
                    // 获取原嵌套对象
                    Object sourceNestedObj = PropertyUtils.getProperty(sourceObj, nestedObjName);
                    // 创建目标嵌套对象
                    Object targetNestedObj = targetNestedObjClass.newInstance();
                    // 将原嵌套对象属性拷贝到目标嵌套对象中
                    BeanUtils.copyProperties(targetNestedObj, sourceNestedObj);
                    // 获取嵌套属性名
                    PropertyDescriptor[] targetPds = PropertyUtils.getPropertyDescriptors(targetObj);
                    String nestedPropName = null;
                    for (PropertyDescriptor pd : targetPds) {
                        if (targetNestedObjClass.isAssignableFrom(pd.getPropertyType())) {
                            nestedPropName = pd.getName();
                            break;
                        }
                    }
                    // 使用嵌套属性名设置属性值
                    if (nestedPropName != null) {
                        BeanUtils.setProperty(targetObj, nestedPropName, targetNestedObj);
                    } else {
                        throw new RuntimeException("目标对象中未找到嵌套属性类型为 " + targetNestedObjClass.getName() + " 的属性");
                    }
                } catch (Exception e) {
                    throw new RuntimeException("设置目标对象嵌套属性失败", e);
                }
            }
        }
        return targetObj;
    }


    /**
     * 将一个对象列表转换为另一个对象列表，并支持嵌套属性的转换。
     *
     * @param sourceList     源对象列表
     * @param targetListType 目标对象列表类型
     * @param nestedObjects  嵌套对象名和对应目标对象类型的参数列表，按照名称和类型的顺序排列
     * @return 目标对象列表
     */
    public static <T> List<T> convertListWithNested(List<?> sourceList, Class<T> targetListType,
                                                    Object... nestedObjects) {
        // 参数校验
        if (sourceList == null || targetListType == null) {
            throw new IllegalArgumentException("sourceList 和 targetListType 不能为空");
        }
        List<T> targetList = new ArrayList<>();
        for (Object sourceObj : sourceList) {
            // 转换对象并添加到目标列表
            T targetObj = convertWithNested(sourceObj, targetListType, nestedObjects);
            targetList.add(targetObj);
        }
        return targetList;
    }


}