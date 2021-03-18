<template>
	<view id="store-filter">
		<view class="main" @touchmove.stop.prevent>
			<!-- 导航 -->
			<view class="nav">
				<view class="nav-box">
					<uni-icons v-if="showBack" @click="back" type="arrowleft" size="20" class="back"></uni-icons>
					<view class="nav-item" v-for="(item,index) in platformList" :class="{active:item.value==search.platform}" :key="index"
					 @click="chooseSelect(item,'platform')">
						<text>{{item.name}}</text>
						<view class="line" v-if="item.value==search.platform"></view>
					</view>
				</view>
			</view>
			<!-- 筛选栏 -->
			<view class="filters">
				<view class="search-box" @click="gotoSearch">
					<image src="../../static/img/search.png"></image>
					<text class="text-ellipsis content">{{search.search||'搜索'}}</text>
					<view class="search-clear" v-if="search.search"  @click.stop="clearSearch">
						<uni-icons class="clear" type="clear" size="15" ></uni-icons>
					</view>
				</view>
				<view class="filter-box">
					<view class="filter-item" v-for="(item,index) in filterList" :key='index' @click="chooseFilter(index)">
						<text :style="{'color':item.selected||index=='filter'?'#F4632C':''}">{{item.name}}</text>
						<image v-if="index=='filter'" class="filter" src="../../static/img/filter.png"></image>
						<image v-else-if="index==filterIdx&&showSelect" class="arrows" src="../../static/img/filter-top.png"></image>
						<image v-else class="arrows" src="../../static/img/filter-bottom.png.png"></image>
					</view>
				</view>
			</view>
			<!-- 筛选框 -->
			<view class="select" v-if="showSelect" @click.self ="cancel">
				<view class="select-box" >
					<!-- 排序 -->
					<view class="sort" v-if="filterIdx=='sort'" >
						<view class="sort-item" :class="{active:item.value==search.sort}" v-for="(item,index) in sortList" :key="index"
						 @click="chooseSelect(item,'sort')">
							{{item.name}}
						</view>
					</view>
					<!-- 价格筛选 -->
					<view class="sel-price" v-else >
						<view class="sel-price-section">
							<input @input="priceInput" type="text" v-model="search.price.low" placeholder-class='ft-26' placeholder="最低价格" />
							<text>—</text>
							<input @input="priceInput" type="text" v-model="search.price.high" placeholder-class='ft-26' placeholder="最低价格" />
						</view>
						<view class="sel-price-list">
							<view class="item" :class="{active:item.selected}" v-for="(item,index) in priceList" @click="chooseItem('priceList',index,'price')">
								{{item.name}}
							</view>
						</view>
						<view class="sel-price-btn btn-store">
							<button @click="cancel">取消</button>
							<button class="active" @click="confirm">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<filter-side ref='child' v-show="asideShow" :searchChild='search' :child='categoryList' @data='getAside' />
	</view>
</template>

<script>
	import store from './data.js'
	import FilterSide from './components/FilterSide'
	const searchStatic = {
		search: undefined,
		platform: 'tm', // 平台
		sort: 0, //排序选择
		area: undefined, //地区范围
		trademarkType: undefined, // 商标
		type: undefined, //认证/证明方式
		category: undefined, //类型--服务类型
		isNew: undefined,
		//brand: undefined,
		price: {
			low: undefined,
			high: undefined
		},
		per_page: 15,
		page: 1
	}
	export default {
		components: {
			FilterSide,
		},
		props: {
			showBack: Boolean,
			searchData: {
				type: Object,
				default: () => {}
			}
		},
		created() {
			this.reset();
			this.search = Object.assign(this.search, this.searchData)
			this.parseParams(this.search.platform)
		},
		data() {
			return {
				filterIdx: null, //筛选
				showSelect: false,
				platformList: store.platformList,
				priceList: store.priceList,
				filterList: store.filterList,
				sortList: store.sortList,
				asideShow: false,
				search: { ...searchStatic
				},
				categoryList: []

			};
		},
		methods: {
			// 返回店铺列表
			back() {
				uni.reLaunch({
					url: '/pages/shop/shop'
				})
			},
			// 重置
			reset() {
				this.search = { ...searchStatic}
				this.showSelect = false
				this.filterIdx = null
				this.chooseItem('filterList')
				this.chooseItem('priceList',0,'price',false)
			},
			clearSearch(){
				this.search.search="";
				this.$emit('result', this.search)
			},
			// 筛类型选择
			chooseFilter(idx) {
				this.$helpers.roll('#store-filter')
				if (idx == 'filter') {
					this.asideShow = !this.asideShow
					this.showSelect = false
				} else {
					if (this.filterIdx == idx)
						this.showSelect = !this.showSelect;
					else
						this.showSelect = true
				}
				this.filterIdx = idx;
			},
			chooseSelect(data, type) {
				if (type == 'platform') {
					this.reset();
					this.parseParams(data.value)
				}
				this.search[type] = data.value;
				this.$emit('result', this.search)
				if (type == 'sort'){
					this.showSelect = false
					this.filterList.sort.selected=data.value?true:false
					}
			},
			chooseItem(arr, idx,type,refresh=true) {
				for (var i in this[arr]) {
					if (i == idx) {
						this.$set(this[arr][i], 'selected', true)
						this.search[type] = this[arr][i].value;
						refresh&&this.$emit('result', this.search)
					} else
						this.$set(this[arr][i], 'selected', false)
				}
			},
			cancel() {
				this.search.price = {
					low: undefined,
					high: undefined
				}
				this.chooseItem('priceList', 0)
				this.filterList.price.selected = false
				this.showSelect = false;
				this.$emit('result', this.search)
			},
			confirm() {
				this.$emit('result', this.search)
				this.filterList.price.selected = Boolean(this.search.price.high!=undefined||this.search.price.low!=undefined)
				this.showSelect = false;
			},
			priceInput() {
				this.chooseItem('priceList')
				this.chooseItem('priceList', 0)
			},
			gotoSearch() {
				uni.navigateTo({
					url: `/pages/search/search?data=${this.search.search}&platform=${this.search.platform}`
				})
			},
			getAside(e) {
				if (e.show != undefined)
					this.asideShow = e.show
				if (JSON.stringify(e.search) != {} && e.search) {
					this.search = Object.assign(this.search, e.search)
					this.$emit('result', this.search)
				}
			},
			parseParams(data) {
				var type;
				switch (data) {
					case 'tm':
						type = 'mainCategory'
						break;
					case 'jd':
						type = 'jdCategory'
						break;
					case 'tb':
						type = 'tbCategory'
						break;
					default:
						type = 'jdCategory'
				}

				getStoreSearchParams({
					type,
				}).then((res) => {
					if (res.status == 1) {
						this.categoryList = res.data[type];
					}
				});
			},

		},
	}
</script>

<style lang="scss" scoped>
	@keyframes move-bottom {
		0% {
			margin-top: -130rpx;
			opacity: 0;
		}

		100% {
			margin-top: 0;
			opacity: 1;
		}
	}

	#store-filter {
		color: #1C1C1C;
		padding-bottom: 226rpx;
		position: sticky;
		left: 0;
		top: var(--window-top);
		z-index: 100000;

		.nav,
		.filters {
			background-color: #FFFFFF;
		}

		.main {
			font-size: 28rpx;
			width: 100vw;
			position: absolute;
			left: 0;
			z-index: 9999;
		}

		.nav-box {
			padding-top: 20rpx;
			display: flex;
			justify-content: space-between;
			height: 96rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #EDEDED;
			width: 700rpx;
			margin: 0 auto;

			.nav-item {
				position: relative;
			}

			.active {
				font-size: 32rpx;
				font-weight: 700;
			}

			.line {
				width: 33rpx;
				height: 6rpx;
				background: #F4632C;
				border-radius: 3px;
				position: absolute;
				bottom: 17rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.filters {
			height: 130rpx;
			padding: 22rpx 24rpx;

			&,
			.search-box,
			.filter-box,
			.filter-item {
				display: flex;
				align-items: center;
			}

			.search-box {
				width: 320rpx;
				height: 84rpx;
				background: #F4F4F4;
				border-radius: 42rpx;
				padding-left: 35rpx;
				font-size: 28rpx;
				margin-right: 45rpx;
				flex-shrink: 0;
				justify-content: space-between;
				.content{
					flex: 1;
				}
				.search-clear{
					width: 60rpx;
					height: 100%;
					display: flex;
					align-items: center;
				}
				image {
					height: 29rpx;
					width: 32rpx;
					margin-right: 14rpx;
					flex-shrink: 0;
				}
			}

			.filter-box {
				flex: 1;
				font-weight: bold;

				&,
				.filter-item {
					justify-content: space-between;

					.arrows {
						height: 8rpx;
						width: 14rpx;
						margin-left: 10rpx;
					}

					.filter {
						width: 22rpx;
						height: 22rpx;
						margin-left: 5rpx;
					}
				}
			}
		}

		.select {
			height: 100vh;
			width: 100vw;
			background-color: rgba($color: #000000, $alpha: .3);

			.select-box {
				background: #F4F4F4;
				border-radius: 0px 0px 36rpx 36rpx;
				padding: 54rpx 24rpx;
				font-size: 26rpx;
				line-height: 26rpx;
				position: relative;
				animation: move-bottom .5s;
			}

			.sort-item {
				&+.sort-item {
					margin-top: 54rpx;
				}

				&.active {
					color: #F4632C;
				}
			}

			.sel-price-section {
				display: flex;
				align-items: center;
				justify-content: space-between;

				input {
					width: 320rpx;
					height: 88rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					text-align: center;
				}
			}

			.sel-price-list {
				display: flex;
				flex-wrap: wrap;
				margin: 50rpx 0 30rpx;

				.item {
					width: 160rpx;
					height: 64rpx;
					font-size: 24rpx;
					line-height: 64rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					margin: 0 20rpx 20rpx 0;
					text-align: center;

					&.active {
						color: #F4632C;
					}

					&:nth-child(4n+4) {
						margin-right: 0;
					}
				}
			}

			.sel-price-btn {
				button.active {
					background: #F4632C;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
