<template>
	<view id="aside" @touchmove.stop.prevent>
		<view class="aside-back" @click="colse">
				<image class="back"  src='/static/icon/rectangle.png' />
				<text>返回</text>
		</view>
		<scroll-view scroll-y class="aside-list">
			<view class="aside-item" v-for="(item,index) in list" :key="index">
				<view class="aside-item-title">
					{{item.title}}
				</view>
				<view class="child">
					<view class="child-item text-ellipsis" :class="{active:v.selected}" v-for="(v,i) in item.childList" :key='i'
					 @click="choose(v,i,index)">
						{{v.name}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="aside-btn btn-store">
			<button class="reset" @click="reset">重置</button>
			<button class="confirm" @click="confirm">确定</button>
		</view>
	</view>
</template>

<script>
	import store from '../data.js'

	const search = {
		platform: 'tm', // 平台
		area: undefined, //地区范围
		trademarkType: undefined, // 商标
		type: undefined, //认证/证明方式
		category: undefined, //类型--服务类型
		isNew: undefined,
	}
	export default {
		props: {
			child: {
				type: Array,
				default: () => []
			},
			searchChild: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				list: [{
						title: '商店平台',
						childList: store.platformlist,
						type: 'platform'
					},
					{
						title: '是否新店',
						childList: store.isNew,
						type: 'isNew'
					},
					{
						title: '商标类型',
						childList: store.trademarkType,
						type: 'trademarkType'
					},
					{
						title: '主营类目',
						childList: this.child,
						type: 'category'
					},
					{
						title: '地区范围',
						childList: store.areaList,
						type: 'area'
					},
					{
						title: '认证类型',
						childList: store.typeList,
						type: 'type'
					},
				],
				search: { ...search
				}


			}
		},
		created() {
			this.reset()
			if (this.searchChild.platform) {
				this.setItem(0, this.searchChild.platform)
			} else if (this.searchChild.category) {
				this.setItem(3, this.searchChild.category)
			}
			this.search = Object.assign(this.search, this.searchChild)
		},
		methods: {
			choose(data, idx, index) {
				var value=data.id || data.value
				if(index!=0&&this.search[this.list[index].type]==value){
					this.chooseItem(index)
					this.search[this.list[index].type] = undefined
					return
				}
				this.chooseItem(index, idx)
				this.search[this.list[index].type] = value
			},
			chooseItem(index, idx) {
				for (var i in this.list[index].childList) {
					if (i == idx)
						this.$set(this.list[index].childList[i], 'selected', true)
					else
						this.$set(this.list[index].childList[i], 'selected', false)
				}
			},
			setItem(index, value) {
				for (var v of this.list[index].childList) {
					if (v.value == value||v.id == value)
						this.$set(v, 'selected', true)
					else
						this.$set(v, 'selected', false)
				}
			},
			colse() {
				this.$emit('data', {
					show: false,
					search: this.search
				})
			},
			reset() {
				for (var i in this.list) {
					if (i == 0)
						this.chooseItem(0, 0)
					else
						this.chooseItem(i)
				}
				this.search = { ...search
				}
			},
			confirm() {
				console.log(this.search,'this.search')
				this.$emit('data', {
					show: false,
					search: this.search
				})
			}
		},
		watch: {
			child(newName, oldName) {
				this.list[3].childList = newName
				if (this.searchChild.category) {
					this.setItem(3, this.searchChild.category)
				}
			},
			searchChild(newName, oldName) {
				this.reset()
				this.setItem(0, newName.platform)
				this.search = Object.assign(this.search, this.searchChild)
			}
		}


	}
</script>

<style lang="scss" scoped>
	@keyframes move-left {
		0% {
			left: 100%
		}

		100% {
			top: 0
		}
	}

	#aside {
		position: fixed;
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100000;
		background-color: #FFFFFF;
		padding: 30rpx 24rpx 0;
		box-sizing: border-box;
		animation: move-left .5s;
		.aside-back{
			display: flex;
			align-items: center;
			.back{
				width: 17rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
			font-size: 30rpx;
			margin-bottom: 40rpx;
			font-weight: 700;
		}
		
		.aside-list {
			height: calc(100% - 220rpx);
		}
	}

	.aside-item {
		.aside-item-title {
			font-size: 28rpx;
			font-weight: 700;
			margin-bottom: 25rpx;
		}

		.child {
			display: flex;
			flex-wrap: wrap;

			.child-item {
				width: 160rpx;
				height: 64rpx;
				background: #F4F4F4;
				border-radius: 8rpx;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 64rpx;
				text-align: center;
				margin: 0 20rpx 20rpx 0;
				padding: 0 20rpx;

				&:nth-child(4n+4) {
					margin-right: 0;
				}

				&.active {
					background: #FFEBE4;
					color: #F4632C;
				}
			}
		}
	}

	.aside-btn {
		height: 140rpx;
		align-items: center;

		button {
			color: #FFFFFF;
		}

		.reset {
			background-color: #FFEBE4;
			color: #F4632C;
		}

		.confirm {
			background-color: #F4632C;
		}
	}
</style>
