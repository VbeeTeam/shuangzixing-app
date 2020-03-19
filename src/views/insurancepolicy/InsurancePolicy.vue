<template>
	<div class="policy">
		<div v-wechat-title='$route.meta.title'></div>
		
		<div class="remind" v-if="logins.sendSmsDay == null">
			<span>一键开启保单续费提醒，省心无忧</span>
			<van-button type="info" color="#1DA5FE" round @click="openRemind()">立即开启</van-button>
		</div>
		
		<div class="top">
			<div class="top-bg">
				<van-tabs v-model="activeName" line-width="0px" title-active-color="#1DA5FE" title-inactive-color="#CCCCCC" type="line"
				@click="tabClick">
					<van-tab v-for="(item,key,i) in cataList" :key="i" :title="key" :name="i">
					</van-tab>
				</van-tabs>
			</div>
			<div class="top-situation">
				<div class="situation-detail" 
				:style="{borderBottom:(list.insuredTypeAmount.length > 0 ? '1px dashed rgba(204,204,204,0.5)' : 'none')}">
					<div class="detail-left">
						<h3>保障情况</h3>
						<h4>{{list.premiumSum}}.00 <span>元</span></h4>
						<p>年保费额</p>
					</div>
					<div class="detail-left">
						<h3 style="visibility: hidden;">无</h3>
						<h4>{{list.effectivePolicyNum}} <span>份</span></h4>
						<p>有效保单</p>
					</div>
				</div>
				<ul>
					<li v-for="(item,key,index3) in list.insuredTypeAmount" :key="index3">
						<div class="left-icon"></div>
						<div class="right-icon"></div>
						
						<div class="li">
							<div class="liLeft">
								<img v-if="item.imgs" :src="item.imgs" alt="">
								<img v-else src="../../assets/img/icon-其他@3x.png" alt="">
								<span :style="{color:item.color}">{{item.insureType}}</span>
							</div>
							<span :style="{color:item.color}">{{item.amount}} 万</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="section">
			<van-list v-if="list.insurancePolicyList.length != 0">
				<van-cell v-for="(item,idnex1) in list.insurancePolicyList" :key="idnex1" @click="toDetail(item)">
					<div class="list-left">
						<h3><span :style="{color:item.color,borderColor:item.color}">{{item.insuredType}}</span> <b>{{item.productName}}</b></h3>

						<div class="list-bottom">
							<p><span>保额:{{item.insuredAmount}}万</span><span>保费:{{item.premium}}元</span></p>
							<span v-if="item.endDate">保险期限: {{item.startDate}} 至 {{item.endDate}}</span>
							<span v-else>保险期限: {{item.startDate}} 至 {{item.insuredLimit}}</span>
						</div>
					</div>
					<div class="list-right">
						<img v-if="item.effective" src="../../assets/img/组1-policy@3x.png" alt="">
						<img v-else src="../../assets/img/组1-2@3x.png" alt="">
						<img src="../../assets/img/icon_left-black@3x.png" alt="">
					</div>
				</van-cell>
			</van-list>

			<div v-if="list.insurancePolicyList.length == 0" class="nothing">
				<img src="../../assets/img/编组-policy2@3x.png" alt="">
				<h4>暂无保单</h4>
			</div>

			<van-button :icon="btnIcon" type="info" color="#1DA5FE" round @click="toAdd()">添加保单</van-button>

		</div>
		
		<!-- 续费提醒 -->
		<van-action-sheet v-model="open.phoneShow" title="您暂未绑定手机，请先绑定">
			<van-cell-group>
				<van-field @blur="inputBlur()" @input="inputChange(1)" v-model="forms.phone" 
				label="手机号码" placeholder="请输入手机号" :error-message="forms.phoneErr"
				clearable/>
				<van-field @input="inputChange(2)" v-model="forms.code" center clearable 
				label="验证码" placeholder="请输入短信验证码"
				use-button-slot>
					<van-button v-if="forms.btnShow" @click="toSend()" slot="button" :disabled="forms.btnBoolean" size="small" round type="info" :color="forms.color">获取</van-button>
					<van-button v-else slot="button" disabled size="small" round type="info" color="#999">重新获取（{{this.forms.time}}）</van-button>
				</van-field>
			</van-cell-group>
			<van-button type="info" color="#1DA5FE" :disabled="forms.submit" round @click="submit()">验证并绑定</van-button>
		</van-action-sheet>
		<van-action-sheet v-model="open.show" title="保单续费提醒">
			<van-cell>
				<van-field :disabled="true" v-model="open.dateValue" 
				placeholder="请选择提醒日期" label="提醒时间" @click="open.pickerShow = true" />
				<img src="../../assets/img/icon_left-black6@3x.png" alt="">
			</van-cell>
			<van-picker v-if="open.pickerShow" show-toolbar title="" :columns="columns" 
			@cancel="open.pickerShow = false" @confirm="onConfirm"/>
			<van-button v-else type="info" color="#1DA5FE" round @click="remind()">开启提醒</van-button>
		</van-action-sheet>

	</div>
</template>

<script>
	import { smsSend } from "@/api/api"
	import { bindPhone } from "@/api/api"
	import { insurancePolicy } from "@/api/api"
	import { addSendSmsDay } from "@/api/api"
	
	export default {
		name: "policy",
		data() {
			return {
				btnIcon: require("../../assets/img/icon-add@3x.png"),
				cataList: [],
				list: {},
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
				columns: [
					{
						values: ['3天', '7天', '15天', '30天'],
						defaultIndex: 1
					},
				],
				logins:{},
				activeName: "",
				open:{
					dateValue:"",
					sendSmsDay:"",
					phoneShow:false,
					show: false,
					pickerShow:false
				},
				forms: {
					border:true,
					btnText:"获取",
					color:"#999999",
					phone: "",
					phoneErr: "",
					code:"",
					btnShow:true,
					btnBoolean:true,
					submit:true,
					time:10,
					myTime:null,
				},
				
			}
		},
		methods: {
			//跳转保单详情
			toDetail(item) {
				this.$router.push({
					path: '/insurancedetail',
					query:{id:item.id,color:item.color}
				})
			},
			//跳转增加保单
			toAdd() {
				this.$router.push({
					path: '/insuranceadd'
				})
			},
			//切换保单人
			tabClick(name,title) {
				this.list = this.cataList[title]
			},
			//打开提醒弹窗
			openRemind() {
				if(this.logins.phone){
					this.open.show = true
				}else{
					this.open.phoneShow = true
				}
			},
			//开启提醒
			remind(){
				if(this.open.dateValue == ""){
					this.$toast("请选择提醒时间")
				}else{
					var obj ={
						sendSmsDay: this.open.sendSmsDay,
						userId:this.logins.userId
					}
					addSendSmsDay(obj).then(res=>{
						this.getList()
						this.$toast("开启成功")
						this.open.show = false
					})
				}
				
			},
			//确定
			onConfirm(val){
				this.open.dateValue = val[0]
				this.open.sendSmsDay = val[0].substr(0, val[0].length - 1);
				this.open.pickerShow = false
			},
			//输入时
			inputChange(a){
				this.forms.phone == "" || this.forms.code == "" ? this.forms.submit = true : this.forms.submit = false
				if(a == 1){
					if(this.forms.phone != ""){
						this.forms.btnBoolean = false
						this.forms.color = "#016DF8"
						this.forms.phoneErr = ""
					}else{
						this.forms.btnBoolean = true
						this.forms.color = "#999"
					}
				}
				
			},
			//输入后
			inputBlur() {
				(/^1[3456789]\d{9}$/.test(this.forms.phone)) == false ? this.forms.phoneErr = "请输入正确手机号" : this.forms.phoneErr =
					""
			},
			//发送验证码
			toSend(){
				this.forms.time = 10
				if((/^1[3456789]\d{9}$/.test(this.forms.phone))){
					smsSend({phone:this.forms.phone}).then(res => {
						this.forms.btnShow = false
						this.forms.myTime = setInterval(()=>{
							this.forms.time --
							
							if(this.forms.time == 0){
								clearInterval(this.forms.myTime)
								this.forms.btnShow = true
							}
						},1000)
					})
				}
				
			},
			//绑定手机号
			submit(){
				var obj = {
					phone: this.forms.phone,
					verifyCode: this.forms.code,
					userId: this.logins.userId
				}	
				bindPhone(obj).then(res => {
					if(res.status){
						this.$toast(res.message)
					}else{
						this.$toast("绑定成功")
						this.open.phoneShow = false
						this.open.show = true
					}
					
				})
				
			},
			//查询保单列表
			getList(){
				insurancePolicy('/api/insurancePolicy/appGet/' + this.logins.userId).then(res =>{
					Object.keys(res).forEach((key)=>{
						res[key]["insuredTypeAmount"].forEach((item1)=>{
							this.labels.forEach((item2)=>{
								if(item1.insureType == item2.name){
									item1.imgs = item2.imgs
									item1.color = item2.color
								}
							})
						})
						res[key]["insurancePolicyList"].forEach((item1)=>{
							this.labels.forEach((item2)=>{
								if(item1.insuredType == item2.name){
									item1.color = item2.color
								}
							})
						})
						
					})
					this.cataList = res
					this.list = res[Object.keys(res)[0]]
				})
			}
			
		},
		created(){
			this.logins = JSON.parse(sessionStorage.getItem('userInfo')) ?
			JSON.parse(sessionStorage.getItem('userInfo')) : {}
		},
		mounted(){
			this.getList()
		}

	}
</script>

<style lang="scss" scoped>
	.policy {
		background-color: #f7f7f7;

		.remind {
			
			padding: 0.4rem 0.75rem;
			background-color: #C4C4C4;
			box-sizing: border-box;
			span {
				font-size: 0.88rem;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 1.25rem;
			}
			.van-button {
				width: 6rem;
				height: 2rem;
				line-height: 2rem;
				margin-left: 1rem;
			}
		}

		.top {
			margin-bottom: 1.25rem;
			.top-bg{
				height: 8.5rem;
				padding: 0.75rem;
				box-sizing: border-box;
				background: url(../../assets/img/bg-policy@3x.png) left top;
				background-size: cover;
			}
			/deep/.van-tabs {
				.van-tab {
					border-radius: 25px;
					background-color: #fff;
					margin-right: 1rem;
					height: 1.88rem;
					line-height: 2rem;
					font-size: 0.75rem;
					padding: 0 0.75rem;
					max-width: 4rem;
				}

				.van-hairline--top-bottom {
					background-color: transparent !important;
				}

				.van-hairline--top-bottom::after {
					border-width: 0;
				}

				.van-tabs__nav {
					background-color: transparent;
				}

			}

			.top-situation {
				width: 94%;
				margin: 0 auto;
				background-color: #fff;
				border-radius: 0.5rem;
				padding: 0.75rem 0;
				box-sizing: border-box;
				box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.2);
				z-index: 2;
				margin-top: -3rem;
				.situation-detail{
					width: 90%;
					margin: 0 auto;
					display: -webkit-flex;
					padding-bottom: 1rem;
					.detail-left {
						flex: 1;
						h3 {
							font-size: 1.06rem;
							font-family: PingFang-SC-Bold, PingFang-SC;
							font-weight: bold;
							color: rgba(145, 206, 255, 1);
							line-height: 1.5rem;
						}
					
						h4 {
							font-size: 1.5rem;
							font-family: DIN-Medium,DIN;
							font-weight: 800;
							color: rgba(29, 165, 254, 1);
							line-height: 2.06rem;
							margin: 0.5rem 0;
							text-align: center;
					
							span {
								font-size: 0.88rem;
								font-family: PingFang-SC-Bold, PingFang-SC;
								font-weight: bold;
								color: rgba(24, 24, 24, 1);
								line-height: 1.25rem;
							}
						}
					
						p {
							font-size: 0.63rem;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
							color: rgba(0, 0, 0, 1);
							line-height: 0.88rem;
							text-align: center;
						}
					
						&:first-of-type {
							background: url(../../assets/img/border-right.png) no-repeat right top;
							background-size: 0.1rem 100%;
						}
					}
				}
				ul{
					li{
						position: relative;
						
						&:last-of-type{
							.li{
								border:none;
								padding-bottom: 0;
							}
						}
						.left-icon::before,
						.right-icon::before {
							position: absolute;
							content: '';
							top: -0.4rem;
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
						
						.li{
							width: 90%;
							margin: 0 auto;
							display: -webkit-flex;
							justify-content: space-between;
							align-items: center;
							padding: 0.75rem 0;
							border-bottom: 1px dashed rgba(204,204,204,0.5);
							.liLeft{
								img{
									width: 1.88rem;
									vertical-align: middle;
									margin-right: 0.75rem;
								}
							}
							span{
								font-size:1rem;
								font-family:PingFang-SC-Medium,PingFang-SC;
								font-weight:normal;
								color:#85A6FF;
								vertical-align: middle;
							}
						}
						
					}
				}
			}

		}

		.section {
			padding: 0 0.75rem 5rem;
			/deep/.van-list {
				.van-cell {
					margin-bottom: 1.25rem;
					box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.2);
					border-radius: 0.5rem;
					padding: 0;
					margin-bottom: 1.25rem;
					.van-cell__value {
						display: -webkit-flex;
						justify-content: space-between;

						.list-left {
							padding: 0.75rem;

							h3 {
								display: -webkit-flex;
								align-items: center;
								span {
									display: inline-block;
									font-size: 0.75rem;
									font-family: PingFang-SC-Medium, PingFang-SC;
									font-weight: 500;
									border: 1px solid #85A6FF;
									color:#85A6FF;
									padding: 0rem 0.6rem;
									border-radius: 1rem;
									box-sizing: border-box;
									margin-right: 0.2rem;
								}
								b {
									display: inline-block;
									font-size: 1rem;
									font-family: PingFang-SC-Medium, PingFang-SC;
									font-weight: normal;
									color: rgba(0, 0, 0, 1);
									width: 12rem;
									box-sizing: border-box;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}
							}

							.list-bottom {
								margin-top: 0.9rem;

								p {
									display: -webkit-flex;
									justify-content: space-between;
									margin-bottom: 0.5rem;
								}

								span {
									font-size: 0.75rem;
									font-family: PingFang-SC-Medium, PingFang-SC;
									font-weight: 500;
									color: rgba(153, 153, 153, 1);
									line-height: 1.06rem;
								}
							}
						}

						.list-right {
							padding: 0.25rem;
							text-align: center;

							img {
								width: 3.13rem;
								display: block;

								&:last-of-type {
									width: 2.5rem;
									display: inline-block;
								}
							}
						}
					}

				}
				.van-cell:not(:last-child)::after{
					border:none;
				}
			}

			.nothing {
				text-align: center;
				
				img {
					width: 8.25rem;
				}

				h4 {
					margin: 1.25rem 0 4rem;
					font-size: 1.06rem;
					font-family: PingFang-SC-Medium, PingFang-SC;
					font-weight: 500;
					color: rgba(145, 206, 255, 1);
					line-height: 1.5rem;
				}
			}

			.van-button {
				width: 12rem;
				position: fixed;
				left: 50%;
				bottom: 2rem;
				transform: translateX(-50%);
				z-index: 2;
				span{
					line-height: 2.9rem;
				}
			}
		}

		/deep/.van-action-sheet {
			.van-hairline--top-bottom{
				background: #E9F5FE !important;
				padding-bottom: 0 !important;
			}
			.van-cell__value--alone {
				position: relative;
				img {
					width: 2.5rem;
					height: 2.5rem;
					position: absolute;
					right: 0;
					top: 5px;
				}

				/deep/.van-field {
					padding: 8px 0;

					.van-field__label {
						width: 5.5rem;
						padding: 0.5rem 0;
						box-sizing: border-box;

						span {
							font-weight: bold;
							font-size: 1rem;
						}
					}

					.van-field__value {
						padding: 0.5rem;
						border-radius: 0.25rem;
					}
				}
				
			}
			.van-picker{
				.van-picker__toolbar{
					.van-picker__cancel{
						color:#999 !important;
					}
				}
				
			}
			.van-button {
				display: block;
				width: 12rem;
				margin: 0.8rem auto 0.5rem;
			}
			
			.van-cell-group{
				margin-bottom: 5rem;
				.van-button {
					display: block;
					width: auto;
					margin: 0;
				}
			}
			.van-cell:not(:last-child)::after{
				border-bottom: none;
			}
		}

	}
</style>
