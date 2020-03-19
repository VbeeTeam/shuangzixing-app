<template>
	<!-- 搜索产品 -->
	<div class="search">
		<div class="search-top">
			<div>
				<img src="../../assets/img/icon_search@3x.png" alt="">
				<input placeholder="请输入产品名称关键字" v-model="search.searchText" />
			</div>
			<van-button type="info" size="small" round @click="searchApi()">搜索</van-button>
		</div>
		<h4>自定义产品名称输入</h4>
		<van-field v-model="search.otherProduct" @keypress="clickOver($event)" placeholder="请输入自定义产品名称" label="其他产品" />
		<h4>常用保险</h4>
		<van-list>
			<van-cell v-for="(item,index4) in search.list" :key="index4" :title="item.name" @click="clickProduct(item)" />
		</van-list>
	</div>
</template>

<script>
	import { listByType } from "@/api/api"
	import { searchList } from "@/api/api"
	export default {
		name: "insuranceSearch",
		data() {
			return {
				forms:{},
				search: {
					searchShow: false,
					searchText: "",
					otherProduct: "",
					list: ""
				}
			}
		},
		methods: {
			//获取产品
			searchProduct() {
				listByType({
					type: this.$route.query.type,
					page: 0,
					size: 100
				}).then(res => {
					this.search.list = res
				})
			},
			// 搜索产品
			searchApi() {
				var obj = {
					name: this.search.searchText,
					type: this.$route.query.type,
					page: 0,
					size: 100
				}
				searchList(obj).then((res) => {
					this.search.list = res.content
				})
			},
			//选择产品
			clickProduct(item) {
				this.forms.productName = item.name
				this.forms.productId = item.id
				this.forms.insuredCompanyName = item.company.name
				this.forms.companyBoolean = false
				this.$store.commit('mutationsChangeInsurance', this.forms);
				
				this.$router.push({
					path:"/insuranceAdd",
					query:{
						search: true
					}
				})
			},
			//自定义产品
			clickOver(e) {
				var keycode = e.keyCode;
				if (keycode == '13' && this.search.otherProduct !== "") {
					e.preventDefault();
					this.forms.productName = this.search.otherProduct
					this.forms.insuredCompanyName = ""
					this.forms.companyBoolean = true
					this.$store.commit('mutationsChangeInsurance', this.forms);
					
					this.$router.push({
						path:"/insuranceAdd",
						query:{
							search: true
						}
					})
				}
			},
		},
		created() {
			this.forms =  this.$store.state.insuranceForms
			this.searchProduct()
		}

	}
</script>

<style lang="scss" scoped>
	.search {
		width: 100%;
		// height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-color: #f6f6f6;
		z-index: 9;

		.search-top {
			display: -webkit-flex;
			align-items: center;
			justify-content: space-between;
			padding: 1.25rem 0.75rem;
			background-color: #fff;

			div {
				flex: 1;
				height: 30px;
				display: -webkit-flex;
				align-items: center;
				padding: 0.086rem 0.4rem;
				border: 1px solid #E3E3E3;
				border-radius: 25px;
				box-sizing: border-box;
				background-color: #fff;
				margin-right: 0.75rem;

				img {
					width: 1.88rem;
					height: 1.88rem;
				}

				input {
					flex: 1;
					font-size: 1rem;
					font-family: PingFangSC-Regular, PingFang SC;
					color: #000;
					margin-left: 0.2rem;
					border: 0;
					background-color: transparent;
					outline: none;

				}

				input::-webkit-input-placeholder {
					color: #BFBFBF;
					font-size: 1rem;
				}
			}

			.van-button {
				line-height: 31px;
				box-shadow: 0rem 0.13rem 0.25rem 0rem rgba(29, 165, 254, 0.2);
			}
		}

		h4 {
			padding: 0.74rem;
			font-size: 1rem;
			font-family: PingFang-SC-Medium, PingFang-SC;
			font-weight: 500;
			color: rgba(153, 153, 153, 1);
			line-height: 1.38rem;
		}

		.van-field {
			font-size: 0.88rem;
		}

		.van-list {
			overflow-y: scroll;
			padding-bottom: 1rem;
			box-sizing: border-box;

			.van-cell {
				font-size: 0.88rem;
			}
		}

	}
</style>
