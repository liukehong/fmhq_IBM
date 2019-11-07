export default {
    data: function () {
        return {
            userInfo: '',
            colFlag: 2147483647,
            mealInfo: '',
        }
    },
    methods: {
        // 接口获取用户信息
        fnGetNewInfo () {
            let vm = this;
            return new Promise (resolve=>{
                vm.$api.IBM_UTILS_INFO().then(res=>{
                    if(res.code == 0){
                        return resolve(res.data);
                    }else{
                        return resolve()
                    }
                })
            })
        },
        // 查询用户钱包信息
        fnGetUserAssets () {
            let vm = this;
            return new Promise (resolve=>{
                vm.$api.ASSETS_GETUSERASSETS().then(res=>{
                    resolve(res);
                })
            })
        }
    }
};