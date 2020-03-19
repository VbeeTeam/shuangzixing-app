<template>
	<div class="mailbox">
		<div v-wechat-title='$route.meta.title'></div>

		<!-- 绑定手机号 -->
		<div class="phone-section" v-show="!phoneBoolean">
			<div class="toast" v-if="!forms.btnShow">
				<van-button slot="button" disabled round type="warning">验证码已发送至邮箱</van-button>
			</div>
			<van-cell-group>
				<van-field @blur="inputBlur()" @input="inputChange(1)" v-model="forms.phone" label="邮箱账号" placeholder="请输入邮箱账号"
				:error-message="forms.phoneErr" clearable />
				<van-field @input="inputChange(2)" v-model="forms.code" center clearable label="验证码" placeholder="请输入邮箱验证码"
				use-button-slot>
					<van-button v-if="forms.btnShow" @click="toSend()" slot="button" :disabled="forms.btnBoolean" size="small" round
					type="info" :color="forms.color">获取</van-button>
					<van-button v-else slot="button" disabled size="small" round type="info" color="#999">重新获取（{{this.forms.time}}）</van-button>
				</van-field>
			</van-cell-group>
			<div class="btn">
				<van-button @click="submit()" slot="button" :disabled="forms.submit" round type="info">验证并绑定</van-button>
			</div>
		</div>

		<!-- 已绑定手机号 -->
		<div class="phone-section" v-show="phoneBoolean">
			<div class="section-ok">
				<img src="../../assets/img/pic-iphone@3x.png" alt="">
				<h3>当前邮箱 {{phoneOk}}</h3>
				<p>已绑定邮箱</p>
				<van-button @click="btnChange()" slot="button" round type="info">更换邮箱账号</van-button>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		smsSend
	} from "@/api/api"
	import {
		bindPhone
	} from "@/api/api"

	export default {
		name: "my-mailbox",
		data() {
			return {
				phoneBoolean: false,
				forms: {
					border: true,
					btnText: "获取",
					color: "#999999",
					phone: "",
					phoneErr: "",
					code: "",
					btnShow: true,
					btnBoolean: true,
					submit: true,
					time: 10,
					myTime: null,
				},
				phoneOk: "",
				logins: null,
			}
		},
		methods: {

			//输入时
			inputChange(a) {
				this.forms.phone == "" || this.forms.code == "" ? this.forms.submit = true : this.forms.submit = false
				if (a == 1) {
					if (this.forms.phone != "") {
						this.forms.btnBoolean = false
						this.forms.color = "#1DA5FE"
						this.forms.phoneErr = ""
					} else {
						this.forms.btnBoolean = true
						this.forms.color = "#999"
					}
				}

			},
			//输入后
			inputBlur() {
				var myreg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				myreg.test(this.forms.phone) == false ? this.forms.phoneErr = "请输入正确邮箱账号" : this.forms.phoneErr =
					""
			},
			//发送验证码
			toSend() {
				this.forms.time = 10
				var myreg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if (myreg.test(this.forms.phone)) {
					smsSend({
						phone: this.forms.phone
					}).then(res => {
						this.forms.btnShow = false
						this.forms.myTime = setInterval(() => {
							this.forms.time--

							if (this.forms.time == 0) {
								clearInterval(this.forms.myTime)
								this.forms.btnShow = true
							}
						}, 1000)
					})
				}

			},
			//绑定
			submit() {
				var obj = {
					phone: this.forms.phone,
					verifyCode: this.forms.code,
					userId: this.logins.userId
				}
				bindPhone(obj).then(res => {
					if (res.status) {
						this.$toast(res.message)
					} else {
						this.phoneBoolean = true
						this.phoneOk = res.phone
					}

				})

			},
			//更换手机号
			btnChange() {
				this.forms.phone = ""
				this.forms.code = ""
				this.forms.btnBoolean = true
				this.phoneBoolean = false
			}

		},
		created() {
			this.logins = JSON.parse(sessionStorage.getItem('userInfo')) ?
				JSON.parse(sessionStorage.getItem('userInfo')) : {}

		},
		mounted() {
			if (this.logins.phone) {
				this.phoneOk = this.logins.phone
				this.phoneBoolean = true
			} else {
				this.phoneOk = "15596281520"
				this.phoneBoolean = false
			}
		}

	}
</script>

<style lang="scss" scoped>
	.mailbox {
		background-color: #F7F7F7;
		padding-top: 4rem;
		.van-button{
			padding-top: 0.06rem;
		}
		.phone-section {
			.toast {
				width: 100%;
				position: absolute;
				left: 0;
				top: 0;
				text-align: center;
			}

			/deep/.van-cell-group {
				.van-cell {
					background-color: #f7f7f7;
					border-top: 1px solid #DDDDDD;
					border-bottom: 1px solid #DDDDDD;

					.van-field__control {
						color: #016DF8;
					}

					&:nth-of-type(2) {
						border-top: none;
					}
				}
			}

			.van-hairline--top-bottom {
				padding: 0 !important;
			}

			.btn {
				text-align: center;
				margin-top: 5rem;

				.van-button {
					width: 12rem;
				}
			}

			.section-ok {
				text-align: center;

				img {
					width: 5.25rem;
				}

				h3 {
					font-size: 1.25rem;
					font-family: PingFang-SC-Bold, PingFang-SC;
					font-weight: bold;
					color: rgba(0, 0, 0, 1);
					line-height: 1.75rem;
					margin: 5rem 0 1rem;
				}

				p {
					font-size: 0.88rem;
					font-family: PingFang-SC-Medium, PingFang-SC;
					font-weight: 500;
					color: rgba(0, 0, 0, 1);
					line-height: 1.25rem;
					margin-bottom: 2.5rem;
				}

				.van-button {
					width: 12rem;
				}
			}
		}
	}
</style>
