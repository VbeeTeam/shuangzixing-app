<template>
	<div class="feedback">
		<div v-wechat-title='$route.meta.title'></div>

		<div class="feedback-section" v-show="!successBoolean">
			<h3>请描述您遇到的问题：</h3>
			<div class="section-problem">
				<ul class="problem">
					<li v-for="(item,index1) in problemList" :key="index1" @click="problemClick($event,index1,item)">{{item.text}}</li>
				</ul>
				<div class="proposal">
					<van-cell-group>
						<van-field maxlength="200" v-model="forms.content" type="textarea" placeholder="请尽可能详细描述您的问题或者建议，我们将尽快跟进并解决！" autosize />
					</van-cell-group>
					<p>{{forms.content.length}}/200</p>
				</div>
			</div>
			<div class="section-img">
				<h3>上传图片(不超过3张)</h3>
				<ul class="imgList">
					<li v-for="(item,index2) in forms.imgUrl" :key="index2">
						<img :src="item" alt="">
						<img class="close" @click="close(index2)" src="../../assets/img/icon-close3@3x.png" alt="">
					</li>
					<li v-if="forms.imgUrl.length < 3">
						<van-uploader :after-read="afterRead">
							<img src="../../assets/img/icon_添加照片@3x.png" alt="">
						</van-uploader>
					</li>
				</ul>
			</div>

			<div class="section-phone">
				<input v-model="forms.contactInfo" placeholder="请留下您的联系方式" />
			</div>

			<div class="btn">
				<van-button @click="submit()" slot="button" :disabled="submitBoolean" round color="#016DF8" type="info">提交反馈</van-button>
			</div>

		</div>
		
		<div class="success" v-show="successBoolean">
			<img src="../../assets/img/好评感谢@3x.png" alt="">
			<h3>提交反馈成功，感谢您的反馈</h3>
		</div>
	</div>
</template>

<script>
	import {
		generaList
	} from "@/api/api"
	import {
		feedbackAdd
	} from "@/api/api"
	import {
		upLoader
	} from "@/api/api"


	export default {
		name: "my-feedback",
		data() {
			return {
				successBoolean:false,
				problemList: [],
				problemBoolean: false,
				forms: {
					content: "",
					contactInfo: "",
					imgUrl: [],
					type: [],
					userId: ""
				}
				
			}
		},
		methods: {
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

			// 获取列表
			getList() {
				generaList({
					sign: 6
				}).then(res => {
					this.problemList = res
					this.problemList.forEach((item) => {
						item.type = false
					})
				})
			},
			//选择问题
			problemClick(e, i, obj) {
				this.problemBoolean = obj.type == true ? false : true
				if (this.problemBoolean) {
					e.target.classList.add('active');
					this.problemList[i].type = this.problemBoolean
				} else {
					e.target.classList.remove('active');
					this.problemList[i].type = this.problemBoolean
				}

				this.problemList.forEach((item) => {
					if (item.type) {
						this.forms.type.push(item.id)
						this.forms.type = Array.from(new Set(this.forms.type))
					}
				})
			},
			//上传图片
			afterRead(file) {
				
				let img = this.dataURLtoBlob(file.content)
				// 创建FormData对象
				let param = new FormData()
				// 将得到的文件流添加到FormData对象
				param.append('file', img)
				upLoader(param).then(res => {
					this.forms.imgUrl.push(res.data[0])
				})
			},
			//删除图片
			close(i){
				this.forms.imgUrl.splice(i,1)
			},

			//提交反馈
			submit() {
				
				if(this.forms.type.length == 0){
					this.$toast("请选择问题")
				}else if(this.forms.content == ""){
					this.$toast("请输入建议")
				}else{
					feedbackAdd(this.forms).then(res => {
						this.$toast("提交成功")
						this.successBoolean = true
					})
				}
				
			}

		},
		created() {
			this.forms.userId = JSON.parse(sessionStorage.getItem('userInfo')) ?
			JSON.parse(sessionStorage.getItem('userInfo')).userId : ""
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.feedback {
		padding: 1.25rem 0.75rem;
		background-color: #f7f7f7;

		.feedback-section {
			h3 {
				font-size: 1rem;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: 500;
				color: rgba(0, 0, 0, 1);
				line-height: 1.38rem;
			}

			.section-problem {

				.problem {
					display: -webkit-flex;
					justify-content: space-around;
					flex-wrap: wrap;

					li {
						width: 30%;
						text-align: center;
						font-size: 0.88rem;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: rgba(153, 153, 153, 1);
						border-radius: 1.31rem;
						border: 1px solid rgba(221, 221, 221, 1);
						padding: 0.4rem 0;
						margin-top: 0.75rem;
					}

					.active {
						border-color: #FEA03A;
						color: #FEA03A;
					}
				}

				.proposal {
					background-color: #fff;
					margin-top: 0.75rem;
					border-radius: 5px;

					[class*=van-hairline]::after {
						border: none;
					}

					.van-field {
						min-height: 10rem;
					}

					p {
						text-align: right;
						padding: 0.75rem;
						font-size: 0.88rem;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: rgba(0, 0, 0, 1);
						line-height: 1.25rem;
					}
				}
			}

			.section-img {
				background: #fff;
				padding: 0.75rem;
				border-radius: 5px;
				margin-top: 1.25rem;

				h3 {
					font-size: 0.88rem;
					font-family: PingFang-SC-Medium, PingFang-SC;
					font-weight: 500;
					color: #000000;
					line-height: 1.25rem;
				}

				.imgList {
					display: -webkit-flex;
					flex-wrap: wrap;

					li {
						width: 30%;
						padding: 0.8rem 0.5rem;
						box-sizing: border-box;
						position: relative;
						img {
							width: 5rem;
							height: 5rem;
						}
						.close{
							width: 1.25rem;
							height: 1.25rem;
							position: absolute;
							right: 0;
							top:0;
						}
					}
				}
			}

			.section-phone {
				margin-top: 1.25rem;
				padding: 0.8rem 0.75rem;
				border-radius: 5px;
				background-color: #fff;

				input {
					width: 100%;
					font-size: 1rem;
					font-family: PingFang-SC-Medium, PingFang-SC;
					font-weight: 500;
					color: #000;
					line-height: 1.38rem;
					border: none;
					outline: none;
				}

				::-webkit-input-placeholder {
					color: #999999;
				}

			}

			/deep/.btn {
				margin-top: 3.8rem;
				text-align: center;

				.van-button {
					width: 12rem;
					line-height: inherit;
				}
			}
		}
		
		.success{
			padding-top: 5rem;
			text-align: center;
			img{
				width: 6rem;
				height: 6rem;
				margin-bottom: 3.75rem;
			}
			h3{
				font-size:1.25rem;
				font-family:PingFang-SC-Medium,PingFang-SC;
				font-weight:500;
				color:rgba(254,160,58,1);
				line-height:1.75rem;
			}
		}
	}
</style>
