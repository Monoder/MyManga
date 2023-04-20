package com.monoder.mymanga.utils;

import com.monoder.mymanga.entity.dto.DicEnumCategoryDTO;
import com.monoder.mymanga.entity.dto.MangaInfoDTO;
import com.monoder.mymanga.entity.vo.DicEnumCategoryVO;
import com.monoder.mymanga.entity.vo.MangaInfoVO;
import org.apache.commons.beanutils.BeanUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

@RunWith( SpringRunner.class )
@SpringBootTest
public class BeanConvertUtilsTest{

    /**
     * VO --> DTO
     */
    @Test
    public void convert(){

        DicEnumCategoryVO dicEnumCategoryVO = new DicEnumCategoryVO();
        dicEnumCategoryVO.setGuid( "dicEnumCategoryVOGuid" );

        MangaInfoVO mangaInfoVO = new MangaInfoVO();
        mangaInfoVO.setGuid( "TestGuid" );
        mangaInfoVO.setDicEnumCategoryVO( dicEnumCategoryVO );

        MangaInfoDTO mangaInfoDTO = BeanConvertUtils.convertWithNested(
                mangaInfoVO, MangaInfoDTO.class,
                "dicEnumCategoryVO", DicEnumCategoryDTO.class );
        System.out.println( mangaInfoVO );
        System.out.println( mangaInfoDTO );
    }

    @Test
    public void convertListWithNested(){
        DicEnumCategoryVO dicEnumCategoryVO = new DicEnumCategoryVO();
        dicEnumCategoryVO.setGuid( "dicEnumCategoryVOGuid" );

        MangaInfoVO mangaInfoVO = new MangaInfoVO();
        mangaInfoVO.setGuid( "TestGuid" );
        mangaInfoVO.setDicEnumCategoryVO( dicEnumCategoryVO );

        List<MangaInfoVO> mangaInfoVOS = new ArrayList<>();
        mangaInfoVOS.add( mangaInfoVO );

        List< MangaInfoDTO > mangaInfoDTOS =BeanConvertUtils.convertListWithNested(
                mangaInfoVOS, MangaInfoDTO.class,
                "dicEnumCategoryVO", DicEnumCategoryDTO.class );
        System.out.println( mangaInfoVOS.get( 0 ) );
        System.out.println( mangaInfoDTOS.get( 0 ) );
    }

    @Test
    public void setProperty() throws InvocationTargetException, IllegalAccessException{
        MangaInfoDTO mangaInfoDTO = new MangaInfoDTO();
        mangaInfoDTO.setGuid( "TestGuid" );
        Object targetObj = mangaInfoDTO;

        // 获取 targetObj 的类对象
        Class< ? > clazz = targetObj.getClass();

        // 获取所有的属性
        Field[] fields = clazz.getDeclaredFields();

        // 遍历属性，判断属性名和类型是否满足条件
        for( Field field: fields ){
            System.out.println( "FieldName: " + field.getName() + " 字段名是否相等: " + field.getName().equals( "DicEnumCategoryDTO" )
                    + "\nFieldType: " + field.getType() + "字段类型是否相等: " + field.getType().equals( DicEnumCategoryDTO.class )
                    + "\nFieldGenericType: " + field.getGenericType() + "\n" );

            if( field.getName().equals( "DicEnumCategoryDTO" ) && field.getType().equals( DicEnumCategoryDTO.class ) ){
                System.out.println( "targetObj 中已经有名为 \"DicEnumCategoryDTO\" 的属性，并且该属性的类型是 DicEnumCategoryDTO" );
                break;
            }
        }

        DicEnumCategoryDTO dicEnumCategoryDTO = new DicEnumCategoryDTO();
        dicEnumCategoryDTO.setGuid( "TestCategoryDTOGuid" );
        Object targetNestedObj = dicEnumCategoryDTO;

        String name = targetNestedObj.getClass().getSimpleName();
        System.out.println( name );

        BeanUtils.setProperty( targetObj, name, targetNestedObj );

        System.out.println( targetObj );

    }

    @Test
    public void getMangaInfoDTO(){
        MangaInfoDTO mangaInfoDTO = new MangaInfoDTO();
        System.out.println( mangaInfoDTO );
    }
}
