<template>
	<div class="content">
		<div v-wechat-title='$route.meta.title'></div>
		<div v-if="toast == null" class="article" ref="articleHeight" id="articleId">
			<div class="header">
				<h3>{{title}}</h3>
				<p><span>{{user}}</span><i>{{time | formatDate}}</i></p>
			</div>
			<!-- <div class="cover">
				<img :src="cover_url" alt="">
			</div> -->
			<div class="section" v-html="contentArticle"></div>
		</div>
		<div v-else style="text-align: center;padding: 3rem 0;color: #ccc;">
			{{toast}}
		</div>

	</div>

</template>
<script>
	import {
		apiArticle
	} from '@/api/api';
	import {
		articleReadRecord
	} from '@/api/api';
	export default {
		name: 'contentArticle',
		data() {
			return {
				contentArticle: "",
				articleId: "",
				title: "",
				time: null,
				user: null,
				cover_url: "",
				toast: null,
				addBoolean:false,
				equipment:{
					width:0,
					height:0,
					screen:0,
					num:0
				},
				totalTime: null,
				whileTime: null,
				timeArray: [
					{
						time:0,
						screen:1
					}
				],
				readTime: 0,
				scrollTime: 0,
				oldScrollTop: 0, //记录上一次滚动结束后的滚动距离
				scrollTop: 0, // 记录当前的滚动距离
				logins: null,
			}

		},
		methods: {
			// 获取数据
			onLoad() {
				// 调用api接口，并且提供了两个参数                
				apiArticle('/api/article/show/' + this.articleId, {}).then(res => {

					if (res.status == 101) {
						this.$toast(res.message)
						this.toast = res.message
					} else {
						this.title = res.title
						this.time = res.publishTime
						this.user = res.author
						this.cover_url = res.coverUrl
						this.contentArticle = res.formatContent
						//阅读总时长,第一屏阅读时长
						this.totalTime = setInterval(() => {
							this.readTime++
						}, 1000)
						this.whileTime = setInterval(() => {
							this.scrollTime++
						}, 1000)
					}

				})
			},
			//获取设备信息
			getEquipment(){
				//屏幕宽
				this.equipment.width = $(window).width()
				//屏幕高
				this.equipment.height = $(window).height()
				//共几屏
				this.equipment.screen = Number(($(".content").outerHeight(true) / $(window).height()).toFixed(1))
				
			},
			
			//新增文章浏览记录接口
			addRecord() {
				//取出阅读最长时间的屏
				var time = Math.max.apply(Math,this.timeArray.map(item => { return item.time }))
				var str = "" 
				this.timeArray.forEach((item)=>{
					if(item.time == time){
						str = str + item.screen + ' '
					}
				})
				
				//阅读重点位置
				var key = "width:" + this.equipment.width + ";height:" + this.equipment.height + ";screen:" + str
				articleReadRecord({
					"articleId": this.articleId,
					"articleTitle": this.title,
					"readKey": key,
					"readTimeLength": this.readTime,
					"type": 0,
					"userId": this.logins.userId,
					"unionId": this.logins.unionId
				}).then(res => {
					// console.log(res)
				})
			}
		},
		watch: {
			scrollTop(newValue, oldValue) {
				setTimeout(() => {
					if (newValue == window.scrollY) { //延时执行后当newValue等于window.scrollY，代表滚动结束
						// console.log('滚动结束',newValue);
						//在第几屏
						this.equipment.num = Number((newValue / this.equipment.height).toFixed(1)) + 1
						
						//清除前一屏定时器
						clearInterval(this.whileTime)
						//每次滚动结束后都要给oldScrollTop赋值
						this.oldScrollTop = newValue; 
						
						//保存数据
						this.timeArray.push({
							time: this.scrollTime,
							screen: this.equipment.num
						})
						
						//重新计时
						this.scrollTime = 0
						this.whileTime = setInterval(() => {
							this.scrollTime++
						}, 1000)
					}
				}, 20); //必须使用延时器，否则每次newValue和window.scrollY都相等，无法判断，20ms刚好大于watch的侦听周期，故延时20ms
				if (this.oldScrollTop == oldValue) { //每次滚动开始时oldScrollTop与oldValue相等
					// console.log('滚动开始');
				}
			},
			scrollTime(value){
				setTimeout(()=>{
					this.timeArray[this.timeArray.length - 1].time = value
				},30)
				if(this.equipment.num == this.equipment.screen && value > 30){
					clearInterval(this.whileTime)
					this.addRecord()
					this.addBoolean = true
				}
			}
		},
		filters: {
			formatDate: function(value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;

				return y + '-' + MM + '-' + d;
			}
		},
		created() {
			this.articleId = this.$route.query.id
			this.onLoad()
			this.logins = JSON.parse(sessionStorage.getItem('userInfo')) ?
				JSON.parse(sessionStorage.getItem('userInfo')) : null;
		},
		mounted() {
			//监听滚动
			window.addEventListener('scroll', () => {
				this.scrollTop = window.scrollY;
			})
			//获取设备信息
			setTimeout(() => {
				this.getEquipment()
			}, 500)
		},
		beforeDestroy() {
			//清除定时器
			clearInterval(this.totalTime)
			clearInterval(this.whileTime)
			//删除监听滚动
			window.removeEventListener("scroll", ()=>{})
			//上传阅读数据
			if(!this.addBoolean){
				this.addRecord()
			}
		}
	}
</script>
<style scoped lang="scss">
	.content {
		background: #fff;
		height: 100%;
		box-sizing: border-box;

		/deep/li {
			list-style: disc;
		}

		.article {
			padding-top: 1rem;

			.header {
				padding: 0 1rem;
				background: #fff;
				box-sizing: border-box;

				h3 {
					font-size: 1.4rem;
					color: #333;
					font-weight: 400;
					font-family: PingFang-SC-Medium;
				}

				p {
					margin-top: 0.9rem;
					font-family: PingFang-SC-Medium;
					font-size: 0.9rem;
					color: rgba(0, 0, 0, 0.3);

					span {
						margin-right: 0.6rem;

						// &:nth-child(2) {
						// 	color: #576b95;
						// }
					}

				}

				margin-bottom: 1.2rem;
			}

			.cover {
				margin: 1rem 0 2rem;

				img {
					width: 100%;
					height: 10rem;
				}
			}

			.section {
				padding: 0 1rem 3rem;
				background: #fff;
				box-sizing: border-box;
			}
		}

	}
</style>
