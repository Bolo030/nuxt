<template>
	<div>
    <van-overlay :show="show" @click="show = false">
			<div ref="pop" :class="{prompt:true,big:type!='small'}">
        <van-icon name="cross" size="30" @click="closeDialog" />
				<div v-if='subTitle' class="sub">{{subTitle}}</div>
				<div v-if='title' class="title">
					{{title}}
				</div>
				<slot></slot>
				<div class="qrcode" v-if="type=='code'">
					<img :src="qrcode" class="qr-img" />
					<div class="sub-text">
						长按二维码保存
					</div>
					<img @click="toLink('')" class="service-banner" src="../../assets/imgs/zeor_icon.png" />
				</div>
				<button v-if="btnText" class="btn" @click="confirm" >
					{{btnText}}
				</button>
			</div>
      </van-overlay>
	</div>
</template>

<script>
	export default {
		data() {
			return {
         show: false
			};
		},
		props: {
			subTitle: String,
			title: String,
			btnText:String,
			qrcode:String,
			defaultBtn:{
				type:Boolean,
				default:false
			},
			type:{
				type:String,
				default:'small'
				},

		},
		methods: {
			openDialog() {
				this.show=true
			},
			closeDialog() {
			this.show=false
			},
			confirm() {
				if(!this.defaultBtn) this.$emit('confirm')
				this.closeDialog()
			},
			toLink(){
			/* 	uni.navigateTo({
					url:'/pages/activity/rulesDetails'
				}) */
			}
		},
	}
</script>

<style lang="scss" scoped>
.van-overlay{
  display: flex;
  justify-content: center;
  align-items: center;
}
	.prompt {
		background: #ffffff;
		border-radius: 20px;
		min-height: 305px;
		width: 480px;
		padding: 30px 35px;
		&.big{
			width: 550px;
		}
		.sub {
			font-size: 26px;
			color: #929292;
		}

		.title {
			text-align: center;
			font-size: 30px;
			color: #333333;
			margin: 35px 0 ;
			font-weight: 700;
		}

		.btn {
			width: 80%;
			height: 78px;
			background: #3BA6F4;
			border-radius: 39px;
			font-size: 36px;
			color: #FFFFFF;
			margin-top: 60px;
		}
		.close{
			position: absolute;
			right: 15px;
			top: 15px;
		}
		.qrcode{
			text-align: center;
			.qr-img{
				width: 280px;
				height: 280px;
				margin: 0 auto;
			}
			.sub-text{
				font-size: 24px;
				line-height: 24px;
				margin:30px 0 58px 0 ;
			}
			.service-banner{
				width: 480px;
				height: 80px;
			}
		}
	}
</style>
