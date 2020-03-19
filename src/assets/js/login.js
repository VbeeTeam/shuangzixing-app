import router from "@/router/index"
import md5 from 'js-md5'
import obj from "@/api/constans"
import {
	apiGetuserInfo
} from "@/api/api"

const appId = obj.appId
const redirect_uri = encodeURIComponent(obj.redirect_uri) //回调地址转码
//获取code	
const wxUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=xcdb#wechat_redirect`

var code = GetUrlParame('code') //截取code

var trunk = md5(obj.trunk) //md5 加密

router.beforeEach((to, from, next) => {
	
	if(to.name == "home"){
		var logins = JSON.parse(sessionStorage.getItem('userInfo'));
		if (logins) {
			next()
		} else {
			if (code) {
				// alert(code)
				//获取用户信息
				login(next)
			} else {
				if(appId == ""){
					sessionStorage.setItem('userInfo', 
					JSON.stringify({
						userId:"1237581292938334208",
						phone:"15596281520",
						unionId:"oHYaCxFHXCwoHARW4mENuHuZnAEU"
						}));
					next()
				}else{
					//获取code
					window.location.href = wxUrl
				}
			}
		}
	}else{
		next()
	}
	
})

//获取用户信息
const login = (next) => {
	apiGetuserInfo({
		code: code,
		trunk: trunk
	}).then((res) => {
		sessionStorage.setItem('userInfo', JSON.stringify(res));
		next()
	})
}

// 截取code
function GetUrlParame(parameName) {
	/// 获取地址栏指定参数的值
	/// <param name="parameName">参数名</param>
	// 获取url中跟在问号后面的部分
	var parames = window.location.search
	// 检测参数是否存在
	if (parames.indexOf(parameName) > -1) {
		var parameValue = ''
		parameValue = parames.substring(parames.indexOf(parameName), parames.length)
		// 检测后面是否还有参数
		if (parameValue.indexOf('&') > -1) {
			// 去除后面多余的参数, 得到最终 parameName=parameValue 形式的值
			parameValue = parameValue.substring(0, parameValue.indexOf('&'))
			// 去掉参数名, 得到最终纯值字符串
			parameValue = parameValue.replace(parameName + '=', '')
			return parameValue
		}
		return ''
	}
}
