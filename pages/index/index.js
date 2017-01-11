//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        searchShowed: false,
        searchPlaceholder: '请输入食物名称，例如“西洋参”',
        searchValue: "",
        categorys: [],
    },

    onLoad: function () {
        console.log('onLoad');
        console.log(app);

        wx.request({
            url: 'https://api.babytree.com/api/mobile_toolcms/can_eat',
            data: {
                'text_format': 'json',
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            success: (res) => {
                if (res.data && res.data.data && res.data.data.categorys) {
                    this.setData({
                        categorys: res.data.data.categorys,
                    });
                    console.log(res.data.data.categorys);
                }
            },
        });
    },

    showSearch: function () {
        this.setData({
            searchShowed: true
        });
    },

    hideSearch: function () {
        this.setData({
            searchValue: "",
            searchShowed: false
        });
    },

    clearSearch: function () {
        this.setData({
            searchValue: ""
        });
    },

    searchTyping: function (e) {
        this.setData({
            searchValue: e.detail.value
        });
    },

    search: function (e) {
        if (!this.data.searchValue) {
            wx.showModal({
                title: '提示',
                content: this.data.searchPlaceholder,
                confirmText: '重新输入',
                cancelText: '取消搜索',
                success: (result) => {
                    console.log(result);
                    if (result.confirm) {
                        this.showSearch();
                    } else {
                        this.hideSearch();
                    }
                },
            });
            return;
        }

        wx.navigateTo({
            url: '/pages/search/index?keyword=' + encodeURIComponent(this.data.searchValue),
        });
    },

    onShareAppMessage: function () {
        console.log('onShareAppMessage');

        let currentPages = getCurrentPages();
        console.log(currentPages);

        let currentPage = currentPages[currentPages.length - 1];

        console.log(currentPage);

		return {
      		title: '自定义分享标题',
      		desc: '自定义分享描述',
      		path: '/page/user?id=123'
    	};
    },
});
