<template>
	<div class="home">
		<div v-wechat-title='$route.meta.title'></div>
		<div class="home-top">
			<div class="top-search">
				<div class="search" @click="toSearch()">
					<img src="../assets/img/icon_search@3x.png" />
					<span>大家都在搜：医疗险</span>
				</div>
			</div>
			<ul class="top-nav">
				<li>
					<router-link to="/programmeEntrance">
						<img src="../assets/img/icon_方案定制@3x.png" alt="">
						<span>方案定制</span>
					</router-link>
				</li>
				<li>
					<router-link to="/selected">
						<img src="../assets/img/icon_产品精选@3x.png" alt="">
						<span>产品精选</span>
					</router-link>
				</li>
				<li>
					<router-link to="/insurancepolicy">
						<img src="../assets/img/保单管理.png" alt="">
						<span>保单管理</span>
					</router-link>
				</li>
				<li>
					<router-link to="/insuranceAnswers">
						<img src="../assets/img/icon_常见问题@3x.png" alt="">
						<span>常见问题</span>
					</router-link>
				</li>
			</ul>

		</div>

		<div class="home-section">
			<!-- 专业测评 -->
			<div class="section-top">
				<div>
					<img src="../assets/img/pic_topic@3x.png" alt="">
					<h4 v-if="module.length > 0">{{module[0].name}}</h4>
				</div>
				<div class="btn">
					<button @click="toSpecial(module[0].id)">更多</button>
					<img src="../assets/img/icon_arrowright@3x.png" alt="">
				</div>
			</div>
			<div class="section-productImg">
				<div class="productImg-left" :style="{background:'url('+ item.picture +') center top',backgroundSize:'cover'}" v-for="(item,index1) in specialList" :key="index1" @click="toSpecialList(item)">
					<h3>{{item.title}}</h3>
					<h5>{{item.subtitle}}</h5>
					<div>
						<img src="../assets/img/icon_eye@3x(1).png" alt="">
						<span>{{item.visits}}</span>
					</div>
				</div>
				
			</div>

			<!-- 保险攻略 -->
			<div class="section-top">
				<div>
					<img src="../assets/img/pic_topic@3x.png" alt="">
					<h4 v-if="module.length > 0">{{module[1].name}}</h4>
				</div>
				<div class="btn">
					<button @click="toSpecial(module[1].id)">更多</button>
					<img src="../assets/img/icon_arrowright@3x.png" alt="">
				</div>
			</div>

			<div class="section-list" v-for="(item1,index3) in lists" :key="index3" :style="{background:'url('+item1.underPicture+') center top',backgroundSize:'cover'}">
				<div class="list-top">
					<h2>{{item1.title}}</h2>
					<h5>{{item1.subtitle}}</h5>
				</div>
				<div class="list-content" v-if="item1.articleList.length > 0">
					<ul>
						<li v-for="item in item1.articleList" :key="item.id" @click="openArticle(item)">
							<div class="content-left">
								<p>{{item.title}}</p>
								<p style="color:#838D99;font-weight: normal;">
								<span style="margin-right: 0.5rem;" v-for="item2 in item.tag" :key="item2">{{item2}}</span>
								</p>
								<div class="left-number">
									<div>
										<img src="../assets/img/icon_comments@3x.png" alt="">
										<span>0</span>
									</div>
									<div>
										<img src="../assets/img/icon_eye@3x.png" alt="">
										<span>{{item.visits}}</span>
									</div>
								</div>
							</div>
							<img class="content-right" :src="item.coverUrl" alt="">

						</li>
					</ul>
					<div class="list-all" @click="toSpecialList(item1)">
						<span>查看更多</span>
						<img src="../assets/img/icon_arrowright-white@3x.png" alt="">
					</div>
				</div>

			</div>
			
		</div>

	</div>
</template>

<script>
	import {
		apiModule
	} from '@/api/api'; // 导入我们的api接口
	
	import {
		apiSpecialTopic
	} from '@/api/api'; 
	import {
		getMadePersonWechatQr
	} from '@/api/api';
	import {
		getMyNews
	} from '@/api/api';
	
	export default {
		name: 'home',
		components: {

		},
		data() {
			return {
				logins:null,
				lists: [],
				totalElements: 0,
				specialList: [],
				module: [],
				page: 0,
				size: 3
			}
		},
		methods: {
			// 获取数据
			onLoad() {
				if(this.logins){
					getMadePersonWechatQr("/api/customer/getMadePersonWechatQr/" + this.logins.userId).then(res => {
						
						this.$store.commit("mutationsChangeCustomer",res)
						
					})
				}
				
				// 调用api接口              
				apiModule('/api/tModule/1', {}).then(res => {

					this.module = res
					this.getSpecialTopic1(res[0].id)
					this.getSpecialTopic2(res[1].id)
				})

			},
			getSpecialTopic1(id){
				//专业测评专题
				apiSpecialTopic('/api/specialTopic/app/' + id, {}).then(res => {
				
					this.specialList = res.splice(0, 2)
				
				})
			},
			getSpecialTopic2(id){
				//六大指南专题
				apiSpecialTopic('/api/specialTopic/app/article/' + id, {}).then(res => {
					
					this.lists = res
					this.lists.forEach((item)=>{
						item.articleList.forEach((item2)=>{
							item2.tag = item2.tag.split(";")
						})
					})
				})
			},
			//我的消息红点状态
			getNews(){
				getMyNews('/api/messageRecord/redDot/' + this.logins.userId,{}).then(res => {
					this.$store.commit('mutationsChangeMyNews', res);
				})
			},
			//跳转搜索
			toSearch(){
				this.$router.push({path:'/search'})
			},
			//跳转专题列表
			toSpecial(id){
				this.$router.push({
					path: '/special',
					query: {
						id:id
					}
				})
			},
			
			//跳转专题文章列表
			toSpecialList(a) {
				this.$router.push({
					path: '/specialList',
					query: {
						idArr: a.id
					}
				})
			},
			
			//打开文章
			openArticle(a) {

				if (a.wechatArticleUrl != "") {
					window.open(a.wechatArticleUrl)
				} else {
					this.$router.push({
						path: '/content',
						query: {
							id: a.id
						}
					});
				}
			},
		},
		
		created() {
			this.logins = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')) :
				null;
			this.getNews()
		},
		mounted() {
			this.onLoad();
		}
		
	}
</script>

<style scoped lang="scss">
	.home {
		padding-bottom: 3rem;
		background: #f7f7f7;

		/** 顶部搜索 **/
		.home-top {
			.top-search {
				height: 10.6rem;
				background: url(../assets/img/banner@3x.png) center top;
				background-size: cover;
				padding-top: 1rem;
				box-sizing: border-box;

				.search {
					width: 90%;
					margin: 0 auto;
					padding: 0.1rem 0.4rem;
					border-radius: 25px;
					box-sizing: border-box;
					background-color: #fff;
					display: -webkit-flex;
					-webkit-align-items: center;
					
					img {
						width: 1.88rem;
						height: 1.88rem;
					}

					span {
						flex: 1;
						font-size: 0.88rem;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(191, 191, 191, 1);
						margin-left: 0.2rem;
						padding-top: 0.1rem;
					}
				}
			}

			.top-nav {
				display: -webkit-flex;
				justify-content: space-around;
				padding: 1rem;
				box-sizing: border-box;
				text-align: center;

				li {
					img {
						width: 3rem;
						height: 3rem;
					}

					span {
						display: block;
						font-size: 0.75rem;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						line-height: 1.06rem;
					}
				}
			}

			.top-swiper {
				margin-top: 0.1rem;
			}
		}

		/** 主体内容 **/
		.home-section {
			.section-top {
				display: -webkit-flex;
				justify-content: space-between;
				padding: 0.63rem 0.75rem;

				div {
					display: -webkit-flex;
					-webkit-align-items: center;

					img {
						width: 0.5rem;
						height: 0.88rem;
						margin-right: 0.5rem;
					}

					h4 {
						font-size: 1.13rem;
						font-family: PingFang-SC-Bold, PingFang-SC;
						font-weight: bold;
						color: rgba(0, 0, 0, 1);
						
					}
				}

				.btn {
					display: -webkit-flex;
					align-items: center;

					button {
						font-size: 0.88rem;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: #7B7B7B;
						border: 0;
						background-color: #f7f7f7;

						a {
							color: #7B7B7B;
						}
					}

					img {
						width: 1.25rem;
						height: 1.25rem;

						margin: 0;
					}
				}

			}

			.section-productImg {
				display: -webkit-flex;
				justify-content: space-between;
				padding: 0.63rem 0.75rem;
				box-sizing: border-box;

				.productImg-left {
					position: relative;
					flex: 1;
					height: 6.25rem;
					background-size: cover;
					padding: 0.75rem 0.25rem;
					box-sizing: border-box;
					border-radius: 5px;
					&:first-of-type {
						margin-right: 0.7rem;
					}

					h3 {
						font-size: 0.88rem;
						font-family: PingFang-SC-Bold, PingFang-SC;
						font-weight: bold;
						color: rgba(255, 255, 255, 1);
						line-height: 1.25rem;
						text-shadow: 0px 0px 0px rgba(202, 112, 13, 1);
						margin-bottom: 0.25rem;
					}

					h5 {
						font-size: 0.63rem;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
						line-height: 0.88rem;
					}

					div {
						position: absolute;
						right: 0.5rem;
						bottom: 0.25rem;
						display: -webkit-flex;
						justify-content: flex-end;
						-webkit-align-items: center;

						img {
							width: 1.3rem;
							margin-right: 0.2rem;
						}

						span {
							
							font-size: 0.75rem;
							font-family: 'DIN-Medium';
							font-weight: 500;
							color: rgba(255, 255, 255, 1);
							line-height: 0.94rem;
							text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.8);
						}
					}
				}

			}


			.section-list {
				width: 94%;
				margin: 0rem auto;
				border-radius: 5px;
				margin-bottom: 1rem;
				.list-content {
					// background-color: #91CEFF;
					padding: 0.63rem 0.75rem;
					box-sizing: border-box;

					ul {
						padding: 0.6rem;
						background-color: #fff;
						border-radius: 5px;
						box-sizing: border-box;

						li {
							display: -webkit-flex;
							justify-content: space-between;
							padding: 0.6rem 0;
							border-bottom: 1px solid #f6f6f6;

							&:last-of-type {
								border: 0;
							}

							.content-left {
								flex: 1;
								display: -webkit-flex;
								flex-direction: column;

								p {
									flex: 1;
									font-size: 0.75rem;
									font-family: PingFang-SC-Bold, PingFang-SC;
									font-weight: bold;
									color: rgba(51, 51, 51, 1);
									line-height: 1.06rem;
								}

								.left-number {
									display: -webkit-flex;
									justify-content: flex-end;
									-webkit-align-items: center;

									div {
										display: -webkit-flex;
										-webkit-align-items: center;
										margin-right: 1rem;

										img {
											width: 1.2rem;
											height: 1.2rem;
											margin-right: 0.3rem;
										}

										span {
											
											font-size: 0.75rem;
											font-family: 'DIN-Medium';
											font-weight: 500;
											color: #999999;
											line-height: 0.94rem;
										}
									}
								}
							}

							.content-right {
								width: 5.63rem;
								height: 4.38rem;
							}

						}
					}

					.list-all {
						margin-top: 0.7rem;
						display: -webkit-flex;
						justify-content: center;

						span {
							font-size: 0.88rem;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
							color: rgba(255, 255, 255, 1);
							line-height: 1.25rem;
						}

						img {
							width: 1.25rem;
							height: 1.25rem;
							vertical-align: middle;
						}
					}

				}

			}

			.list-top {
				height: 5.5rem;
				padding: 0.63rem 0.75rem;
				box-sizing: border-box;

				h2 {
					font-size: 1.25rem;
					font-family: PingFang-SC-Bold, PingFang-SC;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
					line-height: 1.75rem;
				}

				h5 {
					margin-top: 0.3rem;
					font-size: 0.8rem;
					font-family: PingFang-SC-Medium, PingFang-SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					line-height: 1.06rem;
				}
			}

			// .section-bottom {
			// 	padding: 0.63rem 0.75rem;
			// 	background: url("");

			// 	div {
			// 		border-radius: 5px;
			// 		height: 5.5rem;
			// 		padding: 0.63rem 0.75rem;
			// 		box-sizing: border-box;
			// 		background: url("../assets/img/入门攻略顶部图-2@3x.png") center top;
			// 		background-size: cover;
			// 	}

			// }

		}



	}
</style>
