/**   
 * api接口统一管理
 */
import {
	get,
	post,
	deletes,
	put
} from './http'

// get
export const apiArticle = urlId => get(urlId, {}); //文章
export const apiTabs = p => get('/api/tTabs/show', p); //页签
export const apiModule = urlId => get(urlId, {}); //板块
export const apiCatagory = urlId => get(urlId, {}); //文章分类
export const apiSpecialTopic = urlId => get(urlId, {}); //专题
export const productDetail = urlId => get(urlId, {}); //方案详情
export const tQa = urlId => get(urlId, {}); //问答列表
export const getDiseaseSpecies = urlId => get(urlId, {}); //病种详情
export const getMadePersonWechatQr = urlId => get(urlId, {}); //客服
export const getMyNews = urlId => get(urlId, {}); //我的消息红点提示
export const getreDotNews = urlId => get(urlId, {}); //个人或系统消息红点提示
export const messageRecord = p => get('/api/messageRecord/appGet', p); //查询消息
export const insurancePolicy = urlId => get(urlId, {}); //查询保单列表
export const insurancePolicyDetail = urlId => get(urlId, {}); //查询保单详情

//post
export const apiSpecialList = urlId => post(urlId, {}); //专题列表

export const apiGetuserInfo = p => post('/api/auth/getUserInfo', p); //获取用户信息
export const productType = p => get('/api/insure/product/app/getInsureType', p); //产品类型
export const listByTypeClient = p => get('/api/insure/product/listByTypeForClient', p); //产品类型列表
export const listByType = p => get('/api/insure/product/listByTypeClient', p); //产品公司类型列表
// export const companyList = p => get('/api/insure/company/appGet', p); //产品公司列表
export const searchList = p => get('/api/insure/product/appGet', p); //保单产品列表搜索
export const searchApi = p => get('/api/es', p); //产品列表搜索
export const apiArticleList = p => get('/api/article/show/list', p); //文章列表
export const generaList = p => get('/api/generalType/show', p); //职业、病史列表
export const planMain = urlId => get(urlId, {}); //方案查询
export const smsSend = p => post('/api/sms/send', p); //短信接口
export const sendMit = p => post('/api/customer/register', p); //提交问卷
export const feedbackAdd = p => post('/api/feedback/userAdd', p); //提交反馈
export const upLoader = p => post('/api/oss/resources?configId=1', p); //反馈上传图片
export const bindPhone = p => post('/api/customer/bindPhone', p); //绑定手机号
export const insurancePolicyAdd = p => post('/api/insurancePolicy/appAdd', p); //新增保单
export const addSendSmsDay = p => post('/api/insurancePolicy/addSendSmsDay', p); //保单提醒
export const articleReadRecord = p => post('/api/articleReadRecord',p); //新增文章浏览记录



// deletes
export const insurancePolicyDelete = p => deletes("/api/insurancePolicy", p); //删除保单

// put
export const insurancePolicyChange = p => put("/api/insurancePolicy/appEdit",p); //修改保单