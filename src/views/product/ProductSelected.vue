<template>
	<div class="selected">
		<div v-wechat-title='$route.meta.title'></div>
		<div class="select-top" @click="show = true">
			<img src="../../assets/img/头部广告备份@3x.png" alt="">
			<img src="../../assets/img/btn_立即咨询@3x.png" alt="">
		</div>

		<div class="select-tabbar">
			<van-tabs v-model="activeName" background="#f7f7f7" line-width="0px" title-active-color="#fff" title-inactive-color="#989898"
			type="line" @click="onClick">
				<van-tab v-for="(item,i) in typeList" :key="i" :title="item" :name="item">
					<ul class="list">
						<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="listLoad">
							<li v-for="(item,index) in listData" :key="index">
								<div class="listTop" :style="{backgroundImage: 'url('+ item.coverUrl +')',backgroundSize:'cover'}">
									<h3>{{item.name}}</h3>
									<p>{{item.intro}}</p>
									<p v-if="item.lowPrice == null"><span>￥0 </span>元起</p>
									<p v-else><span>￥{{item.lowPrice}}</span>元起</p>
								</div>
								<div class="listBot">
									<!-- <p>已售<span>{{item.number}}</span>份</p> -->
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
		<!-- 二维码 -->
		<van-popup v-model="show">
			<div class="weImage">
				<h2>长按二维码，对话私人顾问</h2>
				<img :src="$store.state.customer.wechatQr" alt="">
			</div>
		</van-popup>
	</div>
</template>
<script>
	import {
		productType
	} from '@/api/api';
	import {
		listByTypeClient
	} from '@/api/api';

	export default {
		name: 'selected',
		components: {

		},
		data() {

			return {
				activeName: "重疾",
				typeList: [],
				listData: [],
				page: 0,
				size: 10,
				show: false,
				loading: false,
				finished: false,
				totalElements:null,
			}

		},
		methods: {

			onload() {

				productType({}).then(res => {

					this.typeList = res

				})

				this.getList()

			},
			//列表
			getList() {
				var obj = {
					page: this.page,
					size: this.size,
					type: this.activeName
				}
				listByTypeClient(obj).then(res => {
					if(res.totalElements == 0){
						this.loading = false
						this.finished = true
					}else{
						const oldList = this.listData
						
						this.listData = oldList.concat(res.content)
						this.listData.forEach((item) => {
							if (JSON.parse(item.articleList).length > 0) {
								item.articleList = JSON.parse(item.articleList)
							}
						})
					}
					this.totalElements = res.totalElements
				})
			},
			//切换
			onClick() {
				this.page = 0
				this.listData = []
				this.finished = false
				this.getList()
			},
			//上拉加载
			listLoad() {

				// 异步更新数据
				setTimeout(() => {
					this.loading = false
					// 数据全部加载完成
					if (this.listData.length >= this.totalElements) {

						this.finished = true;

					} else {
						if(this.totalElements > 0){
							this.page = this.page + 1;
							this.getList()
						}
						
					}
				}, 500);
		},
		
		//跳转详情
		toDetail(id) {

			this.$router.push({
				path: "/selectDetail",
				query: {
					id: id
				}
			})
		}

	},
	created() {
		this.onload()
	}
	}
</script>
<style scoped lang="scss">
	.selected {
		background-color: #f7f7f7;
		padding: 0.5rem 0.75rem 3rem;
		box-sizing: border-box;

		.select-top {
			position: relative;
			margin: 1.25rem auto;

			img:nth-of-type(2) {
				position: absolute;
				top: 0.7rem;
				right: 0.8rem;
				width: 3.5rem;
				height: 3.5rem;
			}
		}

		.select-tabbar {
			/deep/.van-tabs {

				.van-tab {
					border-radius: 25px;
					background-color: #EEEEEE;
					margin-right: 1rem;
					height: 1.88rem;
					line-height: 2rem;
					font-size: 0.75rem;
				}

				.van-hairline--top-bottom::after {
					border-width: 0;
				}

				.van-tab--active {
					background-color: #1DA5FE;
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
							color: #838D99;
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
								box-sizing: border-box;

								a {
									color: rgba(29, 165, 254, 1);
								}

								&:nth-child(2) {
									background: linear-gradient(135deg, rgba(0, 214, 251, 1) 0%, rgba(29, 165, 254, 1) 100%);
									color: #FFFFFF;
									border: none;
									padding: 0.44rem 0.75rem;
								}
							}
						}
					}


				}
			}
		}

		.van-popup {
			border-radius: 5px;

			.weImage {
				width: 16.4rem;
				height: 18.7rem;
				background: url(../../assets/img/二维码卡片@3x.png) center top;
				background-size: cover;
				text-align: center;
				position: relative;

				h2 {
					font-size: 1.06rem;
					font-family: PingFang-SC-Bold, PingFang-SC;
					font-weight: bold;
					color: rgba(24, 24, 24, 1);
					line-height: 1.5rem;
					padding-top: 2.5rem;
				}

				img {
					position: absolute;
					left: 50%;
					top: 59%;
					transform: translate(-50%, -50%);
					width: 9rem;
					height: 9rem;
				}
			}
		}

		.van-popup--center {
			top: 65%;
		}

		/deep/.van-overlay {
			opacity: 0.6;
		}
	}
</style>
