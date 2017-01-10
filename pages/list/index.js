//index.js
//获取应用实例
const app = getApp();
Page({
    data: {
        post_list: [],
        category: '',
    },

    onLoad: function (options) {
        console.log('onLoad');
        console.log(options);

        // TODO 删除
        const categoryId = options.category_id || 28;

        wx.request({
            url: 'https://api.1.fpm.babytree.com/api/mobile_toolcms/can_eat_list',
            data: {
                'text_format': 'json',
                'cat_id': categoryId,
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            success: (res) => {
                if (res.data && res.data.data && res.data.data.post_list && res.data.data.title) {
                    this.setData({
                        post_list: res.data.data.post_list,
                        category: res.data.data.title,
                    });
                    console.log(res.data.data.post_list);
                }
            },
        });
    },
});
