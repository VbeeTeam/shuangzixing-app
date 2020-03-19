<template>
	<div class="personal">
		<div v-wechat-title='$route.meta.title'></div>

		<div class="section-personal">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了"
			@load="listLoad">
				<van-cell v-for="(item,idnex1) in personalList" :key="idnex1">
					<p>{{item.message.content}}</p>
					<div class="liBottom">
						<span>{{item.message.publishTime | formatDate}}</span>
						<a :href="item.message.url">立即前往</a>
					</div>
				</van-cell>
			</van-list>
		</div>
	</div>
</template>

<script>
	import { messageRecord } from "@/api/api"
	import { formatDate } from "@/assets/js/formDate"
	export default {
		name: "my-personal",
		data() {
			return {
				personalList: [],
				loading: false,
				finished: false,
				page: 0,
				totalElements: null,
				logins:null
			}
		},
		methods: {
			//获取消息列表
			getList(){
				var obj = {
					type: 1,
					userId: this.logins.userId,
					page:this.page,
					size:10,
					sort:"updateTime,desc"
				}
				messageRecord(obj).then(res => {
					if(res.totalElements == 0){
						this.loading = false
						this.finished = true
					}else{
						const oldList = this.personalList
						this.personalList = oldList.concat(res.content)
						this.totalElements = res.totalElements
					}
					
				})
			},
			//上拉加载
			listLoad(){
				// 异步更新数据
				setTimeout(() => {
					this.loading = false
					// 数据全部加载完成
					if (this.personalList.length >= this.totalElements) {
						this.finished = true;
					} else {
						this.page = this.page + 1;
						this.getList()
					}
				}, 500);
			}
		},
		filters: {
			formatDate,
		},
		created() {
			this.logins = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')) :
				null;
			this.getList()
		}

	}
</script>

<style lang="scss" scoped>
	.personal {
		padding: 0.63rem 0;
		background: #F6F6F6;
		.section-personal{
			.van-list{
				.van-cell{
					padding: 0.75rem;
					background-color: #fff;
					margin-bottom: 0.63rem;
					p{
						font-size:0.88rem;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(0,0,0,1);
						line-height:1.25rem;
						margin-bottom: 0.75rem;
						word-break: break-all;
					}
					.liBottom{
						display: -webkit-flex;
						justify-content: space-between;
						span{
							font-size:0.88rem;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:rgba(153,153,153,1);
							line-height:1.25rem;
						}
						a{
							font-size:0.88rem;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							line-height:1.25rem;
							color:rgba(255,99,29,1);
						}
					}
					
				}
			}
		}
	}
</style>
