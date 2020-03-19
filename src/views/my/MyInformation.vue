<template>
	<div class="information">
		<div v-wechat-title='$route.meta.title'></div>

		<div class="information-section">
			<ul>
				<li>
					<h3>我的手机号</h3>
					<div class="liBottom" v-if="phone == ''">
						<span>暂未绑定手机号</span>
						<button @click="toPage('/my-phone')">立即绑定</button>
					</div>
					<div class="liBottom" v-else>
						<span>{{phone}}</span>
						<button style="padding-left: 0.8rem;" @click="toPage('/my-phone')">已绑定<img src="../../assets/img/icon-close2@3x.png" alt=""></button>
					</div>
				</li>
				<!-- <li>
					<h3>我的邮箱</h3>
					<div class="liBottom">
						<span>暂未绑定邮箱</span>
						<button @click="toPage('')">立即绑定</button>
					</div>
					<div class="liBottom">
						<span>155****96281520</span>
						<button>已绑定</button>
					</div>
				</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "my-information",
		data() {
			return {
				phone:"",
				logins:null
			}
		},
		methods: {
			//加密手机号
			phoneReg(tel) {
				var reg = /^(\d{3})\d{4}(\d{4})$/;
				return tel = tel.replace(reg, "$1****$2");
			},
			//跳转绑定手机号
			toPage(url) {
				this.$router.push({
					path: url
				})
			}
		},
		created() {
			this.logins = JSON.parse(sessionStorage.getItem('userInfo')) ? 
			JSON.parse(sessionStorage.getItem('userInfo')) : {}
		},
		mounted(){
			if(this.logins.phone){
				this.phone = this.phoneReg(this.logins.phone)//加密
			}else{
				this.phone = ""
			}
		}
	}
</script>

<style lang="scss" scoped>
	.information {
		padding: 2.5rem 0.75rem;
		background: #F6F6F6;
		.information-section {
			ul {

				li {
					box-shadow: 0rem 0.63rem 1.88rem -0.75rem rgba(0, 0, 0, 0.2);
					border-radius: 0.5rem;
					padding-right: 0.75rem;
					padding-bottom: 1.25rem;
					margin-bottom: 2.5rem;
					background: url(../../assets/img/pic-telphone@3x.png) no-repeat left top #fff;
					background-size: 15rem;

					&:nth-of-type(2) {
						background: url(../../assets/img/编组3@3x.png) no-repeat left top;
						background-size: 8rem;
					}

					h3 {
						font-size: 1.25rem;
						font-family: PingFang-SC-Bold, PingFang-SC;
						font-weight: bold;
						color: rgba(0, 0, 0, 1);
						line-height: 1.75rem;
						padding: 1.25rem 0.75rem 1.38rem;
					}

					.liBottom {
						display: -webkit-flex;
						justify-content: space-between;

						span {
							font-size: 0.88rem;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
							color: rgba(153, 153, 153, 1);
							line-height: 1.25rem;
							padding-left: 0.75rem;
						}

						button {
							display: inline-block;
							width: 7rem;
							height: 2.5rem;
							font-size: 0.88rem;
							font-family: PingFang-SC-Bold, PingFang-SC;
							font-weight: bold;
							color: rgba(255, 255, 255, 1);
							border: none;
							outline: none;
							background: #016DF8;
							border-radius: 1.25rem;
							padding-top: 0.1rem;
							img {
								width: 1.5rem;
								vertical-align: middle;
								margin-bottom: 0.15rem;
							}
						}
					}
				}
			}

		}
	}
</style>
