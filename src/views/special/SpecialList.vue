<template>
	<div class="specialList">
		<div v-wechat-title='$route.meta.title'></div>
		<div class="specialList-top">
			<div class="top-title">
				<img src="../../assets/img/icon_文章列表@3x.png" alt="">
				<h3>{{detail.title}}</h3>
			</div>
			<h5>{{detail.subtitle}}</h5>
			<span>共{{detail.articleList.length}}篇文章</span>
		</div>

		<div class="specialList-section" v-if="detail.articleList.length > 0">
			<ul>
				<li v-for="item in detail.articleList" :key="item.id" @click="openArticle(item)">
					<div class="content-left">
						<p>{{item.title}}</p>
						<p style="color:#838D99;font-weight: normal;">
						<span style="margin-right: 0.5rem;" v-for="item2 in item.tag" :key="item2">{{item2}}</span>
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
			</ul>
		</div>
	</div>
</template>

<script>
	import {
		apiSpecialList
	} from '@/api/api'; // 导入我们的api接口
	
	export default {
		name: "specialList",
		data() {
			return {
				detail:{}
			}
		},
		methods: {
			onload(){
				if(this.$route.query.idArr){
					apiSpecialList("/api/specialTopic/app/list/" + this.$route.query.idArr).then((res)=>{
						
						this.detail = res
						this.detail.articleList.forEach((item)=>{
							item.tag = item.tag.split(";")
						})
						
					})
				}
			
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
	.specialList {
		.specialList-top {
			background: #fff;
			padding: 0.5rem 0.75rem 0;

			.top-title {
				display: -webkit-flex;

				img {
					width: 2.75rem;
					height:2.75rem;
				}

				h3 {
					padding-top: 0.63rem;
					padding-left: 0.2rem;
					font-size: 1.06rem;
					font-family: PingFang-SC-Bold, PingFang-SC;
					font-weight: bold;
					color: rgba(24, 24, 24, 1);
				}
			}

			h5 {
				font-size: 0.88rem;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: 500;
				color: rgba(24, 24, 24, 1);
				line-height: 1.25rem;
				padding: 0.2rem;
			}

			span {
				display: inline-block;
				font-size: 0.75rem;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: 500;
				color: #A3A3A3;
				line-height: 1.06rem;
				padding: 0.2rem 0.2rem 0.8rem;
			}
		}

		.specialList-section {
			margin: 1.25rem 0;
			padding: 0 0.75rem;

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
		}

	}
</style>
