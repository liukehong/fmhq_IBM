// 二次封装axios、拦截器等
import axios from 'axios' // 注意先安装哦
import config from './config.js' // 倒入默认配置
import ElementUI from 'element-ui'
import router from '../router'
import comData from '@/utils/data.js'



// 设置请求头，登陆成功会把信息保存在本地
export default function $axios (options) {
	// 判断登录类型
	function fnLoginType () {
		let name = router.currentRoute.matched[0].name;
		return name;	
	}
    return new Promise((resolve, reject) => {
		let baseURL = !!options.baseURL?options.baseURL:config.baseURL;
        const instance = axios.create({
            baseURL: baseURL,
            transformRequest: [function (data) {
				// 将数据转换为表单数据
				let ret = ''
				for (let it in data) {
				  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}]
        }
    )
    // request 拦截器
    instance.interceptors.request.use(
        config => {
			// Tip: 1
			// 请求开始的时候可以结合 vuex 开启全屏的 loading 动画

			// Tip: 2 
			// 带上 token , 可以结合 vuex 或者重 localStorage
			if(fnLoginType() == 'admin'){
				// 管理员
				// 用户
				if(window.localStorage.getItem('admin_token')){
					config.headers['TOKEN'] = JSON.parse(window.localStorage.getItem('admin_token'));
				}
			}else{
				// 用户
				if(window.localStorage.getItem(comData.tokenName)){
					config.headers['TOKEN'] = JSON.parse(window.localStorage.getItem(comData.tokenName));
				}
			}
			// Tip: 3
			// 根据请求方法，序列化传来的参数，根据后端需求是否序列化
			/* if (config.method.toLocaleLowerCase() === 'post' 
				|| config.method.toLocaleLowerCase() === 'put' 
				|| config.method.toLocaleLowerCase() === 'delete') {

				// config.data = qs.stringify(config.data)
			} */
			if(config.method.toLocaleLowerCase() === 'post' ){
				config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			}
          	return config
        },
        error => {
			// 请求错误时做些事(接口错误、超时等)
			// Tip: 4
			// 关闭loadding
			console.log('request:', error) 
			//  1.判断请求超时
			if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
				// return service.request(originalRequest);//例如再重复请求一次
			}
			//  2.需要重定向到错误页面
			const errorInfo = error.response
			console.log(errorInfo)
			if (errorInfo) {
				// error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
				const errorStatus = errorInfo.status; // 404 403 500 ... 等
				router.push({
					path: `/error/${errorStatus}`
				})
			}
			return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
        }
    )
    // response 拦截器
    instance.interceptors.response.use(
        response => {
			let data;
			// IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
			if(response.data == undefined){
				data = response.request.responseText
			} else{
				data = response.data
			}

			// 根据返回的code值来做不同的处理（和后端约定）
			switch (data.code) {
				case 200:
				// ElementUI.Message.error(data.msg);
				let url = fnLoginType() == 'admin'?'/admin_login':'/login'
				router.push({
					path: `${url}`
				})
				break;
				default:
			}
			// 若不是正确的返回code，且已经登录，就抛出错误
			// const err = new Error(data.description)

			// err.data = data
			// err.response = response

			// throw err
          	// return JSON.parse(data)
          	return data
        },
        err => {
			if (err && err.response) {
				switch (err.response.status) {
					case 400:
					// err.message = '请求错误'
					// token失效
					// ElementUI.Message.error('token失效，重新登录');
					// 判断登录类型
					let url = fnLoginType() == 'admin'?'/admin_login':'/login'
					// 路由跳转
					router.push({
						path: `${url}`
					})
					break
			
					case 401:
					err.message = '未授权，请登录'
					break
			
					case 403:
					err.message = '拒绝访问'
					break
			
					case 404:
					err.message = `请求地址出错: ${err.response.config.url}`
					break
			
					case 408:
					err.message = '请求超时'
					break
			
					case 500:
					err.message = '服务器内部错误'
					break
			
					case 501:
					err.message = '服务未实现'
					break
			
					case 502:
					err.message = '网关错误'
					break
			
					case 503:
					err.message = '服务不可用'
					break
			
					case 504:
					err.message = '网关超时'
					break
			
					case 505:
					err.message = 'HTTP版本不受支持'
					break

					case 1002:
					err.message = '删除失败'
					break
					case 1002:
					err.message = '删除失败'
					break
			
					default:
				}
			}
            // 此处我使用的是 element UI 的提示组件
			// Message.error(`ERROR: ${err}`);
			// ElementUI.Message.error(`ERROR: ${err.message}`);
			return Promise.reject(err) // 返回接口返回的错误信息
        }
    )
    //请求处理
    instance(options)
        .then((res) => {
			resolve(res)
			return false
        })
        .catch((error) => {
            reject(error)
        })
    })
}
