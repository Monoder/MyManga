/**
 *
 * @param dateString Oracle 数据库的18位日期字符串
 * @returns {string} 格式化后的日期
 */
function $dateFormat(dateString) {
    if (dateString == null) {
        return null;
    }
    let year = dateString.substring(0, 4);
    let month = dateString.substring(4, 6);
    let day = dateString.substring(6, 8);
    let hour = dateString.substring(8, 10);
    let minute = dateString.substring(10, 12);
    let second = dateString.substring(12, 14);
    let millisecond = dateString.substring(14, 17);
    // let date = new Date( year, month, day, hour, minute, second );
    return year + "/" + month + "/" + day + "  " + hour + ":" + minute + ":" + second; //+ "." + millisecond;
}

function formatDateString(input, format) {
    const year = input.substring(0, 4);
    const month = input.substring(4, 6);
    const day = input.substring(6, 8);
    const hour = input.substring(8, 10);
    const minute = input.substring(10, 12);
    const second = input.substring(12, 14);
    if (format === "date") {
        const output = `${year}/${month}/${day}`;
        return output;
    }
    const output = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    return output;
}

function getCurrentTime(format) {
    const date = new Date();
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    const millisecond = date.getMilliseconds().toString().padStart(3, '0');
    if (format === "date") {
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    }
    return `${year}${month}${day}${hour}${minute}${second}${millisecond}`;
}

/**
 *
 * @param dataTablesData dataTables 发送的原始数据
 */
function getDataTablesPostData(dataTablesData) {
    let dataDraw = dataTablesData.draw;
    let dataStart = dataTablesData.start;
    let dataLength = dataTablesData.length;
    let dataColumns = dataTablesData.columns;
    let dataOrder = dataTablesData.order;
    // 发送的 postData - order 字段
    let order = [];
    for (let key in dataOrder) {
        let orderColIndex = dataOrder[key].column;
        let orderType = dataOrder[key].dir;
        let column = {
            "orderColumn": dataColumns[orderColIndex].data,
            "orderType": orderType
        };
        order.push(column)
    }

    let dataTables = {
        "draw": dataDraw,
        "start": dataStart,
        "length": dataLength,
        "pageNum": dataStart === 0 ? 1 : (dataStart / dataLength + 1),
        "pageSize": dataLength,
        "order": order
    };

    return {dataTables: dataTables};

}

/**
 *
 * @param dicCategoryCode Category 名称
 * @returns {[]}
 */
function getCategoryList(categoryCode) {
    // 存放 field.option 的 label - value 返回集合
    let categoryList = [];
    let data = $.ajax({
        type: "get",
        datatype: "JSON",
        data: {categoryCode: categoryCode},
        async: false,
        url: "/DicEnum/listDicEnum",
        success: function (result) {
            for (let i in result) {
                // 中转存放单条序列化数据
                categoryList.push({"label": result[i].dicEnumName, "value": result[i].dicEnumID})
            }
        }
    })
    return categoryList;
}


/**
 * 传入参数，返回格式化的与后端交互数据
 * @param dataTables
 * @param searchData
 * @param data
 * @returns
 */
function newJsonResult(dataTables, searchData, data) {
    let jsonResult = {
        status: null,
        message: null,
        rows: null,
        dataTables: dataTables === null ? newDataTables() : dataTables,
        searchData: searchData === null ? newSearchData() : searchData,
        data: data === null ? null : data,
    }
    return jsonResult;
}

function newJsonResult(data) {
    let jsonResult = {
        status: null,
        message: null,
        rows: null,
        dataTables: newDataTables(),
        searchData: newSearchData(),
        data: data === null ? null : data,
    }
    return jsonResult;
}

function newDataTables(pageNum, pageSize) {
    let dataTables = {
        draw: null,
        start: null,
        length: null,
        pageNum: pageNum === null ? null : pageNum,
        pageSize: pageSize === null ? null : pageSize,
        order: [newOrder()],
    }
    return dataTables;

    function newOrder() {
        return {orderColumn: null, orderType: null,};
    }

}

function newSearchData() {
    return {searchText: null, categoryIdList: [],};
}

function newDicEnumCategoryDTO() {
    let dicEnumCategoryDTO = {dicEnumID: null, guid: null, dicEnumName: null, transName: null};
    return dicEnumCategoryDTO;
}

function newMangaInfoDTO() {
    let mangaInfoDTO = {
        guid: null,
        mangaName: null,
        transName: null,
        wrapper: null,
        remark: null,
        isDeleted: null,
        isLiked: null,
        pageCount: null,
        categoryGuid: null,
        dicEnumCategoryDTO: newDicEnumCategoryDTO(),
        updateTime: null,
        createTime: null,
        creator: null,
        mangaDetailDTOList: []
    };
    return mangaInfoDTO;
}

function newMangaDetailDTO() {
    let mangaDetailDTO = {
        guid: null,
        id: null,
        picName: null,
        picPath: null,
        mainGuid: null,
    }
    return mangaDetailDTO;
}
