<template>
	<div class="search">
		<div v-wechat-title='$route.meta.title'></div>
		<div class="select-tabbar">
			<van-tabs v-model="activeName" color="#1DA5FE" 
			line-width="40px" line-height="5px" title-inactive-color="#989898" 
			@click="changeTab()">
				<van-tab title="文章">
					<div class="search-content">
						<div>
							<img src="../../assets/img/icon_search@3x.png" alt="">
							<input placeholder="搜索你想要的文章、产品、问答" v-model="key" />
						</div>
						<van-button type="info" size="small" round @click="search()">搜索</van-button>
					</div>

					<ul class="ul-article" v-if="list.length > 0">
						<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="listLoad">
							<li v-for="(item,index) in list" :key="index" @click="openArticle(item)">
								<div class="content-left">
									<p>{{item.title}}</p>
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
				
				<van-tab title="问答">
					<div class="search-content">
						<div>
							<img src="../../assets/img/icon_search@3x.png" alt="">
							<input placeholder="搜索你想要的文章、产品、问答" v-model="key" />
						</div>
						<van-button type="info" size="small" round @click="search()">搜索</van-button>
					</div>

					<van-collapse v-model="activeName2" accordion v-if="list.length > 0">
						<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="listLoad">
							<van-collapse-item v-for="(item,index1) in list" :key="index1" :title="item.questions" :name="item.questions">
								{{item.answers}}
							</van-collapse-item>
						</van-list>

					</van-collapse>
					
				</van-tab>

				<van-tab title="产品">
					<div class="search-content">
						<div>
							<img src="../../assets/img/icon_search@3x.png" alt="">
							<input placeholder="搜索你想要的文章、产品、问答" v-model="key" />
						</div>
						<van-button type="info" size="small" round @click="search()">搜索</van-button>
					</div>

					<ul class="list" v-if="list.length > 0 && activeName == 2">
						<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="listLoad">
							<li v-for="(item,index) in list" :key="index">
								<div class="listTop" :style="{backgroundImage: 'url('+ item.coverUrl +')',backgroundSize:'cover'}">
									<h3>{{item.name}}</h3>
									<p>{{item.intro}}</p>
									<p v-if="item.baseFee == null"><span>￥0 </span>元起</p>
									<p v-else><span>￥{{item.baseFee}}</span>元起</p>
								</div>
								<div class="listBot">
									<p></p>
									<div class="btn">
										<button v-if="item.articleList[0].coverUrl"><a :href="item.articleList[0].coverUrl"><span>测评文章</span></a></button>
										<button v-else style="border: none;"></button>
										<button @click="toDetail(item.id)">查看详情</button>
									</div>
								</div>
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
		searchApi
	} from "@/api/api"
	export default {
		name: "search",
		data() {
			return {
				// typeList: ["文章", "问答", "课程", "产品"],
				activeName: "",
				activeName2: "",
				key: "",
				list: [],
				page:0,
				size:10,
				loading: false,
				finished: false,
				lastLength : null
			}
		},
		methods: {

			//搜索
			search() {
				this.list = []
				this.page = 0
				this.finished = false
				this.lastLength = null
				
				this.searchApi()
				
			},
			//搜索接口
			searchApi(){
				var obj = {
					keyword: this.key,
					type: this.activeName + 1,
					page:this.page,
					size:this.size
				}
				searchApi(obj).then((res) => {
				
					if (this.page == 0 && res.length == 0) {
						this.$toast("无搜索结果")
					}else{
						const oldList =  this.list
						if(res.length > 0){
							this.list = oldList.concat(res)
							this.list.forEach((item) => {
								if (JSON.parse(item.articleList).length > 0) {
									item.articleList = JSON.parse(item.articleList)
								}
							})
						}
						this.lastLength = res.length
						
					}
					
				
				})
			},
			//上拉加载
			listLoad() {
			
				// 异步更新数据
				setTimeout(() => {
					this.loading = false
					// 数据全部加载完成
					if (this.lastLength == 0) {
		
						this.finished = true;
		
					} else {
						if(this.lastLength > 0){
							this.page = this.page + 1;
							this.searchApi()
						}
						
					}
				}, 500);
			},
			//切换搜索类型
			changeTab(){
				this.key = ""
				this.list = []
				this.page = 0
				this.finished = false
				this.lastLength = null
			},
			//打开文章
			openArticle(a) {

				if (a.wechatArticleUrl != null) {
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
			//跳转产品详情
			toDetail(id){
			
				this.$router.push({path:"/selectDetail",query:{id:id}})
			},
			
			
		},
		created() {
			this.activeName = this.$route.query.type == 1 ? 1 : 0
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		padding: 0.75rem;
		box-sizing: border-box;
		background-color: #f7f7f7;
		.select-tabbar {

			/deep/.van-tabs {

				.van-tabs__wrap {
					padding: 0 2rem;
					height: 35px;
					box-sizing: border-box;
				}

				.van-hairline--top-bottom {
					background-color: #f7f7f7 !important;
					padding-bottom: 0 !important;
				}

				.van-hairline--top-bottom::after {
					border-width: 0;
				}

				.van-tabs__nav {
					justify-content: space-between;
					background: #f7f7f7;

					.van-tab {
						flex: inherit;
						height: 2rem;
						line-height: 2rem;
						padding: 0 0.5rem;
					}

					.van-tab--active {
						font-weight: bold;
					}

				}

				.van-tabs__line {

					border-radius: 0 !important;
				}
				
			}
		}

		.search-content {
			display: -webkit-flex;
			align-items: center;
			justify-content: space-between;
			margin: 1.25rem 0;

			div {
				flex: 1;
				display: -webkit-flex;
				align-items: center;
				padding: 0.1rem 0.4rem;
				border-radius: 25px;
				box-sizing: border-box;
				background-color: #fff;
				margin-right: 0.75rem;

				img {
					width: 1.88rem;
					height: 1.88rem;
				}

				input {
					flex: 1;
					font-size: 1rem;
					font-family: PingFangSC-Regular, PingFang SC;
					color: #000;
					margin-left: 0.2rem;
					border: 0;
					background-color: transparent;
					outline: none;
					
				}

				input::-webkit-input-placeholder {
					color: #BFBFBF;
					font-size: 1rem;
				}
			}
			
			.van-button{
				line-height: 31px;
			}
		}

		.ul-article {

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
								font-family: DIN-Medium, DIN;
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

		.list {
			margin-top: 1.25rem;

			li {
				background: rgba(255, 255, 255, 1);
				box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.1);
				border-radius: 0.38rem;
				margin-bottom: 1.25rem;

				.listTop {
					height: 6.25rem;
					border-top-left-radius: 5px;
					border-top-right-radius: 5px;
					padding: 0.75rem;
					box-sizing: border-box;

					h3 {
						font-size: 1.06rem;
						font-family: PingFang-SC-Bold, PingFang-SC;
						font-weight: bold;
						color: rgba(0, 0, 0, 1);
						line-height: 1.5rem;
					}

					p {
						font-size: 0.75rem;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: rgba(0, 0, 0, 1);
						line-height: 1.06rem;
						margin: 0.5rem 0;

						&:nth-of-type(2) {
							color: #000;

							span {
								font-size: 0.9rem;
								font-family: DIN-Medium, DIN;
								font-weight: 500;
								color: rgba(252, 86, 86, 1);
								line-height: 1.19rem;
							}
						}
					}
				}

				.listBot {
					display: -webkit-flex;
					justify-content: space-between;
					align-items: center;
					padding: 0.75rem;

					p {
						font-size: 0.75rem;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: rgba(0, 0, 0, 1);
						line-height: 1.06rem;

						span {
							color: rgba(254, 160, 58, 1);
						}
					}

					.btn {
						button {
							font-size: 0.7rem;
							color: rgba(29, 165, 254, 1);
							padding: 0.38rem 0.75rem;
							margin-left: 1rem;
							border: 1px solid rgba(29, 165, 254, 1);
							border-radius: 25px;
							background-color: #FFFFFF;

							a {
								color: rgba(29, 165, 254, 1);
							}

							&:nth-child(2) {
								background: linear-gradient(135deg, rgba(0, 214, 251, 1) 0%, rgba(29, 165, 254, 1) 100%);
								color: #FFFFFF;
								border: none;
							}
						}
					}
				}


			}
		}

	}
</style>
