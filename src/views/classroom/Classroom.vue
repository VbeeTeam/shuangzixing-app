<template>
	<div class="classroom">
		<div v-wechat-title='$route.meta.title'></div>
		<div class="search" @click="toSearch()">
			<img src="../../assets/img/icon_search@3x.png" />
			<span>大家都在搜：医疗险</span>
		</div>

		<div class="classroom-entrance" @click="toAnswers()">
			<img src="../../assets/img/保险百科bg@3x.png" alt="">
			<div class="entrance-text">
				<h2>保险百科</h2>
				<h4>一看就懂的保险百科</h4>
			</div>
			<img src="../../assets/img/icon_rightround@3x.png" alt="">
		</div>

		<div class="classroom-entrance entranceTwo">
			<img src="../../assets/img/社保医保bg@3x.png" alt="">
			<div class="entrance-text">
				<h2>社保医保</h2>
				<h4>全国社保查询入口</h4>
			</div>
			<!-- <img src="../../assets/img/icon_rightround@3x.png" alt=""> -->
			<img src="" alt="">
		</div>

		<div class="classroom-guide">
			<div class="guide-top">
				<img src="../../assets/img/pic_topic@3x.png" alt="">
				<h4 v-if="module.length > 0">{{module[0].name}}</h4>
			</div>
			<div class="guide-section">
				<div class="guide" v-for="(item,index2) in specialList" :key="index2" @click="toSpecial(item)">
					<img :src="item.picture" alt="">
					<h3>{{item.title}}</h3>
					<p>{{item.subtitle}}</p>
				</div>
			</div>
		</div>

		<div class="classroom-tabbar">
			<van-tabs v-model="activeName" background="#f7f7f7" line-height="6px" color="#1DA5FE" @click="tabClick">
				<van-tab v-for="(item,i) in cataList" :key="i" :title="item.name" :name="item.id">
					<ul v-if="lists.length > 0">
						<van-list v-model="loading" :finished="finished"
						finished-text="没有更多了" @load="listLoad">
							<li v-for="(item,index3) in lists" :key="index3" @click="openArticle(item)">
								<div class="content-left">
									<p>{{item.title}}</p>
									<p style="color:#838D99;font-weight: normal;">
									<span style="margin-right: 0.5rem;" v-for="(item2,index4) in item.tag" :key="index4">{{item2}}</span>
									</p>
									<div class="left-number">
										<div>
											<img src="../../assets/img/icon_comments@3x.png" alt="">
											<span>0</span>
										</div>
										<div>
											<img src="../../assets/img/icon_eye@3x.png" alt="">
											<span>{{item.visits}}</span>
										</div>
									</div>
								</div>
								<img class="content-right" :src="item.coverUrl" alt="">

							</li>
						</van-list>
					</ul>
				</van-tab>

			</van-tabs>
		</div>


	</div>
</template>
<script>
	import {
		apiSpecialTopic
	} from '@/api/api';
	import {
		apiModule
	} from '@/api/api';
	import {
		apiArticleList
	} from '@/api/api';

	import {
		apiCatagory
	} from '@/api/api';

	export default {
		name: 'classroom',
		components: {

		},
		data() {
			return {
				cataList: [],
				lists: [],
				specialList: [],
				module: [],
				page: 0,
				size: 10,
				activeName: "",
				loading: false,
				finished: false,
				totalElements:null,
				cataId:null,
			}
		},

		methods: {
			//跳转问答
			toAnswers() {
				this.$router.push({
					path: '/insuranceAnswers'
				})
			},
			// 获取数据
			onLoad() {

				// 调用模块接口            
				apiModule('/api/tModule/2', {}).then(res => {
					this.module = res
					this.getSpecialTopic(res[0].id)
				})

				//文章分类接口
				apiCatagory('/api/category/1', {}).then(res => {
					this.cataList = res
					if (this.cataList.length > 0) {
						this.cataId = this.cataList[0].id
						this.articleList(); //文章列表
					}

				})



			},
			//专题
			getSpecialTopic(id){
				apiSpecialTopic('/api/specialTopic/app/' + id, {}).then(res => {

					this.specialList = res

				})
			},

			//跳转搜索
			toSearch() {

				this.$router.push({
					path: '/search'
				})
			},
			//跳转专题列表
			toSpecial(a) {
				this.$router.push({
					path: '/specialList',
					query: {
						idArr: a.id
					}
				})
			},
			//文章列表
			articleList() {
				// moduleId: this.module[1].id,
				apiArticleList({
					categoryId: this.cataId,
					page: this.page,
					size: this.size
				}).then(res => {
					if(res.totalElements){
						const oldList = this.lists
						
						this.lists = oldList.concat(res.content)
						
						this.lists.forEach((item)=>{
							item.tag = item.tag.split(";")
						})
						
						this.totalElements = res.totalElements
						
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
			//切换分类
			tabClick(title) {
				this.cataId = title
				this.lists = []
				this.page = 0
				this.finished = false
				this.articleList(title); //文章列表
			},
			//上拉加载
			listLoad() {
				
				// 异步更新数据
				setTimeout(() => {
					this.loading = false
					// 数据全部加载完成
					if (this.lists.length >= this.totalElements) {
						
						this.finished = true;
						
					}else{
						this.page = this.page + 1;
						this.articleList(this.cataId)
					}
				}, 500);
			}
		},
		created() {

			this.onLoad();

		}


	}
</script>
<style scoped lang="scss">
	.classroom {
		padding: 0.75rem 0rem 5rem;
		background: #f7f7f7;
		box-sizing: border-box;

		.search {
			width: 94%;
			margin: 0 auto;
			padding: 0.1rem 0.4rem;
			border-radius: 25px;
			box-sizing: border-box;
			background-color: #fff;
			display: -webkit-flex;
			align-items: center;

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

		.classroom-entrance {
			width: 94%;
			display: -webkit-flex;
			justify-content: space-between;
			align-items: center;
			background: linear-gradient(134deg, rgba(0, 214, 251, 1) 0%, rgba(29, 165, 254, 1) 100%, rgba(29, 165, 254, 1) 100%);
			box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.3);
			border-radius: 0.75rem;
			margin: 1.25rem auto;

			img:first-of-type {
				width: 7.31rem;
			}

			.entrance-text {
				h2 {
					font-size: 1.25rem;
					font-family: PingFang-SC-Bold, PingFang-SC;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
					line-height: 1.75rem;
					margin-bottom: 0.5rem;
				}

				h4 {
					font-size: 0.88rem;
					font-family: PingFang-SC-Medium, PingFang-SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					line-height: 1.25rem;
				}
			}

			img:last-of-type {
				width: 2rem;
				height: 2rem;
				margin-right: 0.75rem;
			}
		}

		.entranceTwo {

			// background: rgba(255, 255, 255, 1) linear-gradient(135deg, rgba(254, 219, 80, 1) 0%, rgba(254, 156, 56, 1) 100%);
			background: rgba(255, 255, 255, 1) linear-gradient(135deg, rgba(224, 224, 224, 1) 0%, rgba(193, 193, 193, 1) 100%);
		}

		.classroom-guide {
			width: 100%;
			padding-left: 0.75rem;
			margin: 0 auto;
			box-sizing: border-box;

			.guide-top {
				display: -webkit-flex;
				align-items: center;

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

			.guide-section {
				width: 100%;
				padding: 0.6rem 0 1.6rem;
				box-sizing: border-box;
				display: -webkit-box;
				flex-wrap: nowrap;
				overflow-x: scroll;

				&::-webkit-scrollbar {
					display: none
				}

				.guide {
					width: 6rem;
					margin-right: 0.6rem;
					text-align: center;
					padding: 0rem 0.2rem 0.3rem;
					box-sizing: border-box;
					background: linear-gradient(138deg, rgba(137, 169, 255, 1) 0%, rgba(115, 153, 255, 1) 100%);
					box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(119, 156, 255, 0.4);
					border-radius: 0.25rem;

					&:nth-of-type(2) {
						background: linear-gradient(135deg, rgba(255, 181, 146, 1) 0%, rgba(255, 131, 124, 1) 100%);
						box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(255, 159, 136, 0.4);
					}

					&:nth-of-type(3) {
						background: linear-gradient(135deg, rgba(254, 219, 80, 1) 0%, rgba(254, 150, 54, 1) 100%);
						box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(254, 161, 58, 0.4);
					}

					&:nth-of-type(4) {
						background: linear-gradient(135deg, rgba(0, 214, 251, 1) 0%, rgba(29, 165, 254, 1) 100%);
						box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(24, 173, 253, 0.4);
					}

					img {
						width: 3rem;
						height: 3rem;
					}

					h3 {
						font-size: 0.88rem;
						font-family: PingFang-SC-Bold, PingFang-SC;
						font-weight: bold;
						color: rgba(255, 255, 255, 1);
						line-height: 1.25rem;
						text-shadow: 0px 0px 0px rgba(72, 119, 245, 1);
						margin: 0.1rem 0 0.25rem;
					}

					p {
						padding-left: 0.1rem;
						text-align: left;
						font-size: 0.6rem;
						font-weight: normal;
						color: rgba(255, 255, 255, 1);
						line-height: 0.88rem;
					}
				}
			}


		}

		.classroom-tabbar {
			width: 94%;
			margin: 0 auto;

			/deep/.van-tabs {
				.van-tab--active {
					font-size: 1rem;
					font-weight: bold;
				}

				.van-hairline--top-bottom::after {
					border-width: 0;
				}

				.van-tabs__line {
					border-radius: 0 !important;
				}

			}

			ul {
				padding: 0.6rem;
				background-color: #fff;
				border-radius: 5px;
				margin-top: 0.5rem;

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
						}

						.left-number {
							display: -webkit-flex;
							justify-content: flex-end;
							align-items: center;

							div {
								display: -webkit-flex;
								align-items: center;
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
		}
	}
</style>
