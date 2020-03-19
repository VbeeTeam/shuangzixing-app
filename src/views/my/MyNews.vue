<template>
	<div class="news">
		<div v-wechat-title='$route.meta.title'></div>
		
		<div class="section-news">
			<ul v-if="newsObj">
				<li @click="toPage('/my-system')" v-if="newsObj.system.content != null">
					<img src="../../assets/img/icon-系统通知@3x.png" alt="">
					<div class="newsStatus" v-if="newsObj.system.read"></div>
					<div class="li-right">
						<h3>系统通知<span>{{newsObj.system.publishTime | formatDate}}</span></h3>
						<p>{{newsObj.system.content}}</p>
					</div>
				</li>
				<li @click="toPage('/my-personal')" v-if="newsObj.personal.content != null">
					<img src="../../assets/img/icon-个人消息@3x.png" alt="">
					<div class="newsStatus" v-if="newsObj.personal.read"></div>
					<div class="li-right">
						<h3>个人消息<span>{{newsObj.personal.publishTime | formatDate}}</span></h3>
						<p>{{newsObj.personal.content}}</p>
					</div>
				</li>
			</ul>
			
		</div>
	</div>
</template>

<script>
	import { getreDotNews } from '@/api/api'
	import { formatDate } from '@/assets/js/formDate'
	
	export default {
		name: "my-news",
		data() {
			return {
				newsObj:null,
				logins:null
			}
		},
		methods: {
			
			toPage(url){
				this.$router.push({path:url})
			},
			//我的消息红点状态
			getreDotNews(){
				getreDotNews('/api/messageRecord/redDot/part/' + this.logins.userId,{}).then(res => {
					this.newsObj = res
					
				})
			},
			
		},
		filters: {
			formatDate,
		},
		created() {
			this.logins = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')) :
				null;
			this.getreDotNews()
		}
		
	}
</script>

<style lang="scss" scoped>
	.news {
		padding: 0.6rem 0;
		background: #F6F6F6;
		.section-news{
			ul{
				li{
					display: -webkit-flex;
					padding: 1.12rem 0.75rem;
					box-sizing: border-box;
					background-color: #fff;
					border-bottom: 1px solid #F2F2F2;
					position: relative;
					img{
						width: 2.75rem;
						height: 2.75rem;
					}
					.newsStatus{
						width: 7px;
						height: 7px;
						background-color: #FF631D;
						border-radius: 100%;
						position: absolute;
						left:3.8rem;
						top:1.2rem;
					}
					.li-right{
						flex: 1;
						margin-left: 0.75rem;
						h3{
							font-size:1.06rem;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:rgba(0,0,0,1);
							line-height:1.5rem;
							display: -webkit-flex;
							justify-content: space-between;
							span{
								font-size:0.88rem;
								font-family:PingFangSC-Regular,PingFang SC;
								font-weight:400;
								color:#656565;
								line-height:1.25rem;
							}
						}
						p{
							width: 18.4rem;
							font-size:0.88rem;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:#656565;
							line-height:1.25rem;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
	}
</style>
