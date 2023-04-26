const LOGO_PATH = "/img/Logo.png";

const parentList = [{"id": "1-1", "href": "", "target": "_parent", "parentId": "0", "name": "Admin"}, {"id": "1-2", "href": "", "target": "_parent", "parentId": "0", "name": "Upload"}, {"id": "1-3", "href": "", "target": "_parent", "parentId": "0", "name": "PicRead"}, {"id": "1-4", "href": "", "target": "_parent", "parentId": "0", "name": "Test"}, {"id": "1-5", "href": "", "target": "_parent", "parentId": "0", "name": "getArtist"}];
const childList = [{"id": "1-1-1", "href": "/web/admin/Admin-Tag.html", "target": "_parent", "parentId": "1-1", "name": "Tag"}, {"id": "1-1-2", "href": "/web/admin/Admin-Manga.html", "target": "_parent", "parentId": "1-1", "name": "Manga"}, {"id": "1-1-3", "href": "/web/admin/Admin-MangaImport.html", "target": "_parent", "parentId": "1-1", "name": "Import"}, {"id": "1-1-4", "href": "", "target": "_parent", "parentId": "1-1", "name": "1-1-4"}, {"id": "1-1-5", "href": "", "target": "_parent", "parentId": "1-1", "name": "1-1-5"}, {"id": "1-1-6", "href": "", "target": "_parent", "parentId": "1-1", "name": "1-1-6"}, {"id": "1-4-1", "href": "/web/test.html", "target": "_parent", "parentId": "1-4", "name": "test"}];

// 缓存常用元素
const sel_$NavigationBar = "#navigation-bar";
const sel_$ulParent = "#ul-parent";
const sel_$ulChild = "#ul-child";

let $NavigationBar = $(sel_$NavigationBar);
let $ulParent = $(sel_$ulParent);
let $ulChild = $(sel_$ulChild);


// 父菜单的 HTML 模板
const parentMenuTemplate = (parent) => `
    <li data-id="${parent.id}" class="li-parent">
        <span class="span-parent">${parent.name}</span>
        <ul class="ul-child"></ul>
    </li>`;

// 子菜单的 HTML 模板
const childMenuTemplate = (child) => `
    <li data-id="${child.id}" class="li-child">
        <a href="${child.href}"><span class="span-child">${child.name}</span></a>
    </li>`;

$(document).ready(function () {
    // addNavigation
    $("body").prepend('<nav id="navigation-bar"></nav>');

    $NavigationBar = $(sel_$NavigationBar);

    // addMenu
    $NavigationBar.append(`<ul id="ul-parent"></ul><ul id="ul-child"></ul>`);

    $ulParent = $(sel_$ulParent);
    $ulChild = $(sel_$ulChild);
    $ulChild.hide();

    // initParentMenu();
    $ulParent.prepend(`<li class="li-logo"><a href="/"><img src="${LOGO_PATH}" alt="Logo"></a></li>`);
    const parentMenuHtml = parentList.map(parentMenuTemplate).join('');
    $ulParent.append(parentMenuHtml);

    // 事件处理函数
    bindEvents();
});


// 初始化子菜单
function initChildMenu(parentId) {
    const childMenuHtml = childList
        .filter(child => child.parentId === parentId)
        .map(childMenuTemplate)
        .join('');
    $ulChild.html(childMenuHtml);
}

// 绑定事件处理函数
function bindEvents() {
    // 父菜单鼠标移入移出
    $ulParent.on('mouseenter', '.li-parent', function () {
        const $this = $(this);
        const parentId = $this.attr('data-id');

        // 先清空子菜单
        $ulChild.empty();

        // 加载 childList 数据
        initChildMenu(parentId);

        // 选中父级菜单时，显示父菜单 hover 样式
        $this.addClass('hover');

        // 动画显示子菜单
        $ulChild.slideDown(300);

        // 调整子菜单显示位置
        const offTop = $this.offset().top + 48;
        const offLeft = $this.offset().left;
        $ulChild.css({top: offTop, left: offLeft});
    });

    // 父菜单鼠标移出
    $ulParent.on('mouseleave', '.li-parent', function () {
        // 移除父级菜单 hover 样式
        $(this).removeClass('hover');
        // 隐藏子菜单
        $ulChild.hide();
    });

    // 子菜单鼠标移入移出
    $ulChild.on('mouseenter', '.li-child', function () {
        // 选中子菜单时，父级菜单保持 hover 样式
        $ulParent.find(`[data-id=${$(this).parent().data('id')}]`).addClass('hover');
        $ulChild.show();
    });

    // 子菜单鼠标移出
    $ulChild.on('mouseleave', '.li-child', function () {
        // 移除父级菜单 hover 样式
        $ulParent.find(`[data-id=${$(this).parent().data('id')}]`).removeClass('hover');
        $ulChild.hide();
    });
}

