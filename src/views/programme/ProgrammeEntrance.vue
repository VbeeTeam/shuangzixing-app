<template>
	<div class="programmeEntrance">
		<div v-wechat-title='$route.meta.title'></div>
		<img src="../../assets/img/top@3x.png" alt="">
		<div class="programmeEntrance-two">
			<img src="../../assets/img/盾牌@3x.png" alt="">
		</div>
		<div class="programmeEntrance-three">
			<img src="../../assets/img/核心优势@3x.png" alt="">
			<img src="../../assets/img/服务流程@3x.png" alt="">
			<img src="../../assets/img/案例展示@3x.png" alt="">
			<img src="../../assets/img/用户评价@3x.png" alt="">
		</div>
		<div class="btn">
			<div>
				<router-link to="/programmeList">
					我的方案
				</router-link>
			</div>
			<div>
				<router-link to="/programme">
					马上定制
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "programmeEntrance",

	}
</script>

<style lang="scss" scoped>
	.programmeEntrance {
		background-color: #E8F6FE;
		padding-bottom: 3rem;
		.programmeEntrance-two {
			padding: 0 3rem;
		}

		.programmeEntrance-three {
			padding: 0.88rem;

			img {
				margin: 0.5rem 0;
			}
		}

		.btn {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			display: -webkit-flex;
			height: 3rem;
			line-height: 3rem;
			div {
				flex: 1;
				font-size: 1rem;
				font-family: PingFang SC;
				
				color: #fff;
				text-align: center;
				background: linear-gradient(0deg, rgba(1, 109, 248, 1) 0%, rgba(85, 155, 245, 1) 100%);
				
				&:nth-of-type(2) {
					background: linear-gradient(0deg, rgba(254, 160, 58, 1) 0%, rgba(255, 185, 109, 1) 100%);
				}
				a{
					display: inline-block;
					width: 100%;
					height: 100%;
					color: #fff;
				}
			}
		}
	}
</style>
