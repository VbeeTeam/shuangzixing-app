<template>
	<div class="programmeDetail">
		<div v-wechat-title='detail.name'></div>
		<div class="programmeDetail-top">
			<h3>{{detail.name}}</h3>
		</div>

		<div class="programmeDetail-information">
			<div class="programmeDetail-section">
				<div class="information-top">
					<img src="../../assets/img/pic_topic@3x.png" alt="">
					<h4>基本信息</h4>
				</div>
				<div class="information">
					<div>
						<span>年缴保费</span>
						<b :style="{color:programme.color}">￥{{programme.yearPremium}}</b>
					</div>
					<div v-for="(item,index1) in programme.productSKU" :key="index1">
						<span>{{item.itemName}}</span>
						<b :style="{color:programme.color}">{{item.attrsModule}}</b>
					</div>
				
				</div>

			</div>

			<div class="label">
				<span>{{detail.company.name}}</span>
				<span>{{detail.type}}</span>
			</div>

		</div>

		<div class="guarantee-detail">

			<ul>
				<div class="information-top">
					<img src="../../assets/img/pic_topic@3x.png" alt="">
					<h4>保障详情</h4>
				</div>
				<li v-for="(item,i) in detail.insureProductItems" :key=i>
					<div class="litop">
						<img src="../../assets/img/icon_detal@3x.png" alt="">
						<h4>{{item.itemName}}</h4>
					</div>
					<div class="lisection">
						<!-- <div>
							<span>赔付次数</span>
							<span>是否分组</span>
						</div> -->
						<b>{{item.content}}</b>
					</div>
				</li>
				
			</ul>
		</div>


		<div class="guarantee-detail">

			<ul>
				<div class="information-top">
					<img src="../../assets/img/pic_topic@3x.png" alt="">
					<h4>其它信息</h4>
				</div>
				<li>
					<div class="litop">
						<img src="../../assets/img/n@3x.png" alt="">
						<h4>等待期</h4>
					</div>
					<div class="lisection">

						<b>{{detail.waitingPeriod}}</b>
					</div>
				</li>

			</ul>
		</div>

		<div class="adviser" @click="show = true">
			<img src="../../assets/img/icon_客服@3x.png" alt="">
			<div>
				<span>专属顾问</span>
				<span v-if="$store.state.customer.name">{{$store.state.customer.name}}</span>
				<span v-else>{{erName}}</span>
			</div>
		</div>
		
		<!-- 二维码 -->
		<van-popup v-model="show">
			<div class="weImage">
				<h2>长按二维码，对话私人顾问</h2>
				<img :src="erImg" alt="">
			</div>
		</van-popup>
	</div>
</template>

<script>
	import {
		productDetail
	} from '@/api/api';
	import {
		getMadePersonWechatQr
	} from '@/api/api';
	export default {
		name: "programmeDetail",
		data() {
			return {
				programme:{},
				detail:{},
				show:false,
				erImg: "",
				erName:""
			}
		},
		methods: {
			onload() {
				
				productDetail("/api/insure/product/app/" + this.programme.product.id,{}).then(res => {
					
					this.detail = res
				})
				
				//顾问
				
				if (!this.$store.state.customer.name) {
					
					getMadePersonWechatQr("/api/customer/getMadePersonWechatQr/" + this.$route.query.userId).then(res => {
						this.erImg = res.wechatQr
						this.erName = res.name
					})
				} else {
					this.erImg = this.$store.state.customer.wechatQr
				}
				
			}

		},
		created() {
			this.programme = JSON.parse(localStorage.getItem('programme'))
			this.onload()
			
		}
	}
</script>

<style lang="scss" scoped>
	.programmeDetail {
		background-color: #f7f7f7;
		padding-bottom: 2rem;

		.programmeDetail-top {
			height: 10rem;
			padding: 0.75rem;
			box-sizing: border-box;
			background: url("../../assets/img/bg-product@3x.png") center top;
			background-size: cover;

			h3 {
				font-size: 1.06rem;
				font-family: PingFang-SC-Bold, PingFang-SC;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				line-height: 1.5rem;
			}
		}

		.programmeDetail-information {
			position: relative;
			padding: 0 0.75rem;
			margin-top: -6rem;
			box-sizing: border-box;

			.programmeDetail-section {

				padding: 0rem 0.75rem;
				box-sizing: border-box;
				background-color: #fff;
				border-radius: 10px;
				box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.2);
			}


			.information {

				padding: 0.75rem 1.9rem;
				display: -webkit-flex;
				flex-wrap: wrap;
				text-align: center;
				box-sizing: border-box;

				div {
					width: 45%;
					padding: 0.5rem 0;
					margin: 0 5% 0.75rem 0;
					background-color: #f6f6f6;
					box-sizing: border-box;
					border-radius: 5px;

					span {
						display: block;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size: 0.75rem;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: #A1A1A1;
						line-height: 1.06rem;
						margin-bottom: 0.5rem;
					}

					b {
						font-size: 1rem;
						font-family: PingFang-SC-Bold, PingFang-SC;
						font-weight: bold;
						color: rgba(29, 165, 254, 1);
						line-height: 1.38rem;
					}
				}

			}

			.label {
				position: absolute;
				right: 1.5rem;
				top: -1rem;

				span {
					display: inline-block;
					padding: 0.4rem 0.8rem;
					color: #fff;
					background-color: #1DA5FE;
					margin-left: 0.75rem;
					font-size: 0.88rem;

					&:first-of-type {
						background-color: #FEDA4F;
					}
				}
			}
		}

		.information-top {
			display: -webkit-flex;
			padding: 0.63rem 0;
			display: -webkit-flex;
			align-items: center;

			img {
				width: 0.38rem;
				height: 0.88rem;
				margin-right: 0.5rem;
			}

			h4 {
				font-size: 1.13rem;
				font-family: PingFang-SC-Bold, PingFang-SC;
				font-weight: bold;
				color: rgba(0, 0, 0, 1);
				line-height: 1.56rem;
			}

		}

		.guarantee-detail {
			padding: 0 0.75rem;
			margin: 1.25rem 0 0;

			ul {
				border-radius: 10px;
				background-color: #fff;
				padding: 0 1.5rem 1rem;
				box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.2);

				li {
					border-radius: 10px;
					background-color: #FAFAFA;
					margin-bottom: 1rem;

					.litop {
						display: -webkit-flex;

						img {
							width: 3rem;
							height: 3rem;
						}

						h4 {
							font-size: 0.88rem;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
							color: rgba(0, 0, 0, 1);
							line-height: 3rem;
						}
					}

					.lisection {
						display: -webkit-flex;
						justify-content: space-between;
						padding: 0.75rem;

						div {
							flex: 1;

							span {
								display: block;
								font-size: 0.88rem;
								font-family: PingFang-SC-Medium, PingFang-SC;
								font-weight: 500;
								color: #9B9B9B;
								line-height: 1.25rem;
							}
						}

						b {
							flex: 1;
							font-size: 0.75rem;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
							color: rgba(254, 160, 58, 1);
							line-height: 1.06rem;
						}
					}

				}
			}

		}

		.adviser {
			position: fixed;
			right: 0;
			top: 40%;
			width: 7.13rem;
			display: -webkit-flex;
			justify-content: space-between;
			padding: 0.4rem 0.6rem;
			box-sizing: border-box;
			border-top-left-radius: 50px;
			border-bottom-left-radius: 50px;
			background: linear-gradient(138deg, rgba(90, 229, 255, 1) 0%, rgba(12, 166, 248, 1) 100%);

			img {
				width: 2.25rem;
				height: 2.25rem;
			}

			span {
				display: block;
				font-size: 0.8rem;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				
			}
		}
		
		.van-popup {
			border-radius: 5px;
			
			.weImage{
				width: 16.4rem;
				height: 18.7rem;
				background: url(../../assets/img/二维码卡片@3x.png) center top;
				background-size: cover;
				text-align: center;
				position: relative;
				h2{
					font-size:1.06rem;
					font-family:PingFang-SC-Bold,PingFang-SC;
					font-weight:bold;
					color:rgba(24,24,24,1);
					line-height:1.5rem;
					padding-top: 2.5rem;
				}
				img{
					position: absolute;
					left:50%;
					top:59%;
					transform: translate(-50%,-50%);
					width: 9rem;
					height: 9rem;
				}
			}
		}
		.van-popup--center{
			top:65%;
		}
		/deep/.van-overlay{
			opacity: 0.6;
		}
	}
</style>
