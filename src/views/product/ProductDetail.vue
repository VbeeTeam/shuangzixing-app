<template>
	<div class="selectDetail">
		<div v-wechat-title='detail.name'></div>
		<div class="selectDetail-bg">
		</div>
		<div class="selectDetail-section" v-if="detail.name">
			<div class="selectDetail-top">
				<h3>{{detail.name}}</h3>
				<p>
					<span v-for="(item,i) in detail.insureProductTags" :key = "i">{{item.name}} | </span>
				</p>
				<div class="top-label">
					<span>{{detail.type}}险</span>
					<span>{{detail.company.name}}</span>
				</div>
			</div>
			<div class="selectDetail-range">
				<van-tabs v-model="active" line-height="6px" color="#016DF8" title-active-color="#016DF8" title-inactive-color="#696969">
					<van-tab title="保障范围">
						<ul class="ul">
							<li v-for="(item,index3) in detail.insureProductItems" :key="index3">
								<b v-if="item.guardItem">{{item.itemName}}</b>
								<span v-if="item.guardItem">{{item.content}}</span>
							</li>
						</ul>
					</van-tab>
					<van-tab title="非保障范围">
						<ul class="ul ulNo">
							<li v-for="(item,index3) in detail.insureProductItems" :key="index3">
								<b v-if="!item.guardItem">{{item.itemName}}</b>
								<span v-if="!item.guardItem">{{item.content}}</span>
							</li>
						</ul>
					</van-tab>
					<van-tab title="投保规则">
						<ul class="ul">
							<li v-if="detail.insureAge">
								<b>投保年龄</b>
								<span>{{detail.insureAge}}</span>
							</li>
							<li v-if="detail.timeLimit">
								<b>保障期限</b>
								<span>{{detail.timeLimit}}</span>
							</li>
							<li v-if="detail.payMaxTimeLimit">
								<b>最长交费期限</b>
								<span>{{detail.payMaxTimeLimit}}</span>
							</li>
							<li v-if="detail.waitingPeriod">
								<b>等待期</b>
								<span>{{detail.waitingPeriod}}</span>
							</li>
							<li v-if="detail.forJob">
								<b>适用职业</b>
								<span>{{detail.forJob}}</span>
							</li>
							<li>
								<b>智能核保</b>
								<span v-if="detail.aiCheck">是</span>
								<span v-else>否</span>
								
							</li>
							<li v-if="detail.maxInsureAmount">
								<b>保额</b>
								<span>{{detail.maxInsureAmount}}万</span>
							</li>
							<li v-if="detail.exceptionClause">
								<b>免责条款</b>
								<span>{{detail.exceptionClause}}条</span>
							</li>
							<li v-if="detail.healthAdvice">
								<b>健康告知</b>
								<span>{{detail.healthAdvice}}条</span>
							</li>
							<li>
								<b>是否吸烟</b>
								<span v-if="detail.smoke">是</span>
								<span v-else>否</span>
							</li>
							<li>
								<b>收入要求</b>
								<span v-if="detail.incomeRequirement">有</span>
								<span v-else>无</span>
							</li>
						</ul>
					</van-tab>
					<!-- <van-tab title="病种详情">
						<ul class="ul specialDetail">
							<li>
								<b>轻症</b>
								<span>
									<i v-for="(item,index4) in speciesList.light" :key="index4">{{index4 + 1}}. {{item}}</i>
								</span>
								
							</li>
							<li>
								<b>重症</b>
								<span>
									<i v-for="(item,index5) in speciesList.heavy" :key="index5">{{index5 + 1}}. {{item}}</i>
								</span>
								
							</li>
						</ul>
					</van-tab> -->
				</van-tabs>
			</div>

			<div class="selectDetail-product">
				<div class="product-top">
					<img src="../../assets/img/icon_light@3x.png" alt="">
					<h3>产品特色</h3>
				</div>
				<div class="product-advantage">
					<div class="advantage-top">
						<img src="../../assets/img/icon_good@3x.png" alt="">
						<h4>产品亮点</h4>
					</div>
					<div class="advantage-section" v-for="(item,index4) in advantage" :key="index4">
						<span>{{index4+1}}.</span>
						<p>{{item.content}}</p>
					</div>
				</div>

				<div class="product-advantage shortcoming">
					<div class="advantage-top">
						<img src="../../assets/img/icon_notgood@3x.png" alt="">
						<h4>产品不足</h4>
					</div>
					<div class="advantage-section" v-for="(item,index5) in shortcoming" :key="index5">
						<span>{{index5+1}}.</span>
						<p>{{item.content}}</p>
					</div>
				</div>

				<div class="product-advantage careful">
					<div class="advantage-top">
						<img src="../../assets/img/icon_注意事项@3x.png" alt="">
						<h4>注意事项</h4>
					</div>
					<div class="advantage-section">
						<!-- <span>1.</span> -->
						<p>{{detail.notice}}</p>

					</div>
				</div>
				
				<div class="product-advantage careful">
					<div class="advantage-top">
						<img src="../../assets/img/icon_适合人群@3x.png" alt="">
						<h4>适合人群</h4>
					</div>
					<div class="advantage-section">
						<!-- <span>1.</span> -->
						<p>{{detail.applicablePopulation}}</p>
				
					</div>
				</div>
				
				<div class="product-advantage careful">
					<div class="advantage-top">
						<img src="../../assets/img/icon_综合评测@3x.png" alt="">
						<h4>综合评测</h4>
					</div>
					<div class="advantage-section">
						<!-- <span>1.</span> -->
						<p>{{detail.evaluating}}</p>
				
					</div>
				</div>

			</div>

			<div class="selectDetail-product">
				<div class="product-top">
					<img src="../../assets/img/产品条款@3x.png" alt="">
					<h3>文章条款</h3>
				</div>
				<div class="clause-section">
					<div v-for="(item,index1) in detail.clauseFiles" :key="index1">
						<a :href="item.url"><span>《{{item.fileName}}》</span></a>
					</div>
					
				</div>
			</div>
			
			<div class="selectDetail-product">
				<div class="product-top">
					<img src="../../assets/img/文章@3x.png" alt="">
					<h3>测评文章</h3>
				</div>
				<div class="clause-section">
					<div v-for="(item,index2) in detail.articleList" :key="index2">
						<a :href="item.coverUrl"><span>{{item.title}}</span></a>
					</div>
					
					
				</div>
			</div>
			
			<div class="selectDetail-product">
				<div class="product-top">
					<img src="../../assets/img/公司@3x.png" alt="">
					<h3>保险公司</h3>
				</div>
				<div class="company-section">
					<div class="company-top">
						<b>{{detail.company.name}}</b>
						<span>更多信息</span>
					</div>
					<!-- <div class="company-information">
						<span>注册时间：2006年</span><span>总部：重庆</span><br/>
						<span>理赔电话：977999</span>
					</div> -->
				</div>
			</div>
			
			<p class="p"> * 以上内容仅供参考，实际请以产品条款预约内容为主。如发现信息有误，请点击<b>这里</b>向我们反馈</p>
			
		</div>
		
		<div class="product-operation">
			<div class="operation-left">
				<div>
					<img src="../../assets/img/Tabbar-icon_留言-灰@3x.png" alt="">
					<span>留言</span>
				</div>
				<div>
					<img src="../../assets/img/Tabbar-icon_收藏-灰@3x.png" alt="">
					<span>收藏</span>
				</div>
				<div>
					<img src="../../assets/img/Tabbar-icon_分享-灰@3x.png" alt="">
					<span>分享</span>
				</div>
			</div>
			<div class="operation-right">
				<button>保费测算</button>
				<button @click="toHref()">立即投保</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		productDetail
	} from '@/api/api';
	
	import {
		getDiseaseSpecies
	} from '@/api/api';
	export default {
		name: "selectDetail",
		data() {
			return {
				active: 0,
				logins:null,
				detail:{},
				speciesList:{},
				advantage:[],
				shortcoming:[]
			}
		},
		methods: {
			onload() {
				
				productDetail("/api/insure/product/app/" + this.$route.query.id,{}).then(res => {
					
					this.detail = res
					
					this.advantage = res.insureProductFeatures.filter((item)=>{
						return item.merit
					})
					this.shortcoming = res.insureProductFeatures.filter((item)=>{
						return !item.merit
					})
					
					this.detail.articleList = JSON.parse(this.detail.articleList)
					this.detail.clauseFiles = JSON.parse(this.detail.clauseFiles)
					
				})
				
				getDiseaseSpecies("/api/insure/product/app/getDiseaseSpecies").then(res =>{
					this.speciesList = res
					
				})

				
			},
			//立即投保
			toHref(){
				if(this.detail.channel.name == "小雨伞"){
					window.location.href = this.detail.salesUrl + "&subchn=" + this.logins.userId
				}else if(this.detail.channel.name == "网金"){
					window.location.href = this.detail.salesUrl + "?userTrack=" + this.logins.userId
				}
			}
		},
		created() {
			
			this.onload()
			this.logins = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')) :
				null;
		}


	}
</script>

<style lang="scss" scoped>
	.selectDetail {
		background-color: #f7f7f7;

		.selectDetail-bg {
			height: 6.88rem;
			background:url(../../assets/img/矩形@3x.png) left top;
			background-size: cover;
		}

		.selectDetail-section {
			padding: 0.75rem 0.75rem 5rem;

			.selectDetail-top {
				position: relative;
				padding: 1.5rem 0.75rem;
				background-color: #fff;
				box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.2);
				border-radius: 10px;
				margin-top: -3rem;

				h3 {
					font-size: 1.06rem;
					font-weight: bold;
					color: rgba(0, 0, 0, 1);
					line-height: 1.5rem;
					margin-bottom: 0.5rem;
					letter-spacing: 1px;
				}

				p {
					font-size: 0.8rem;
					color: #666666;
					line-height: 1.25rem;
				}

				.top-label {
					position: absolute;
					right: 1.5rem;
					top: -0.8rem;

					span {
						display: inline-block;
						padding: 0.2rem 0.4rem;
						color: #fff;
						background-color: #00D6FB;
						margin-left: 0.75rem;
						font-size: 0.88rem;

						&:first-of-type {
							background-color: #FEDA4F;
						}
					}
				}
			}

			.selectDetail-range {
				margin: 1.88rem 0;
				padding: 0.75rem 0;
				box-sizing: border-box;
				background-color: #fff;
				box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.2);
				border-radius: 10px;
				
				/deep/.van-tabs {
					.van-tabs__wrap {
						border-bottom: 1px solid #E5F0FE;
					}
					.van-tabs__line{
						border-radius: 0 !important;
					}
					.van-hairline--top-bottom::after {
						border-width: 0;
					}
					.van-hairline--top-bottom{
						padding-bottom: 0 !important;
					}
					.van-tab{
						line-height: 30px;
					}
					
					.van-tab--active {
						font-size: 1rem;
						font-weight: 600;
					}

					.ul {
						padding: 0.75rem;
						
						li {
							margin-bottom: 0.1rem;
							
							b {
								display: table-cell;
								word-wrap: break-word;
								width: 6rem;
								text-align: center;
								padding: 0.75rem 0;
								box-sizing: border-box;
								background-color: #A1BBFF;
								font-size: 0.8rem;
								font-weight: normal;
								color: rgba(0, 0, 0, 1);
								vertical-align: middle;
							}

							span {
								width: 15rem;
								display: table-cell;
								word-wrap: break-word;
								padding: 0.75rem;
								box-sizing: border-box;
								font-size: 0.8rem;
								font-weight: normal;
								color: rgba(0, 0, 0, 1);
								vertical-align: middle;
							}

							&:nth-of-type(2n) span {
								background-color: #F7F9FF;
							}

							&:nth-of-type(2n+1) span{
								background-color: #EAEFFF;
							}

						}
					}
					
					.ulNo{
						li{
							b{
								width: 2rem;
							}
							span{
								width: 19rem;
							}
						}
					}
					.specialDetail{
						li{
							b{
								padding: 0;
								height: 8rem;
								line-height: 8rem;
								font-weight: normal;
							}
							span{
								height: 8rem;
								overflow-y: auto;
								font-weight: normal;
								i{
									display: block;
									font-style: normal;
									padding: 0.2rem;
									box-sizing: border-box;
								}
							}
							
						}
					}

				}



			}

			.selectDetail-product {
				margin: 1.88rem 0;
				background-color: #fff;
				box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.2);
				border-radius: 10px;
				padding-bottom: 1rem;

				.product-top {
					display: -webkit-flex;
					justify-content: center;
					align-items: center;
					padding: 0.75rem 0;
					border-bottom: 1px solid #E5F0FE;

					img {
						width: 1.63rem;
						height: 1.63rem;
					}

					h3 {
						font-size: 1rem;
						font-weight: bold;
						color: rgba(1, 109, 248, 1);
						margin-left: 0.5rem;
					}
				}

				.product-advantage {
					border: 0.06rem solid rgba(229, 240, 254, 1);
					padding: 0.63rem 0.75rem;
					box-sizing: border-box;
					border-radius: 5px;
					margin: 0.75rem;

					.advantage-top {
						display: -webkit-flex;
						align-items: center;

						img {
							width: 1.5rem;
						}

						h4 {
							font-size: 0.88rem;
							font-weight: bold;
							color: rgba(254, 160, 58, 1);
							margin-left: 0.25rem;
						}
					}

					.advantage-section {

						display: -webkit-flex;
						padding: 0.4rem;

						span {
							display: inline-block;
							margin-right: 0.5rem;
							vertical-align: middle;
							font-size: 0.88rem;
							font-weight: normal;
							color: rgba(254, 160, 58, 1);

						}

						p {
							display: inline-block;
							font-size: 0.75rem;
							font-weight: normal;
							color: rgba(0, 0, 0, 1);
							line-height: 1.06rem;
							white-space: pre-wrap;
						}

					}

				}

				.shortcoming {
					.advantage-top {
						h4 {
							color: #FF877C;
						}
					}

					.advantage-section {
						span {
							color: #FF877C;
						}
					}

				}
				
				.careful{
					.advantage-top {
						h4 {
							color: #016DF8;
						}
					}
					
					.advantage-section {
						span {
							color: #016DF8;
						}
					}
				}

				.clause-section{
					padding: 0.75rem;
					a{
						display: inline-block;
						padding-top: 0.5rem;
						font-size:0.88rem;
						font-weight:500;
						color:rgba(0,0,0,1);
						border-bottom: 1px solid #000;
					}
				}
				
				.company-section{
					padding: 0.75rem;
					.company-top{
						display: -webkit-flex;
						justify-content: space-between;
						b{
							font-size:0.88rem;
							font-weight:bold;
							color:rgba(0,0,0,1);
							line-height:1.25rem;
						}
						span{
							font-size:0.75rem;
							font-weight:bold;
							color:rgba(1,109,248,1);
							line-height:1.06rem;
							
						}
					}
					.company-information{
						span{
							display: inline-block;
							font-size:0.75rem;
							font-weight:500;
							color:rgba(0,0,0,1);
							line-height:1.06rem;
							margin-top: 0.75rem;
							&:nth-of-type(2){
								margin-left: 2.5rem;
							}
						}
					}
				}
				
			}

			.p{
				text-align: center;
				font-size:0.75rem;
				font-weight:500;
				color:rgba(1,109,248,1);
				line-height:1.06rem;
				padding: 0 1rem;
				b{
					border-bottom: 1px solid rgba(1,109,248,1);
				}
			}

		}
		
		.product-operation{
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			display: -webkit-flex;
			justify-content: space-between;
			background-color: #fff;
			z-index: 99;
			.operation-left{
				display: -webkit-flex;
				justify-content: space-around;
				align-items: center;
				padding: 0.2rem 0.4rem;
				flex: 1;
				div{
					text-align: center;
					img{
						width: 2rem;
						display: block;
					}
					span{
						display: inherit;
						font-size:0.63rem;
						font-weight:500;
						color:#999999;
						line-height:0.88rem;
					}
				}
			}
			.operation-right{
				
				button{
					height: 100%;
					padding: 0 0.8rem;
					font-size:1.06rem;
					font-weight:bold;
					color:rgba(255,255,255,1);
					line-height:1.5rem;
					border:0;
					outline: none;
					background-color: #D8D8D8;
					&:nth-of-type(2){
						background: #FEA03A;
					}
					
				}
			}
		}
	}
</style>
