let baseUrl = ""; 
let VUE_APP_TITLE = process.env.VUE_APP_TITLE;
let appId = "";
let redirect_uri = "";
let trunk = ""
switch (VUE_APP_TITLE) {
    case 'test':   // 注意这里的名字要和步骤二中设置的环境名字对应起来
        baseUrl = "http://app.shuangzixinggame.com:8089/eladmin-system-2.4" //这里是测试环境中的url
        appId = "wx566580e84850c4ac"
        redirect_uri = "http://app.shuangzixinggame.com"
        trunk = "测试号"
        break;
    case 'prod':
        baseUrl = "http://app.xingchixinxi.com:8089/eladmin-system-2.4"   //生产环境url
        appId = "wxcdbe6f3cbabcd64a"
        redirect_uri = "http://app.xingchixinxi.com"
        trunk = "知星保"
        break;
    default:
        baseUrl = "http://192.168.199.43:8000"  //这里是本地的请求url
        appId = ""
        redirect_uri = ""
        trunk = ""
}
// http://192.168.199.43:8000
export default {
    baseUrl,
    appId,
    redirect_uri,
    trunk
}