

/**
 *
 * @param dateString Oracle 数据库的18位日期字符串
 * @returns {string} 格式化后的日期
 */
function dateFormat( dateString ) {
    if ( dateString == null ) {return null;}
    let year = dateString.substring( 0, 4 );
    let month = dateString.substring( 4, 6 );
    let day = dateString.substring( 6, 8 );
    let hour = dateString.substring( 8, 10 );
    let minute = dateString.substring( 10, 12 );
    let second = dateString.substring( 12, 14 );
    let millisecond = dateString.substring( 14, 17 );
    // let date = new Date( year, month, day, hour, minute, second );
    return year + "/" + month + "/" + day + "  " + hour + ":" + minute + ":" + second; //+ "." + millisecond;
}

/**
 *
 * @param originalData dataTables 发送的原始数据
 */
function dataTablePostData( originalData ) {
    let dataDraw = originalData.draw;
    let dataStart = originalData.start;
    let dataLength = originalData.length;
    let dataColumns = originalData.columns;
    let dataOrder = originalData.order;
    // 发送的 postData - order 字段
    let order = [];
    for ( let key in dataOrder ) {
        let orderColIndex = dataOrder[ key ].column;
        let orderType = dataOrder[ key ].dir;
        let column = {
            "orderColumn": dataColumns[ orderColIndex ].data,
            "orderType": orderType
        };
        order.push( column )
    }

    let dataTables = {
        "draw": dataDraw,
        "start": dataStart,
        "length": dataLength,
        "pageNum": dataStart === 0 ? 1 : (dataStart / dataLength + 1),
        "pageSize": dataLength,
        "order": order
    };

    return { dataTables: dataTables };

}

/**
 *
 * @param dicCategoryCode Category 名称
 * @returns {[]}
 */
function getCategoryList( categoryCode ) {
    // 存放 field.option 的 label - value 返回集合
    let categoryList = [];
    let data = $.ajax( {
        type: "get",
        datatype: "JSON",
        data: { categoryCode: categoryCode },
        async: false,
        url: "/DicEnum/listDicEnum",
        success: function ( result ) {
            for ( let i in result ) {
                // 中转存放单条序列化数据
                categoryList.push( { "label": result[ i ].dicEnumName, "value": result[ i ].dicEnumID } )
            }
        }
    } )
    return categoryList;
}
