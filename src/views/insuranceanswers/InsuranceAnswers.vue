<template>
	<div class="insuranceAnswers">
		<div v-wechat-title='$route.meta.title'></div>
		<div class="select-tabbar">
			<van-tabs v-model="activeName1" color="#1DA5FE" line-width="40px" line-height="5px" title-inactive-color="#989898"
			type="line" @click="onClick">
				<van-tab v-for="(item,i) in typeList" :key="i" :title="item.name" :name="item.id">
					<div class="search" @click="toSearch()">
						<img src="../../assets/img/icon_search@3x.png" alt="">
						<span>搜索你想要的文章、产品、问答</span>
					</div>

					<van-collapse v-model="activeName2" accordion>
						<van-collapse-item v-for="(item,index1) in tqaList" :key="index1" 
						:title="item.questions" :name="item.questions" >
							{{item.answers}}
						</van-collapse-item>
						
					</van-collapse>

				</van-tab>

			</van-tabs>
		</div>

		


	</div>
</template>

<script>
	import { apiCatagory } from "@/api/api" 
	import { tQa } from "@/api/api" 
	
	export default {
		name: "insuranceAnswers",
		data() {
			return {
				typeList: [],
				tqaList:[],
				activeName1: '',
				activeName2: '1'
			}
		},
		methods:{
			onload(){
				apiCatagory("/api/category/2").then((res)=>{
					
					this.typeList = res
					this.activeName1 = res[0].id
					
					this.getList()
				})
				
				
			},
			getList(){
				tQa("/api/tQa/app/"+this.activeName1).then((res)=>{
					
					this.tqaList = res
				})
			},
			onClick(){
				
				this.getList()
			},
			toSearch(){
				this.$router.push({path:'/search',query:{type:1}})
			}
		},
		created(){
			this.onload()
		}
	}
</script>

<style lang="scss">
	.insuranceAnswers {
		background-color: #fff;
		.select-tabbar {
			padding: 0.75rem;
			background-color: #fff;
			box-sizing: border-box;
			.van-tabs {
				
				.van-hairline--top-bottom::after {
					border-width: 0;
				}
				
				.van-tabs__nav{
					justify-content: space-between;
					
					.van-tab {
						flex: inherit;
						height: 1.8rem;
						line-height: 2rem;
						padding: 0 0.3rem;
					}
					.van-tab--active {
						font-weight: bold;
					}
					.van-tabs__line {
					
						border-radius: 0 !important;
					}
					
				}
			
			}

			.search {
				display: -webkit-flex;
				align-items: center;
				padding:0.3rem 0.2rem;
				background: #f7f7f7;
				margin-bottom: 0.5rem;
				box-sizing: border-box;
				img {
					width: 1.6rem;
					height: 1.6rem;
					vertical-align: middle;
					margin-right: 0.2rem;
				}

				span {
					font-size: 0.88rem;
					color: #a0a0a0;
					padding-top: 0.1rem;
				}

			}

		}
	}
</style>
