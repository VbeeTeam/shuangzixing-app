<template>
	<div class="system">
		<div v-wechat-title='$route.meta.title'></div>

		<div class="section-system">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="listLoad()">
				<van-cell v-for="(item,idnex1) in systemList" :key="idnex1">
					<h6>{{item.message.publishTime | formatDate}}</h6>
					<p>{{item.message.content}}<a :href="item.message.url">〈直达链接〉</a></p>
				</van-cell>
			</van-list>

		</div>
	</div>
</template>

<script>
	import {
		messageRecord
	} from '@/api/api'
	import { formatDate } from "@/assets/js/formDate"
	export default {
		name: "my-system",
		data() {
			return {
				systemList: [],
				loading: false,
				finished: false,
				page: 0,
				logins:null
			}
		},
		methods: {
			getList() {
				var obj = {
					type: 0,
					userId: this.logins.userId,
					page: this.page,
					size: 10,
					sort:"updateTime,desc"
				}
				messageRecord(obj).then(res => {
					if (res.totalElements == 0) {
						this.loading = false
						this.finished = true
					} else {
						const oldList = this.systemList
						this.systemList = oldList.concat(res.content)
						this.totalElements = res.totalElements
					}

				})
			},
			//上拉加载
			listLoad() {
				// 异步更新数据
				setTimeout(() => {
					this.loading = false
					// 数据全部加载完成
					if (this.systemList.length >= this.totalElements) {
						this.finished = true;
					} else {
						this.page = this.page + 1;
						this.getList()
					}
				}, 500);
			}

		},
		filters:{
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
	.system {
		padding: 0.63rem 0;
		background: #F6F6F6;

		.section-system {
			.van-list {
				.van-cell {
					padding: 0.75rem;
					background-color: #fff;
					margin-bottom: 0.63rem;

					h6 {
						text-align: right;
						font-size: 0.75rem;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #696969;
						line-height: 1.06rem;
						margin-bottom: 0.75rem
					}

					p {
						font-size: 0.88rem;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #696969;
						line-height: 1.25rem;
						word-break: break-all;
						a {
							color: #FEA03A;
						}
					}
				}
			}

		}
	}
</style>
