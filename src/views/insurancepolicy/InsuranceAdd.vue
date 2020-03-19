<template>
	<div class="add">
		<div v-wechat-title='$route.meta.title'></div>
		<!-- 主体 -->
		<div class="section">
			<h3>被保人信息</h3>
			<van-field v-model="forms.insuredPersonName" required placeholder="请填写被保险人姓名" label="被保人姓名"/>
			<van-cell title="被保人性别">
				<van-button size="small" round :plain="sexIndex != index1" type="info" v-for="(item,index1) in sexList" :key="index1"
				@click="sexClick(index1,item.value)">
				{{item.name}}
				</van-button>
			</van-cell>
			<van-cell title="出生日期" required :value="forms.birthDate" is-link @click="birthDate.dateShow = true"/>
			<h3>保障内容</h3>
			<van-cell title="保障类型" required :value="forms.insuredType" is-link @click="guarantee.guaranteeShow = true"/>
			<van-cell title="产品名称" required :value="forms.productName" is-link @click="searchProduct()"/>
			<van-cell v-if="!forms.companyBoolean" title="保险公司" :value="forms.insuredCompanyName"/>
			<van-field v-if="forms.companyBoolean" required v-model="forms.insuredCompanyName" placeholder="请填写保险公司名称" label="保险公司"/>
			<van-cell title="缴费方式" required :value="forms.payMethod" is-link @click="pay.payShow = true"/>
			<van-field v-model="forms.insuredAmount" required placeholder="请填写保额" label="保额(万)"/>
			<van-field v-model="forms.premium" required placeholder="请填写保费" label="保费(元)"/>
			<van-cell class="switch" title="是否缴费" required>
				<span>否</span><van-switch v-model="forms.isPay" size="20px" /><span class="span">是</span>
			</van-cell>
			<van-cell title="起保日期" required :value="forms.startDate" is-link @click="clickStartDate()"/>
			<van-cell title="保障期限" required :value="forms.insuredLimit" is-link @click="pay.termShow = true"/>
			<ul class="additional" v-if="forms.addInsured.length > 0">
				<li v-for="(item,index3) in forms.addInsured" :key="index3">
					<div class="additional-top">
						<h3>附加险</h3>
						<span @click="clearItional(index3)">删除</span>
						<!-- <img @click="clearItional(index3)" src="../../assets/img/icon_clear@3x.png" alt=""> -->
					</div>
					<div>
						<van-cell title="产品名称" :value="item.insureType"/>
						<van-cell title="保额(万)" :value="item.amount"/>
					</div>
				</li>
			</ul>
			
			<h3>附加险</h3>
			<van-cell class="add" title="附加险" value="请添加附加险" @click="additional.additionalShow = true">
				<!-- <img src="../../assets/img/icon_addin@3x.png" alt=""> -->
				<span>添加</span>
			</van-cell>
			<h3>上传保单照片</h3>
			<div class="uploader">
				<p>请在合同页中找到保险单页。保险单页内含有合同信息、个人信息、保险信息等。请确保图片清晰，能看清内容细节</p>
				<van-uploader :after-read="afterRead">
					<img v-if="forms.insurancePhotoUrl == ''" src="../../assets/img/icon_添加照片@3x.png" alt="">
					<img v-else :src="forms.insurancePhotoUrl" alt="">
				</van-uploader>
			</div>
			<div class="btn" @click="add()">完成</div>
		</div>

		<!-- 出生日期,起保日期 -->
		<van-action-sheet v-model="birthDate.dateShow" :title="birthDate.title">
			<van-datetime-picker v-model="birthDate.currentDate" type="date"
			:min-date="birthDate.minDate" :max-date="birthDate.maxDate"
			@cancel="birthDate.dateShow = false" @confirm="onConfirmbirthDate"/>
		</van-action-sheet>
		<!-- 保障类型 -->
		<van-action-sheet v-model="guarantee.guaranteeShow" title="保障类型">
			<van-picker show-toolbar title="" :columns="guarantee.columns" :default-index="2"
			@cancel="guarantee.guaranteeShow = false" @confirm="onConfirmtype"/>
		</van-action-sheet>
		<!-- 缴费方式 -->
		<van-action-sheet v-model="pay.payShow" title="缴费方式">
			<van-picker show-toolbar title="" :columns="pay.columns" :default-index="1"
			@cancel="pay.payShow = false" @confirm="onConfirmPay"/>
		</van-action-sheet>
		<!-- 保障期限 -->
		<van-action-sheet v-model="pay.termShow" title="保障期限">
			<van-picker show-toolbar title="" :columns="pay.termColumns" 
			@cancel="pay.termShow = false" @confirm="onConfirmTerm"/>
		</van-action-sheet>
		<!-- 附加险 -->
		<van-action-sheet v-model="additional.additionalShow" title="附加险">
			<van-cell-group>
				<van-field @blur="inputBlur(1)" @input="inputChange()" required v-model="additional.name" 
				label="附加险名称" placeholder="请输入附加险名称" :error-message="additional.nameErr"
				clearable/>
				<van-field @blur="inputBlur(2)" @input="inputChange()" required v-model="additional.money" center clearable 
				label="保额(万)" placeholder="请填写保额" :error-message="additional.moneyErr"
				use-button-slot>
				</van-field>
			</van-cell-group>
			<van-button type="info" color="#1DA5FE" @click="toCtrls()" :disabled="additional.additionalBtn" round>确定保存</van-button>
		</van-action-sheet>
	</div>
</template>

<script>
	
	import { generaList } from "@/api/api"
	import { productType } from "@/api/api"
	
	import { insurancePolicyDetail } from "@/api/api"
	import { insurancePolicyAdd } from "@/api/api"
	import { insurancePolicyChange } from "@/api/api"
	import { companyList } from "@/api/api"
	import { upLoader } from "@/api/api"
	import { post } from '@/api/http'
	export default {
		name:"add",
		data() {
			return {
				sexIndex: 0,
				sexList :[
					{
						name:"男",
						value:1
					},
					{
						name:"女",
						value:0
					},
				],
				forms:{
					birthDate:"请选择出生日期",
					insuredPersonName:"",
					insuredPersonSex:1,
					insuredType:"请选择保障类型",
					productName:"请选择产品名称",
					productId:null,
					insuredCompanyName:"请选择保险公司",
					payMethod:"请选择缴费方式",
					insuredAmount:"",
					premium:"",
					isPay:false,
					startDate:"请选择起保日期",
					insuredLimit:"请选择保障期限",
					addInsured:[],
					insurancePhotoUrl:"",
					userId:"",
					companyBoolean:false
				},
				birthDate:{
					dateShow: false,
					minDate: new Date(1900, 0, 1),
					maxDate: new Date(),
					currentDate: new Date(),
					title:"出生日期"
				},
				guarantee:{
					guaranteeShow: false,
					columns:[]
				},
				pay:{
					payShow: false,
					columns:[],
					termShow: false,
					termColumns:[
						// 第一列
						{
							values: [],
							defaultIndex: 2
						},
						// 第二列
						{
							values: ['年', '至~岁', '终身'],
							defaultIndex: 0
						}
					]
				},
				additional:{
					additionalShow: false,
					name:"",
					nameErr:"",
					money:"",
					moneyErr:"",
					additionalBtn: true
				},
				
			}
		},
		methods:{
			//base64转二进制
			dataURLtoBlob(dataurl) {
				var arr = dataurl.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new Blob([u8arr], {
					type: mime
				});
			
			},
			//获取列表
			getList(){
				productType().then(res=>{
					this.guarantee.columns = res
				})
				generaList({sign:7}).then(res => {
					this.pay.columns = res
				})
			},
			//查询单个保单
			getDetail(){
				insurancePolicyDetail("/api/insurancePolicy/appGetOne/" + this.$route.query.id).then(res=>{
					this.sexIndex = !res.insuredPersonSex
					this.forms = res
				})
			},
			//选择性别
			sexClick(index,value){
				this.sexIndex = index
				this.forms.insuredPersonSex = value
			},
			//附加险输入时
			inputChange(){
				this.additional.name == "" || this.additional.money == "" ? this.additional.additionalBtn = true : this.additional.additionalBtn = false
				
			},
			//附加险输入后
			inputBlur(a){
				if(a == 1){
					this.additional.name == "" ? this.additional.nameErr = "请输入附加险名称" : this.additional.nameErr = "";
				}else{
					this.additional.money == "" ? this.additional.moneyErr = "请填写保额" : this.additional.moneyErr = ""
				}
			},
			//保存附加险
			toCtrls(){
				var obj = {
					insureType:this.additional.name,
					amount:this.additional.money
				}
				this.forms.addInsured.unshift(obj)
				this.additional.additionalShow = false
				this.additional.name = ""
				this.additional.money = ""
				this.additional.additionalBtn = true
			},
			// 删除附加险
			clearItional(index){
				this.forms.addInsured.splice(index,1)
			},
			//上传图片
			afterRead(file) {
				let img = this.dataURLtoBlob(file.content)
				// 创建FormData对象
				let param = new FormData()
				// 将得到的文件流添加到FormData对象
				param.append('file', img)
				post("/api/oss/resources?configId=4",param).then(res => {
					
					this.forms.insurancePhotoUrl = res.data[0]
				})
			},
			//选择出生日期
			onConfirmbirthDate(value,a){
				var now = new Date(value);
				var year = now.getFullYear();       //年
				var month = now.getMonth() + 1;     //月
				var day = now.getDate();            //日
						//秒
				var clock = year + "-";
				if(month < 10)
					clock += "0";
				clock += month + "-";
				if(day < 10)
					clock += "0";
				clock += day ;
				
				if(this.startBoolean){
					this.forms.startDate = clock
					this.startBoolean = false
				}else{
					this.forms.birthDate = clock
				}
				this.birthDate.dateShow = false
				this.birthDate.title = "出生日期"
			},
			//选择起始日期
			clickStartDate(){
				this.birthDate.title = "起保日期"
				this.birthDate.dateShow = true
				this.startBoolean = true
			},
			//选择保障类型
			onConfirmtype(value){
				this.forms.insuredType = value
				this.guarantee.guaranteeShow = false
			},
			//选择缴费方式
			onConfirmPay(value){
				this.forms.payMethod = value.text
				this.pay.payShow = false
			},
			//选择保障期限
			onConfirmTerm(value){
				
				if(value[1] == "终身"){
					this.forms.insuredLimit = value[1]
				}else{
					this.forms.insuredLimit = value[0] + value[1]
				}
				this.pay.termShow = false
			},
			//选择产品
			searchProduct(){
				if(this.forms.insuredType == "请选择保障类型"){
					this.$toast("请先选择保障类型")
				}else{
					//保存已填写信息
					this.$store.commit('mutationsChangeInsurance', this.forms);
					
					this.$router.push({
						path:"/insuranceSearch",
						query:{
							type: this.forms.insuredType
						}
					})
					
				}
				
			},
			//send提示
			sendToast(){
				if(this.forms.insuredPersonName == ""){
					this.$toast("请填写被保险人姓名")
				}else if(this.forms.birthDate == "请选择出生日期"){
					this.$toast("请选择出生日期")
				}else if(this.forms.insuredType == "请选择保障类型"){
					this.$toast("请选择保障类型")
				}else if(this.forms.productName == "请选择产品名称"){
					this.$toast("请选择产品名称")
				}else if(this.forms.companyBoolean && this.forms.insuredCompanyName == ""){
					this.$toast("请填写公司名称")
				}else if(this.forms.payMethod == "请选择缴费方式"){
					this.$toast("请选择缴费方式")
				}else if(this.forms.insuredAmount == ""){
					this.$toast("请填写保额")
				}else if(this.forms.premium == ""){
					this.$toast("请填写保费")
				}else if(this.forms.startDate == "请选择起保日期"){
					this.$toast("请选择起保日期")
				}else if(this.forms.insuredLimit == "请选择保障期限"){
					this.$toast("请选择保障期限")
				}else{
					return true
				}
				
			},
			//新增，修改保单
			add(){
				const boo = this.sendToast()
				if(boo){
					if(this.$route.query.id){
						insurancePolicyChange(this.forms).then(res =>{
							this.$toast("修改成功")
							this.$router.push({path:"/insurancedetail",query:{id:this.$route.query.id}})
						})
					}else{
						insurancePolicyAdd(this.forms).then(res =>{
							this.$toast("添加成功")
							this.$store.commit('mutationsChangeInsurance', {});
							this.$router.push({path:"/insurancepolicy"})
						})
					}
				}
			}
		},
		created(){
			this.forms.userId = JSON.parse(sessionStorage.getItem('userInfo')) ?
			JSON.parse(sessionStorage.getItem('userInfo')).userId : ""
			for(var i=0; i<100; i++){
				this.pay.termColumns[0].values.push(i+1)
			}
			
			this.getList()
			//获取修改保单信息
			if(this.$route.query.id){
				this.getDetail()
			}
			//获取搜索产品信息
			if(this.$route.query.search){
				this.forms = this.$store.state.insuranceForms
			}
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.add{
		background-color: #f6f6f6;
		
		.section{
			h3{
				font-size:1.06rem;
				font-family:PingFang-SC-Bold,PingFang-SC;
				font-weight:bold;
				color:rgba(0,0,0,1);
				line-height:1.5rem;
				padding: 0.75rem;
			}
			/deep/.van-cell{
				
				.van-cell__title{
					flex: inherit;
					width: 6.5rem;
				}
				.van-field__label{
					width: 6.5rem;
				}
				.van-field__value{
					.van-field__control{
						color: #969799;
					}
				}
				.van-cell__value{
					text-align: left;
				}
				.van-button{
					// height:1.75rem;
					// line-height: 1.7rem;
					margin-right: 0.7rem;
					box-sizing: border-box;
				}
				
			}
			.additional{
				.additional-top{
					display: -webkit-flex;
					justify-content: space-between;
					align-items: center;
					padding-right: 1rem;
					h3{
						padding-bottom: 0.75rem;
					}
					// img{
					// 	width: 2.75rem;
					// 	height: 2.75rem;
					// }
					span{
						font-size:0.9rem;
						font-family:PingFang-SC-Medium,PingFang-SC;
						font-weight:500;
						color:rgba(255,99,29,1);
						line-height:1.38rem;
					}
				}
			}
			.switch{
				.van-switch{
					vertical-align: middle;
					margin: 0 0.75rem;
				}
				.span{
					&:last-of-type{
						color: #016DF8;
					}
				}
			}
			.add{
				background-color: #fff;
				padding: 0 16px;
				.van-cell__title{
					padding: 10px 0;
				}
				.van-cell__value{
					display: -webkit-flex;
					justify-content: flex-end;
					align-items: center;
					padding: 0;
					// img{
					// 	display: block;
					// 	width: 2.75rem;
					// 	height: 2.75rem;
					// }
					span{
						font-size:0.9rem;
						font-family:PingFang-SC-Medium,PingFang-SC;
						font-weight:500;
						color:rgba(254,160,58,1);
						line-height:1.38rem;
					}
				}
			}
			.uploader{
				padding: 0.75rem;
				background-color: #fff;
				text-align: center;
				p{
					text-align: left;
					font-size:1rem;
					font-family:PingFang-SC-Medium,PingFang-SC;
					font-weight:500;
					color:rgba(153,153,153,1);
					line-height:1.38rem;
				}
				img{
					width: 5rem;
					height: 5rem;
					margin-top: 1.25rem;
				}
			}
			.btn{
				text-align: center;
				font-size:1.06rem;
				font-family:PingFang-SC-Bold,PingFang-SC;
				font-weight:bold;
				color:rgba(255,255,255,1);
				line-height:1.5rem;
				padding: 0.75rem;
				background-color: #1DA5FE;
			}
		}
		
		
		
		/deep/.van-action-sheet{
			.van-hairline--top-bottom{
				background: #E9F5FE !important;
			}
			.van-picker{
				.van-picker__toolbar{
					.van-picker__cancel{
						color:#999 !important;
					}
				}
			}
			.van-cell-group{
				background-color: #fff !important;
				.van-cell:not(:last-child)::after{
					left: 0;
				}
			}
			
			.van-button{
				display: block;
				width: 7.5rem;
				margin: 0.8rem auto;
			}
			
		}
			
	}
</style>
