//index.js
//获取应用实例
const app = getApp();
Page({
    data: {
        post_info: {},
    },

    onLoad: function (options) {
        console.log('onLoad');
        console.log(options);

        // TODO 删除
        const titleId = options.title_id || 528;

        wx.request({
            url: 'https://api.1.fpm.babytree.com/api/mobile_toolcms/can_eat_detail',
            data: {
                'text_format': 'json',
                'id': titleId,
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            success: (res) => {
                if (res.data && res.data.data && res.data.data.post_info) {
                    this.setData({
                        post_info: res.data.data.post_info,
                    });
                    console.log(res.data.data.post_info);
                }
            },
        });
    },
});
