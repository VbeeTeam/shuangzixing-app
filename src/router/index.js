import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'home',
		meta: { title: "首页" },
		component: Home
	},
	{
		path: '/classroom',
		name: 'classroom',
		meta: { title: "精选课堂"},
		component: () => import('../views/classroom/Classroom.vue')
	},
	{
		path: '/selected',
		name: 'selected',
		meta: { title: "产品精选" },
		component: () => import('../views/product/ProductSelected.vue'),
	},
	{
		path: '/my',
		name: 'my',
		meta: { title: "我的" },
		component: () => import('../views/my/My.vue')
	},
	{
		path: '/content',
		name: 'contentArticle',
		component: () => import('../views/article/Content.vue')
	},
	{
		path: '/programme',
		name: 'programme',
		meta: { title: "马上定制" },
		component: () => import('../views/programme/Programme.vue')
	},
	{
		path: '/programmeEntrance',
		name: 'programmeEntrance',
		meta: { title: "定制入口" },
		component: () => import('../views/programme/ProgrammeEntrance.vue')
	},
	{
		path: '/programmeList',
		name: 'programmeList',
		meta: { title: "保障方案" },
		component: () => import('../views/programme/ProgrammeList.vue')
	},
	{
		path: '/programmeDetail',
		name: 'programmeDetail',
		meta: { title: "方案详情" },
		component: () => import('../views/programme/ProgrammeDetail.vue')
	},
	{
		path: '/selectDetail',
		name: 'selectDetail',
		meta: { title: "产品详情" },
		component: () => import('../views/product/ProductDetail.vue')
	},
	{
		path: '/insuranceAnswers',
		name: 'insuranceAnswers',
		meta: { title: "常见问题" },
		component: () => import('../views/insuranceanswers/InsuranceAnswers.vue')
	},
	{
		path: '/search',
		name: 'search',
		meta: { title: "保险百科" },
		component: () => import('../views/classroom/ClassroomSearch.vue')
	},
	{
		path: '/special',
		name: 'special',
		meta: { title: "专业测评" },
		component: () => import('../views/special/Special.vue')
	},
	{
		path: '/specialList',
		name: 'specialList',
		meta: { title: "专业测评" },
		component: () => import('../views/special/SpecialList.vue')
	},
	{
		path: '/insurancepolicy',
		name: 'policy',
		meta: { title: "我的保单"},
		component: () => import('../views/insurancepolicy/InsurancePolicy.vue')
	},
	{
		path: '/insurancedetail',
		name: 'detail',
		meta: { title: "保单详情"},
		component: () => import('../views/insurancepolicy/InsuranceDetail.vue')
	},
	{
		path: '/insuranceadd',
		name: 'insuranceadd',
		meta: { title: "添加保单"},
		component: () => import('../views/insurancepolicy/InsuranceAdd.vue')
	},
	{
		path: '/insuranceSearch',
		name: 'insuranceSearch',
		meta: { title: "搜索产品"},
		component: () => import('../views/insurancepolicy/InsuranceSearch.vue')
	},
	{
		path: '/my-information',
		name: 'my-information',
		meta: { title: "常用信息" },
		component: () => import('../views/my/MyInformation.vue')
	},
	{
		path: '/my-phone',
		name: 'my-pnone',
		meta: { title: "绑定手机号"},
		component: () => import('../views/my/MyPhone.vue')
	},
	{
		path: '/my-mailbox',
		name: 'my-mailbox',
		meta: { title: "绑定手机号"},
		component: () => import('../views/my/MyMailbox.vue')
	},
	{
		path: '/my-feedback',
		name: 'my-feedback',
		meta: { title: "意见反馈"},
		component: () => import('../views/my/MyFeedback.vue')
	},
	{
		path: '/my-news',
		name: 'my-news',
		meta: { title: "消息"},
		component: () => import('../views/my/MyNews.vue')
	},
	{
		path: '/my-system',
		name: 'my-system',
		meta: { title: "系统通知"},
		component: () => import('../views/my/MySystem.vue')
	},
	{
		path: '/my-personal',
		name: 'my-personal',
		meta: { title: "个人消息"},
		component: () => import('../views/my/MyPersonal.vue')
	},
	
]

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior() {
		return {
			x: 0,
			y: 0
		}
	}
})

export default router
