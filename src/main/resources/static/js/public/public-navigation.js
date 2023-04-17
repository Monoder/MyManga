
let LOGO_PATH = "/img/Logo.png";

let parentList = [ {
    "id": "1-1",
    "href": "",
    "method": "",
    "target": "_parent",
    "parentId": "0",
    "name": "Admin"
}, {
    "id": "1-2",
    "href": "",
    "method": "",
    "target": "_parent",
    "parentId": "0",
    "name": "Upload"
}, {
    "id": "1-3",
    "href": "",
    "method": "",
    "target": "_parent",
    "parentId": "0",
    "name": "PicRead"
}, {
    "id": "1-4",
    "href": "",
    "method": "",
    "target": "_parent",
    "parentId": "0",
    "name": "Test"
}, {
    "id": "1-5",
    "href": "",
    "method": "",
    "target": "_parent",
    "parentId": "0",
    "name": "getArtist"
} ];
let childList = [ {
    "id": "1-1-1",
    "href": "/web/admin/Admin-Tag.html",
    "method": "",
    "target": "_parent",
    "parentId": "1-1",
    "name": "Tag"
}, {
    "id": "1-1-2",
    "href": "/web/admin/Admin-Manga.html",
    "method": "",
    "target": "_parent",
    "parentId": "1-1",
    "name": "Manga"
}, {
    "id": "1-1-3",
    "href": "",
    "method": "",
    "target": "_parent",
    "parentId": "1-1",
    "name": "1-1-3"
}, {
    "id": "1-1-4",
    "href": "",
    "method": "",
    "target": "_parent",
    "parentId": "1-1",
    "name": "1-1-4"
}, {
    "id": "1-1-5",
    "href": "",
    "method": "",
    "target": "_parent",
    "parentId": "1-1",
    "name": "1-1-5"
}, {
    "id": "1-1-6",
    "href": "",
    "method": "",
    "target": "_parent",
    "parentId": "1-1",
    "name": "1-1-6"
}, {
    "id": "1-4-1",
    "href": "/web/test.html",
    "method": "",
    "target": "_parent",
    "parentId": "1-4",
    "name": "test"
} ];


let ul_parent = null;
let ul_parent_hover = null;
let ul_parent_hover_css = { "border-radius": "5px 5px 0 0", "font-size": "23px", "color": "rgba(255, 255, 255, 1)", "background-color": "rgba(0, 0, 0, 0.2)" };

let ul_child = null;
let li_child = null;
let li_child_hover = null;
let li_child_hover_css = { "border-radius": "5px 5px 0 0", "font-size": "22px", "color": "rgba(0, 0, 0, 0.8)", "background-color": "rgba(0, 0, 0, 0.2)" };

window.addEventListener( "load", function () {
    addNavigation();
    addMenu();

    ul_parent = $( "#ul-parent" );
    ul_parent_hover = null;
    initParentMenu( ul_parent );

    ul_child = $( "#ul-child" );
    ul_child.hide();



    // 父级菜单鼠标移入移出
    $( ".li-parent" ).hover( function () {
        // 先清空子菜单
        ul_child.empty();

        // 加载 childList 数据
        for ( let i = 0; i < childList.length; i++ ) {
            if ( $( this ).attr( "data-id" ) === childList[ i ].parentId ) {
                ul_child.append( $(
                    "                <li data-id=\"" + childList[ i ].id + "\"  class=\"li-child\">\n" +
                    "                    <a href=\"" + childList[ i ].href + "\"><span class=\"span-child\">" + childList[ i ].name + "</span></a>\n" +
                    "                </li>"
                ) )
            }
        }

        // 选中父级菜单时，显示父菜单 hover 样式
        ul_parent_hover = $( this );
        ul_parent_hover.css( ul_parent_hover_css );
        // 动画显示子菜单
        ul_child.slideDown( 500 );

        // 调整子菜单显示位置
        let offTop = -200;
        let offLeft = 0;
        offLeft = ul_parent_hover.offset().left;
        offTop = ul_parent_hover.offset().top + 48;
        ul_child.css( { "top": offTop + "px", "left": offLeft + "px" } );

    }, function () {
        // 移除父级菜单 hover 样式
        ul_parent_hover.removeAttr( "style" );
        ul_child.hide();
    } )

    // 选中子菜单时，保持显示
    ul_child.hover( function () {
        // 选中子菜单时，父级菜单保持 hover 样式
        ul_parent_hover.css( ul_parent_hover_css );
        ul_child.show();
    }, function () {
        ul_parent_hover.removeAttr( "style" );
        ul_child.hide();
    } )



} )

function addNavigation() {
    $( "body" ).prepend(
        $( "<div/>" ).attr( "id", "NavigationBar" )
    );
}

function addMenu() {
    $( "#NavigationBar" ).append(
        $( "<ul/>" ).attr( "id", "ul-parent" )
    ).append(
        $( "<ul/>" ).attr( "id", "ul-child" )
    )
}

// 加载json数据的到父级菜单
function initParentMenu( ul_parent ) {
    ul_parent.prepend(
        "<li class=\"li-logo\"><a href=\"/\"><img src=\"" + LOGO_PATH + "\" alt=\"Logo\"></a></li>"
    )
    for ( let i = 0; i < parentList.length; i++ ) {
        ul_parent.append( $(
            "        <li data-id=\"" + parentList[ i ].id + "\" class=\"li-parent\">\n" +
            "            <span class=\"span-parent\">" + parentList[ i ].name + "</span>\n" +
            "            <ul class=\"ul-child\">\n" +
            "                <li class=\"li-child\">\n" +
            "                </li>\n" +
            "            </ul>\n" +
            "        </li>" ) )
    }
}