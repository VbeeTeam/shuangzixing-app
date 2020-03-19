<template>
	<div class="my">
		<div v-wechat-title='$route.meta.title'></div>
		<div class="my-suer">
			<img v-if="logins != null" :src="logins.headPicture" alt="">
			<div v-if="logins != null" class="user-right">
				<h3>{{logins.nickName}}</h3>
				<span>普通用户</span>
			</div>
		</div>

		<ul class="my-nav">
			<li>
				<img src="../../assets/img/我的钱包-灰@3x.png" alt="">
				<span>我的钱包</span>
			</li>
			<li>
				<router-link to="/programmeList">
					<img src="../../assets/img/我的方案@3x.png" alt="">
					<span>我的方案</span>
				</router-link>

			</li>
			<li>
				<img src="../../assets/img/我的课程-灰@3x.png" alt="">
				<span>我的课程</span>
			</li>
			<li>
				<router-link to="/insurancepolicy">
					<img src="../../assets/img/我的保单.png" alt="">
					<span>我的保单</span>
				</router-link>
			</li>
		</ul>

		<div class="select-top" @click="show = true">
			<img src="../../assets/img/头部广告备份@3x.png" alt="">
			<img src="../../assets/img/btn_立即咨询@3x.png" alt="">
		</div>

		<ul class="my-list">
			<li v-for="(item,i) in myList" :key="i" @click="toPage(item.url)">
				<div>
					<img :src="item.imgUrl" alt="">
					<span>{{item.text}}</span>
				</div>
				<img src="../../assets/img/icon_left-black@3x.png" alt="">
				<div class="news" v-if="item.imgNews && $store.state.myNews"></div>
			</li>

		</ul>
		
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
	import { getMyNews } from "@/api/api"
	export default {
		name: 'my',
		components: {},
		data() {
			return {
				logins: null,
				myList: [{
						imgUrl: require("../../assets/img/理赔服务@3x.png"),
						text: "理赔服务"
					},
					{
						imgUrl: require("../../assets/img/常用信息@3x.png"),
						text: "常用信息",
						url:"/my-information"
					},
					{
						imgUrl: require("../../assets/img/我的消息@3x.png"),
						imgNews: require("../../assets/img/红点@3x.png"),
						text: "我的消息",
						url:"/my-news"
					},
					{
						imgUrl: require("../../assets/img/意见反馈@3x.png"),
						text: "意见反馈",
						url:"/my-feedback"
					}
				],
				show:false
			}

		},
		methods :{
			toPage(url){
				this.$router.push({path:url})
			},
			//我的消息红点状态
			getNews(){
				getMyNews('/api/messageRecord/redDot/' + this.logins.userId,{}).then(res => {
					this.$store.commit('mutationsChangeMyNews', res);
				})
			},
		},
		
		created() {
			this.logins = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')) : null;
			this.getNews()
		}

	}
</script>
<style scoped lang="scss">
	.my {
		padding-bottom: 4rem;

		.my-suer {
			height: 12rem;
			display: -webkit-flex;
			-webkit-align-items: end;
			padding: 2rem 0.75rem 0.2rem;
			background: url('../../assets/img/bg-mine@3x.png') center top;
			background-size: cover;
			box-sizing: border-box;

			img {
				width: 4.5rem;
				height: 4.5rem;
				border-radius: 50%;
				margin-right: 1rem;
			}

			h3 {
				text-align: center;
				font-size: 1.06rem;
				font-family: PingFang-SC-Bold, PingFang-SC;
				font-weight: bold;
				color: rgba(0, 0, 0, 1);
				line-height: 1.5rem;
				margin-bottom: 0.75rem;
				padding-top: 0.2rem;
			}

			span {
				display: inline-block;
				padding: 0.25rem 0.63rem;
				font-size: 0.63rem;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				background-color: #FEDB50;
				border-radius: 25px;
				box-sizing: border-box;
			}
		}


		.my-nav {
			width: 90%;
			display: -webkit-flex;
			justify-content: space-around;
			margin: -4rem auto 0;
			z-index: 2;
			padding: 1rem;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.2);
			border-radius: 0.5rem;
			opacity: 0.99;

			li {
				img {
					display: block;
					width: 3.13rem;
					height: 3.13rem;
					margin-bottom: 0.1rem;
				}

				span {
					font-size: 0.75rem;
					font-family: PingFang-SC-Medium, PingFang-SC;
					font-weight: 500;
					color: rgba(0, 0, 0, 1);
					line-height: 1.06rem;
				}
			}
		}

		.select-top {
			position: relative;
			width: 90%;
			margin: 1.25rem auto;

			img:nth-of-type(2) {
				position: absolute;
				top: 0.8rem;
				right: 0.8rem;
				width: 3.5rem;
				height: 3.5rem;
			}
		}

		.my-list {
			background-color: #fff;

			li {
				display: -webkit-flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #f6f6f6;
				padding: 0.5rem 0.75rem;
				position: relative;
				img {
					width: 2.75rem;
					height: 2.75rem;
				}
				.news{
					width: 7px;
					height: 7px;
					background-color: #FF631D;
					border-radius: 100%;
					position: absolute;
					right:1rem;
					top:1rem;
				}
				div {
					display: -webkit-flex;
					align-items: center;
					span {
						margin-left: 0.5rem;
						font-size: 0.88rem;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: rgba(0, 0, 0, 1);
						padding-top: 0.1rem;
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
