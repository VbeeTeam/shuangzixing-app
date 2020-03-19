<template>
	<div class="box">
		<div v-wechat-title='$route.meta.title'></div>
		<div class="programmeList" v-if="programmeList.length > 0">

			<div class="programmeList-top">
			</div>

			<div class="programmeList-card">
				<div class="card-top">
					<p v-if="programmeList.length > 0">
						<b v-if="programmeList[userIndex].insuredPerson == '本人'">{{userName}}</b>
						<b v-else>{{programmeList[userIndex].insuredPerson}}</b>
						<span> | </span>
						<span>{{programmeList[userIndex].birthDate}}岁</span>
						<span> | </span>
						<span>专属保障方案</span>
					</p>
				</div>

				<img v-if="headPicture != null " :src="headPicture" alt="">
				<img v-else src="../../assets/img/男头像-默认@3x.png" alt="">
				<div class="card" v-if="programmeList.length > 0">
					<div v-for="(item,index3) in programmeList[userIndex].planTotal" :key="index3">
						<p>
							<b :style="{color:item.color}">{{item.sum}}万</b>
							<span>{{item.insureType}}保障</span>
						</p>
						<i>{{item.insureExplain}}</i>
					</div>

				</div>
			</div>

			<!-- tab列表 -->
			<van-tabs v-model="tabIndex" background="#f7f7f7" line-width="30px" line-height="4px" color="#1DA5FE" @click="onClick">
				<van-tab class="allShow" title="总览">
					<h3>家庭保障清单</h3>
					<ul>
						<li>
							<span>成员</span>
							<span>建议产品</span>
							<span>年缴保费</span>
							<span>交费期限</span>
							<span>保障额度</span>
							<span>保障期限</span>
						</li>
						<li v-for="(item,index4) in programmeList" :key="index4">
							<span>{{item.insuredPerson}}</span>
							<div class="liList">
								<div v-for="(item,index5) in item.planDetail" :key="index5">
									<b>{{item.product.name}}</b>
									<b>{{item.yearPremium}}</b>
									<b>{{item.payTimeLimit}}</b>
									<b>{{item.insureLines}}万</b>
									<b>{{item.insureTimeLimit}}</b>
								</div>

							</div>
						</li>

					</ul>
				</van-tab>

				<van-tab v-for="(itemBox,indexBox) in programmeList" :key="indexBox" :title="itemBox.insuredPerson">
					<div class="content">

						<ul class="list">

							<li v-for="(item,i) in itemBox.planDetail" :key="i">
								<div class="list-top">
									<div class="top-left">
										<span :style="{background:item.color}">{{item.insureType}}险</span>

									</div>
									<div class="top-right">
										<b>{{item.product.name}}</b>
										<span v-if="item.product.articleList.length > 0"><a :href="item.product.articleList[0].coverUrl"><span>测评文章</span></a></span>
									</div>
								</div>
								<div class="list-nav">
									<div>
										<span>年缴保费</span>
										<b :style="{color:item.color}">￥{{item.yearPremium}}</b>
									</div>
									<div v-for="(item2,index10) in item.productSKU" :key="index10">
										<span>{{item2.itemName}}</span>
										<b :style="{color:item.color}">{{item2.attrsModule}}</b>
									</div>
								
								</div>
								<div class="list-section">

									<div class="p" :class="{'all' : item.allBoolean == true}">
										产品亮点: 
										<span v-for="(item3,index6) in item.productFeatures" :key="index6">
											<span v-if="item3.merit">{{index6 + 1}}、</span>
											<span v-if="item3.merit">{{item3.content}}</span><br/>
										</span>
										
									</div>

									<div v-if="!item.allBoolean" class="allBtn" @click="allBtn(indexBox,i,item.allBoolean)">
										<span>展开</span>
										<img src="../../assets/img/arrow_down@3x.png" alt="">

									</div>
									<div v-if="item.allBoolean" class="allBtn" @click="allBtn(indexBox,i,item.allBoolean)">

										<span>收起</span>
										<img src="../../assets/img/收起@3x.png" alt="">

									</div>
								</div>
								<div class="list-bottom">
									<img :src="item.product.company.logoUrl" alt="">
									<div class="btn">
										<button @click="toDetail(item)">查看详情</button>
										<button @click="toHref(item)">投保链接</button>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</van-tab>

			</van-tabs>

			<div class="adviser" v-if="tabIndex != 0" @click="show = true">
				<img src="../../assets/img/icon_客服@3x.png" alt="">
				<div>
					<span>专属顾问</span>
					<span v-if="$store.state.customer.name">{{$store.state.customer.name}}</span>
					<span v-else>{{erName}}</span>
				</div>
			</div>

			<div v-if="tabIndex > 0" class="programmeList-calculation" @click="caculationBoolean = true">
				<span>保费测算</span>
			</div>

			<div class="caluMask" :class="{'show' : caculationBoolean == true}">
				<div class="mask"></div>

				<div class="calculation" :class="{'calcu-two' : caculationBoolean == true}">
					<h3>产品组合DIY</h3>
					<ul>
						<li v-for="(item,index1) in programmeList" :key="index1">
							<div class="product-top" @click="liClick(index1)">
								<van-checkbox v-model="item.total2" @click="checkChange(index1)" :name="item.insuredPerson">{{item.insuredPerson}}的保费</van-checkbox>
								<span>￥{{item.sum}}</span>
							</div>
							<div class="product-list" :class="{'show' : liIndex == index1}">
								<van-checkbox-group v-model="item.total1" @change="allChange(index1)" ref="checkboxGroup">
									<van-cell-group>
										<!-- :title="`${item2.product}`" -->
										<van-cell v-for="(item2,index2) in item.planDetail" :key="index2">

											<van-checkbox :name="item2.yearPremium">{{item2.product.name}}</van-checkbox>

											<span>￥{{item2.yearPremium}}</span>
										</van-cell>
									</van-cell-group>
								</van-checkbox-group>
							</div>

						</li>
					</ul>
					<div class="btn">
						<b>总计：￥{{totalNum}}</b>
						<span @click="caculationBoolean = false">我知道了</span>
					</div>
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

		<div class="noProgramme" v-else-if="status == 102">
			<img src="../../assets/img/icon_方案定制中@3x.png" alt="">
			<h3>方案定制中</h3>
		</div>
		<div class="noProgramme" v-else-if="status == 101">
			<img src="../../assets/img/icon_无方案@3x.png" alt="">
			<h3>啊哦~您还没有定制过方案~</h3>
			<van-button @click="toProgramme()" slot="button" type="info" round>立即定制</van-button>
		</div>

	</div>

</template>

<script>
	import {
		planMain
	} from '@/api/api';
	import {
		getMadePersonWechatQr
	} from '@/api/api';
	export default {
		name: "programmeList",
		components: {

		},
		data() {
			return {

				programme: true,
				logins: null,
				programmeList: [],
				userIndex: 0,
				tabIndex: 0,
				liIndex: 0,
				status: null,
				allIndex: -1,
				allBoolean: false,
				caculationBoolean: false,
				result: [],
				checked: "",
				totalNum: 0,
				show: false,
				headPicture: "",
				userName: "",
				erImg: "",
				erName:""
			}
		},
		methods: {
			//方案列表
			planList() {
				//this.logins.userId 1217323610755174400

				planMain('/api/planMain/' + this.logins.userId, {}).then(res => {

					if (res.status == 101) {
						this.status = 101
					} else if (res.status == 102) {
						this.status = 102
					} else {
						this.headPicture = res.headPicture
						this.userName = res.userName
						this.programmeList = res.plan.filter((item)=>{
							return item.planDetail.length > 0
						})
						
						this.programmeList.forEach((item1, index1) => {
							item1.sum = 0
							item1.birthDate = this.getAge(item1.birthDate)
							item1.planDetail.forEach((item2, index2) => {
								item1.sum = item1.sum + item2.yearPremium
								item2.allBoolean = false
								item2.product.articleList = JSON.parse(item2.product.articleList)
								
								item2.productSKU.forEach((item3)=>{
									
									if(item3.itemName == "交费期限"){
										item2.payTimeLimit = item3.attrsModule
									}else if(item3.itemName == "保障期限"){
										item2.insureTimeLimit = item3.attrsModule
									}
									
								})
								
								if (item2.insureType == "重疾") {
									item2.color = "#2EE2AC"
								} else if (item2.insureType == "意外") {
									item2.color = "#FE9C38"
								} else if (item2.insureType == "医疗") {
									item2.color = "#FF631D"
								}

							})

							item1.planTotal.forEach((item2) => {

								if (item2.insureType == "重疾") {
									item2.color = "#2EE2AC"
								} else if (item2.insureType == "意外") {
									item2.color = "#FE9C38"
								} else if (item2.insureType == "医疗") {
									item2.color = "#FF631D"
								}

							})

						})

					}

				})

				//顾问
				if (!this.$store.state.customer.wechatQr) {
					getMadePersonWechatQr("/api/customer/getMadePersonWechatQr/" + this.logins.userId).then(res => {
						this.erImg = res.wechatQr
						this.erName = res.name
					})
				} else {
					this.erImg = this.$store.state.customer.wechatQr
				}
			},
			//跳转方案定制
			toProgramme() {
				this.$router.push({
					path: '/programmeEntrance'
				})
			},
			//切换
			onClick() {
				if (this.tabIndex == 0) {
					return;
				} else {
					this.userIndex = this.tabIndex - 1
				}

			},
			//展开
			allBtn(index, i, boo) {

				this.allBoolean = boo == true ? false : true

				if (this.allBoolean) {

					this.programmeList[index].planDetail[i].allBoolean = this.allBoolean
					this.$forceUpdate()
				} else {

					this.programmeList[index].planDetail[i].allBoolean = this.allBoolean
					this.$forceUpdate()
				}



			},

			//跳转详情
			toDetail(a) {
				
				localStorage.setItem('programme', JSON.stringify(a))
				this.$router.push({
					path: "/programmeDetail",
					query: {userId:this.logins.userId}
				})
			},
			//立即投保
			toHref(item){
				if(item.product.channel.name == "小雨伞"){
					window.location.href = item.product.salesUrl + "&subchn=" + this.logins.userId
				}else if(item.product.channel.name == "网金"){
					window.location.href = item.product.salesUrl + "?userTrack=" + this.logins.userId
				}
			},
			
			liClick(i) {
				this.liIndex = i
				
			},
			//全选,反选
			checkChange(index) {
				
				if (!this.programmeList[index].total2) {
					this.$refs.checkboxGroup[index].toggleAll(true);
				} else{
					this.$refs.checkboxGroup[index].toggleAll();
					
				}
				this.totalNum = 0
				
				this.programmeList.forEach((item) => {
					if (item.total2) {
						this.totalNum = this.totalNum + item.sum
					}
				})
			},
			//单选
			allChange(index) {
				
				if (this.programmeList[index].planDetail.length == this.programmeList[index].total1.length) {
					this.programmeList[index].total2 = true
				}else if (this.programmeList[index].planDetail.length >= this.programmeList[index].total1.length){
					this.programmeList[index].total2 = false
				}
				
				this.totalNum = 0
				this.programmeList.forEach((item) => {
					if(item.total1){
						item.total1.forEach((item2) => {
							this.totalNum = this.totalNum + item2
						})
					}
					
				})

			},
			
			//计算年龄
			getAge(birthday){
				//出生时间 毫秒
				var birthDayTime = new Date(birthday); 
				//当前时间 毫秒
				var nowTime = new Date(); 
				var age = nowTime.getFullYear() - 
			birthDayTime.getFullYear() -
			(nowTime.getMonth() < birthDayTime.getMonth() ||
			(nowTime.getMonth() == birthDayTime.getMonth() &&
			nowTime.getDate() < birthDayTime.getDate())
			? 1
			: 0);
				
				return age
			}
		},
		created() {
			var obj = {}
			if (this.$route.query.userId) {

				obj.userId = this.$route.query.userId
			}

			this.logins = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')) :
				obj;

			this.planList()

		}

	}
</script>

<style scoped lang="scss">
	.box {
		background: #f7f7f7;

		.noProgramme {
			text-align: center;
			padding-top: 5rem;

			img {
				width: 8rem;
			}

			h3 {
				font-size: 1.06rem;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: 500;
				color: rgba(0, 0, 0, 1);
				line-height: 1.5rem;
				margin: 2rem 0 3rem;
			}

		}
	}

	.programmeList {
		background: #f7f7f7;

		.programmeList-top {
			width: 100%;
			height: 11.3rem;
			background: url('../../assets/img/bg@3x.png') center top;
			background-size: cover;
		}

		.programmeList-card {
			position: relative;
			box-shadow: 0 0 5px #ccc;
			border-radius: 5px;

			width: 90%;
			margin: -9rem auto;
			z-index: 1;
			padding: 0.75rem;
			box-sizing: border-box;
			min-height: 11rem;
			background: url(../../assets/img/个人名片纹理@3x.png) no-repeat right bottom;
			background-size: 10rem 5.5rem;
			background-color: #fff;

			.card-top {
				p {
					b {
						font-size: 0.88rem;
						font-family: PingFang-SC-Bold, PingFang-SC;
						font-weight: bold;
						color: rgba(24, 24, 24, 1);
						line-height: 1.25rem;
					}

					span {
						font-size: 0.88rem;
						font-family: PingFang-SC-Medium, PingFang-SC;
						color: rgba(24, 24, 24, 1);
						line-height: 1.25rem;
						padding: 0 0.1rem;
					}
				}
			}

			img {
				width: 4.5rem;
				height: 4.5rem;
				position: absolute;
				right: 5%;
				top: -1.5rem;
				border-radius: 50%;
			}


			.card {
				display: -webkit-flex;
				flex-wrap: wrap;
				margin-top: 2rem;

				div {
					width: 50%;
					text-align: center;
					box-sizing: border-box;
					margin-bottom: 0.5rem;

					p {
						font-size: 1.2rem;
						display: -webkit-flex;
						align-items: center;
						justify-content: center;

						b {
							font-size: 1.5rem;
							font-family: PingFang-SC-Heavy, PingFang-SC;
							font-weight: 800;
							color: rgba(29, 165, 254, 1);
							line-height: 2.06rem;
							margin-right: 0.5rem;
						}

						span {
							font-size: 0.88rem;
							font-family: PingFang-SC-Bold, PingFang-SC;
							font-weight: bold;
							color: rgba(24, 24, 24, 1);
							line-height: 1.25rem;
						}
					}

					i {
						font-size: 0.6rem;
						color: #ccc;
						font-style: normal;
					}
				}

			}
		}

		/deep/.van-tabs {
			margin-top: 10rem;

			.van-tab {
				font-size: 1.06rem;

			}

			.van-hairline--top-bottom::after {
				border-width: 0;
			}

			.van-tab--active {
				font-size: 1.06rem;
				font-family: PingFang-SC-Bold, PingFang-SC;
				font-weight: bold;
				color: rgba(24, 24, 24, 1);

			}
		}

		.allShow {
			padding-bottom: 3rem;
			h3 {
				font-size: 1rem;
				padding: 0.75rem;
			}

			ul {
				li {
					
					display: -webkit-flex;
					border-bottom: 1px solid #fff;
					&:first-of-type{
						background: #fff;
						span{
							color: #000;
						}
					}
					
					background: #E9EAEB;
					
					span {

						display: -webkit-flex;
						align-items: center;
						justify-content: center;
						width: 3.5rem;
						font-size: 0.6rem;
						padding: 1rem 0;
						box-sizing: border-box;
						color: #6B6B6C;
						border-right: 1px solid #fff;
						&:nth-of-type(2) {
							width: 6rem;
						}
					}



					.liList {
						flex: 1;

						div {
							display: -webkit-flex;
							border-bottom: 1px solid #fff;
							&:last-of-type{
								border-bottom: none;
							}
							b {
								display: inline-block;
								width: 3.5rem;
								text-align: center;
								font-size: 0.6rem;
								padding: 1rem 0;
								box-sizing: border-box;
								font-weight: normal;
								color: #6B6B6C;
								border-right: 1px solid #fff;
								&:nth-of-type(1) {
									width: 6rem;
								}

							}
						}
					}


				}
			}

		}

		.content {
			padding: 0 1rem 3rem;
			box-sizing: border-box;

			.list {
				li {
					background-color: #fff;
					box-shadow: 0 0 5px #ccc;
					border-radius: 5px;
					margin: 1rem 0;

					.list-top {

						.top-left {

							span {
								display: inline-block;
								padding: 0.4rem 0.8rem;
								font-size: 0.75rem;
								color: #fff;
								background-color: #1DA5FE;
								border-top-left-radius: 5px;
								border-bottom-right-radius: 5px;

							}

						}

						.top-right {
							display: -webkit-flex;
							justify-content: space-between;
							padding: 0.5rem 1.5rem;
							box-sizing: border-box;

							b {
								font-size: 1.06rem;
								font-family: PingFang-SC-Bold, PingFang-SC;
								font-weight: bold;
								color: rgba(24, 24, 24, 1);
								line-height: 1.5rem;
							}

							span {
								a {
									font-size: 0.88rem;
									font-family: PingFang-SC-Medium, PingFang-SC;
									font-weight: 500;
									color: rgba(254, 160, 58, 1);
									line-height: 1.25rem;
									border-bottom: 1px solid #FEA03A;
								}

							}
						}
					}

					.list-nav {

						padding: 0.75rem 2rem;
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

					.list-section {
						padding: 0 0.75rem;

						.p {
							font-size: 0.88rem;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
							color: #7E7E7E;
							line-height: 1.25rem;

							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
						}

						.all {
							display: block;
						}

						.allBtn {
							text-align: center;
							margin: 0.75rem 0;

							span {
								font-size: 0.75rem;
								font-family: PingFang-SC-Medium, PingFang-SC;
								font-weight: 500;
								color: #7E7E7E;
								line-height: 1.06rem;
							}

							img {
								width: 1.06rem;
								height: 1.06rem;
								vertical-align: middle;
							}
						}


					}

					.list-bottom {
						display: -webkit-flex;
						justify-content: space-between;
						align-items: center;
						padding: 0.5rem 0.75rem;

						img {
							width: 5rem;
						}

						button {
							font-size: 0.69rem;
							font-family: PingFang-SC-Bold, PingFang-SC;
							font-weight: bold;
							color: rgba(255, 255, 255, 1);
							line-height: 1rem;
							background: rgba(29, 165, 254, 1);
							border-radius: 25px;
							padding: 0.38rem 0.75rem;
							border: 0;
							margin-left: 1.25rem;
						}
					}

				}

			}
		}

		.adviser {
			position: fixed;
			right: 0;
			top: 60%;
			width: 7.13rem;
			display: -webkit-flex;
			justify-content: space-between;
			padding: 0.4rem 0.6rem;
			box-sizing: border-box;
			border-top-left-radius: 50px;
			border-bottom-left-radius: 50px;
			background: linear-gradient(138deg, rgba(90, 229, 255, 1) 0%, rgba(12, 166, 248, 1) 100%);

			img {
				width: 2.2rem;
				height: 2.2rem;
			}

			span {
				display: block;
				font-size: 0.8rem;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
		}

		.programmeList-calculation {

			padding: 0.5rem 0;
			box-sizing: border-box;
			text-align: center;
			background: rgba(29, 165, 254, 1);

			span {
				font-size: 1.06rem;
				font-family: PingFang-SC-Bold, PingFang-SC;

				color: rgba(255, 255, 255, 1);
				line-height: 1.5rem;
			}
		}

		.caluMask {

			visibility: hidden;

			.mask {
				width: 100%;
				height: 100%;
				background-color: #000000;
				opacity: 0.4;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 99;
			}

			.calculation {
				position: fixed;
				left: 0;
				bottom: -500px;
				width: 100%;
				padding: 0.75rem;
				box-sizing: border-box;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				background-color: #fff;
				z-index: 99;
				transition: 0.4s;

				h3 {
					font-size: 1.06rem;
					font-family: PingFang-SC-Bold, PingFang-SC;
					font-weight: bold;
					color: rgba(0, 0, 0, 1);
					line-height: 1.5rem;

				}

				ul {
					li {
						box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.2);
						border-radius: 5px;
						border: 1px solid rgba(29, 165, 254, 1);
						padding: 0rem 1.5rem;
						margin: 1rem 0;
						box-sizing: border-box;

						.product-top {
							display: -webkit-flex;
							justify-content: space-between;
							padding: 1rem 0;
							font-size: 0.88rem;
							font-family: PingFang-SC-Medium, PingFang-SC;
							color: rgba(0, 0, 0, 1);
							box-sizing: border-box;

							.van-checkbox {
								overflow: auto;
							}
						}

						.product-list {
							display: none;

							.van-checkbox-group {
								.van-cell {
									.van-cell__value {
										display: -webkit-flex;
										justify-content: space-between;
									}

								}

								.van-hairline--top-bottom {
									padding-bottom: 0 !important;
								}

							}

						}

						.show {
							display: block;
						}

						/deep/.van-checkbox {
							.van-checkbox__icon {
								.van-icon {
									border-color: rgba(29, 165, 254, 1);
								}

							}

						}
					}
				}

				.btn {
					display: -webkit-flex;
					justify-content: space-between;
					padding: 1.5rem 0 0;

					b {
						font-size: 1.06rem;
						font-family: PingFang-SC-Bold, PingFang-SC;
						font-weight: bold;
						color: rgba(254, 160, 58, 1);
						line-height: 1.5rem;
					}

					span {
						display: inline-block;
						font-size: 0.88rem;
						font-family: PingFang-SC-Bold, PingFang-SC;
						font-weight: bold;
						color: rgba(255, 255, 255, 1);
						line-height: 1.25rem;
						padding: 0.38rem 2rem;
						background: rgba(29, 165, 254, 1);
						border-radius: 5px;
					}
				}
			}

			.calcu-two {
				bottom: 0;
			}
		}

		.show {
			visibility: visible;
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
