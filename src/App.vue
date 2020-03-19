<template>
	<div id="app">
		<router-view />

		<!-- 底部 -->
		
		<van-tabbar v-if="type" v-model="active" route>
			<van-tabbar-item to="/">
				<span>首页</span>
				<img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive">
			</van-tabbar-item>
			<van-tabbar-item to="/classRoom">
				<span>保险课堂</span>
				<img slot="icon" slot-scope="props" :src="props.active ? icon2.active : icon2.inactive">
			</van-tabbar-item>
			<van-tabbar-item to="/selected">
				<span>产品精选</span>
				<img slot="icon" slot-scope="props" :src="props.active ? icon3.active : icon3.inactive">
			</van-tabbar-item>
			<van-tabbar-item to="/my" :dot="$store.state.myNews">
				<span>我的</span>
				<img slot="icon" slot-scope="props" :src="props.active ? icon4.active : icon4.inactive">
			</van-tabbar-item>
		</van-tabbar>

	</div>
</template>


<script>
	
	export default {
		name: 'App',
		components: {
			
		},
		data() {
			return {

				type: true,
				active: 0,
				icon: {
					inactive: require('./assets/img/Tabbar-icon_home_n@3x.png'),
					active: require('./assets/img/Tabbar-icon_home_s@3x.png')
				},
				icon2: {
					inactive: require('./assets/img/Tabbar-icon_class_n@3x.png'),
					active: require('./assets/img/Tabbar-icon_class_s@3x.png')
				},
				icon3: {
					inactive: require('./assets/img/Tabbar-icon_product_n@3x.png'),
					active: require('./assets/img/Tabbar-icon_product_s@3x.png')
				},
				icon4: {
					inactive: require('./assets/img/Tabbar-icon_mine_n@3x.png'),
					active: require('./assets/img/Tabbar-icon_mine_s@3x.png'),
				}
			}
		},
		watch: {
			'$route'(to) {
				if (to.name == "home" || to.name == "classroom" || to.name == "selected" || to.name == "my") {
					this.type = true
				} else {
					this.type = false
				}
			}
		},

	}
</script>
<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		// height: 100%;
		background: #f7f7f7;
		.van-tabbar{
			height: auto;
		}
		.van-hairline--top-bottom{
			padding-bottom: 0.4rem;
			background-color: #FEFFFE;
			box-sizing: border-box;
			.van-tabbar-item{
				color:#CCCCCC;
				.van-tabbar-item__icon{
					margin-bottom: 0.2rem;
					img{
						width: 2rem;
						height: 2rem;
					}
				}
				.van-tabbar-item__text{
					font-size: 0.6rem;
				}
				.van-info{
					margin-top: 8px;
				}
				.van-info--dot{
					width: 10px;
					height: 10px;
					background-color: #FF631D;
				}
			
			}
			.van-tabbar-item--active{
				color:#10BBFD;
			}
		}
		
	}
</style>
