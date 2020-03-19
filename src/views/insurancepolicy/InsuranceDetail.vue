<template>
	<div class="detail">
		<div v-wechat-title='$route.meta.title'></div>

		<div class="detail-insurance">
			<div class="left-icon"></div>
			<div class="right-icon"></div>

			<div class="insurance-top">
				<div class="top-title">
					<span :style="{color:detailData.color,borderColor:detailData.color}">{{detailData.insuredType}}险</span>
					<h3>{{detailData.productName}}</h3>
					<p><b :style="{backgroundColor:detailData.color}"></b><span>{{detailData.insuredCompanyName}}</span></p>
				</div>
				<img v-if="detailData.effective" src="../../assets/img/组1-policy@3x.png" alt="">
				<img v-else src="../../assets/img/组1-2@3x.png" alt="">
			</div>
			<div class="insurance-content">
				<h3>被保人</h3>
				<ul>
					<li><span>被保人：</span>{{detailData.insuredPersonName}}</li>
					<li v-if="detailData.insuredPersonSex"><span>性别：</span>男</li>
					<li v-else><span>性别：</span>女</li>
					<li><span>出生日期：</span>{{detailData.birthDate}}</li>
				</ul>
				<h3>保障内容</h3>
				<ul>
					<li><span>保额：</span>{{detailData.insuredAmount}}万元</li>
					<li><span>保费：</span>{{detailData.premium}}元</li>
					<li><span>保险期限：</span>{{detailData.insuredLimit}}</li>
				</ul>
			</div>

		</div>
		<div class="detail-pay">
			<h3>缴费信息</h3>
			<ul>
				<li><span>缴费方式：</span>{{detailData.payMethod}}</li>
				<li><span>下次缴费日期：</span>{{detailData.nextPayDate}}</li>
				<li v-if="detailData.isPay"><span>今年已缴费</span></li>
				<li v-else><span>今年未缴费</span></li>
			</ul>
		</div>
		<div class="detail-pay">
			<h3>附加险</h3>
			<ul v-for="(item,index2) in detailData.addInsured" :key="index2">
				<li><span>产品名称：</span>{{item.insureType}}</li>
				<li><span>保额：</span>{{item.amount}}万</li>
			</ul>
		</div>
		<div class="detail-pay">
			<h3>保单图片</h3>
			<img v-if="detailData.insurancePhotoUrl != ''" :src="detailData.insurancePhotoUrl" alt="">
		</div>

		<van-button @click="deleteInsurance()" plain type="info" color="#1DA5FE" round>删除保单</van-button>
		<div class="btn" @click="changeInsurance()">编辑保单</div>
	</div>
</template>

<script>
	import { insurancePolicyDetail } from "@/api/api"
	import { insurancePolicyDelete } from "@/api/api"
	export default {
		name: "detail",
		data() {
			return {
				detailData:{},
				labels:[
					{
						name:"重疾",
						imgs:require("../../assets/img/icon-重疾@3x.png"),
						color:"#2EE2AC"
					},
					{
						name:"意外",
						imgs:require("../../assets/img/icon-意外@3x.png"),
						color:"#FEA03A"
					},
					{
						name:"人寿",
						imgs:require("../../assets/img/icon-寿险@3x.png"),
						color:"#FF631D"
					},
					{
						name:"医疗",
						imgs:require("../../assets/img/icon-医疗@3x.png"),
						color:"#1DA5FE"
					},
					{
						name:"其他",
						imgs:require("../../assets/img/icon-其他@3x.png"),
						color:"#85A6FF"
					},
				],
			}
		},
		methods:{
			//查询单个保单
			getDetail(){
				insurancePolicyDetail("/api/insurancePolicy/appGetOne/" + this.$route.query.id).then(res=>{
					this.detailData = res
						
					this.labels.forEach((item)=>{
						if(item.name == this.detailData.insuredType){
							this.detailData.color = item.color
						}
					})
				})
			},
			//删除单个保单
			deleteInsurance(){
				var ids = [this.$route.query.id];
				insurancePolicyDelete(ids).then(res=>{
					this.$toast("删除成功")
					this.$router.push({path:"/insurancepolicy"})
				})
			},
			//编辑保单
			changeInsurance(){
				this.$router.push({
					path:'insuranceAdd',
					query:{id:this.$route.query.id}
				})
			}
		},
		created(){
			this.getDetail()
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		background-color: #f7f7f7;
		padding: 1.25rem 0.75rem;
		position: relative;
		.detail-insurance {
			position: relative;
			width: 100%;
			background-color: #fff;
			box-shadow:0rem 0.63rem 1.88rem -0.75rem rgba(0,0,0,0.2);
			border-radius: 0.5rem;

			.left-icon::before,
			.right-icon::before {
				position: absolute;
				content: '';
				top: 6.4rem;
				width: 0.4rem;
				height: 0.8rem;
				border-radius: 50px 0 0 50px;
				box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.1) inset;
				background-color: #f7f7f7;
			}
			
			.left-icon::before {
				left: 0rem;
				border-radius: 0 50px 50px 0;
			}
			
			.right-icon::before {
				right: 0rem;
			}

			.insurance-top {
				display: -webkit-flex;
				justify-content: space-between;
				width: 94%;
				margin: 0 auto;
				padding: 0.75rem 0;
				border-bottom: 1px dashed rgba(204,204,204,0.5);

				.top-title {
					span {
						display: inline-block;
						font-size: 0.75rem;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color:#85A6FF;
						line-height: 1.06rem;
						padding: 0.13rem 0.63rem;
						border-radius: 0.69rem;
						border: 1px solid #85A6FF;;
					}

					h3 {
						font-size: 1.06rem;
						font-family: PingFang-SC-Bold, PingFang-SC;
						font-weight: bold;
						color: rgba(0, 0, 0, 1);
						line-height: 1.5rem;
						margin: 0.5rem 0;
					}

					p {
						b {
							display: inline-block;
							width: 5px;
							height: 5px;
							background-color: #85A6FF;
							border-radius: 100%;
							vertical-align: middle;
						}

						span {
							border: none;
							color: rgba(153, 153, 153, 1);
							line-height: 1.06rem;
						}
					}
				}

				img {
					width: 3.13rem;
					height: 2.94rem;
				}
			}

			.insurance-content {
				width: 94%;
				margin: 0 auto;
				padding: 0.88rem 0 0.5rem;
			}

		}

		h3 {
			font-size: 0.88rem;
			font-family: PingFang-SC-Bold, PingFang-SC;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
			line-height: 1.25rem;
			margin-bottom: 0.5rem;
		}

		ul {
			li {
				font-size: 0.88rem;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: normal;
				color: rgba(153, 153, 153, 1);
				line-height: 1.25rem;
				margin-bottom: 0.5rem;

				span {
					display: inline-block;
					width: 7rem;
					margin-right: 1rem;
				}
			}
		}

		.detail-pay {
			width: 100%;
			padding: 0.75rem;
			background-color: #fff;
			box-shadow:0rem 0.63rem 1.88rem -0.75rem rgba(0,0,0,0.2);
			border-radius: 0.5rem;
			box-sizing: border-box;
			margin-top: 1.25rem;

			img {
				width: 7rem;
				height: 8rem;
			}
		}

		.van-button {
			display: block;
			width: 12rem;
			margin: 1.25rem auto 2.8rem;
		}
		.btn{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			background: #1DA5FE;
			font-size:1.06rem;
			font-family:PingFang-SC-Bold,PingFang-SC;
			font-weight:bold;
			color:rgba(255,255,255,1);
			line-height:1.5rem;
			padding: 0.75rem 0;
			text-align: center;
		}
	}
</style>
