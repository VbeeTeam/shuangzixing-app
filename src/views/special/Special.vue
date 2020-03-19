<template>
	<div class="special">
		<div v-wechat-title='$route.meta.title'></div>
		<div class="section-list" v-for="(item,index) in lists" :key="index" :style="{background:'url('+item.underPicture+') center top',backgroundSize:'cover'}">
			<div class="list-top">
				<h2>{{item.title}}</h2>
				<h5>{{item.subtitle}}</h5>
			</div>
			<div class="list-content" v-if="item.articleList.length > 0">
				<ul>
					<li v-for="item2 in item.articleList" :key="item2.id" @click="openArticle(item2)">
						<div class="content-left">
							<p>{{item2.title}}</p>
							<p style="color:#838D99;font-weight: normal;">
							<span style="margin-right: 0.5rem;" v-for="item2 in item2.tag" :key="item2">{{item2}}</span>
							</p>
							<div class="left-number">
								<div>
									<img src="../../assets/img/icon_comments@3x.png" alt="">
									<span>0</span>
								</div>
								<div>
									<img src="../../assets/img/icon_eye@3x.png" alt="">
									<span>{{item2.visits}}</span>
								</div>
							</div>
						</div>
						<img class="content-right" :src="item2.coverUrl" alt="">

					</li>
				</ul>
				<div class="list-all" @click="nextAll(item)">
					<span>查看更多</span>
					<img src="../../assets/img/icon_arrowright-white@3x.png" alt="">
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import {
		apiSpecialTopic
	} from '@/api/api'; // 导入我们的api接口
	export default {
		name: "",
		data() {
			return {
				lists: []
			}
		},
		methods: {
			
			//专题
			onload(){
				var sign = this.$route.query.id
				
				apiSpecialTopic('/api/specialTopic/app/article/' + sign, {}).then(res => {
					
					this.lists = res
					this.lists.forEach((item)=>{
						item.articleList.forEach((item2)=>{
							item2.tag = item2.tag.split(";")
						})
					})
				})
			},
			
			//跳转更多列表
			nextAll(a) {
				this.$router.push({
					path: '/specialList',
					query:{
						idArr:a.id
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
			this.onload()
		}
	}
</script>

<style lang="scss" scoped>
	.special {
		padding-top: 1rem;
		.section-list {
			
			width: 94%;
			margin: 0 auto 1rem;
			box-sizing: border-box;
			// background: url("../../assets/img/artcile-bg@3x.png") center top;
			background-size: cover;
			border-radius: 5px;
			.list-content {
				
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


	}
</style>
