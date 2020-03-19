<template>
	<div class="phone">
		<div v-wechat-title='$route.meta.title'></div>
		
		<!-- 绑定手机号 -->
		<div class="phone-section" v-show="!phoneBoolean">
			<div class="toast" v-if="!forms.btnShow">
				<van-button slot="button" disabled round type="warning">验证码已发送至手机</van-button>
			</div>
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
			<div class="btn">
				<van-button @click="submit()" slot="button" :disabled="forms.submit" round type="info" color="#016DF8">验证并绑定</van-button>
			</div>
		</div>
		
		<!-- 已绑定手机号 -->
		<div class="phone-section" v-show="phoneBoolean">
			<div class="section-ok">
				<img src="../../assets/img/pic-iphone@3x.png" alt="">
				<h3>当前手机号 {{phoneOk}}</h3>
				<p>已绑定手机号，可用于手机账号的登录方式</p>
				<van-button @click="btnChange()" slot="button" round type="info" color="#016DF8">更换手机号</van-button>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { smsSend } from "@/api/api"
	import { bindPhone } from "@/api/api"
	
	export default {
		name: "my-phone",
		data() {
			return {
				phoneBoolean:false,
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
				phoneOk:"",
				logins:null,
			}
		},
		methods: {
			//手机号加密
			phoneReg(tel) {
				var reg = /^(\d{3})\d{4}(\d{4})$/;
				return tel = tel.replace(reg, "$1****$2");
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
			//绑定
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
						this.phoneBoolean = true
						this.logins.phone = res.phone
						this.phoneOk = this.phoneReg(res.phone)
						sessionStorage.setItem('userInfo', JSON.stringify(this.logins));
					}
					
				})
				
			},
			//更换手机号
			btnChange(){
				this.forms.phone =""
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
			if(this.logins.phone){
				this.phoneOk = this.phoneReg(this.logins.phone)//加密
				this.phoneBoolean = true
			}else{
				this.phoneOk = ""
				this.phoneBoolean = false
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.phone {
		background-color: #F7F7F7;
		padding-top: 4rem;
		.phone-section{
			.van-button{
				padding-top: 0.06rem;
			}
			.toast{
				width: 100%;
				position: absolute;
				left: 0;
				top: 0;
				text-align: center;
			}
			/deep/.van-cell-group{
				.van-cell{
					background-color: #f7f7f7;
					border-top:1px solid #DDDDDD;
					border-bottom:1px solid #DDDDDD;
					.van-field__control{
						color:#016DF8;
					}
					&:nth-of-type(2){
						border-top: none;
					}
				}
			}
			.van-hairline--top-bottom{
				padding: 0 !important;
			}
			
			.btn{
				text-align: center;
				margin-top: 5rem;
				.van-button{
					width: 12rem;
					line-height: inherit;
				}
			}
		
			.section-ok{
				text-align: center;
				img{
					width: 5.25rem;
				}
				h3{
					font-size:1.25rem;
					font-family:PingFang-SC-Bold,PingFang-SC;
					font-weight:bold;
					color:rgba(0,0,0,1);
					line-height:1.75rem;
					margin: 5rem 0 1rem;
				}
				p{
					font-size:0.88rem;
					font-family:PingFang-SC-Medium,PingFang-SC;
					font-weight:500;
					color:rgba(0,0,0,1);
					line-height:1.25rem;
					margin-bottom: 2.5rem;
				}
				.van-button{
					width: 12rem;
					line-height: inherit;
				}
			}
		}
	}
</style>
