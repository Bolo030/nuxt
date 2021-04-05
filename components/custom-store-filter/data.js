const priceList = [{
		name: "不限",
		value: {
			low: undefined,
			high: undefined
		}
	},
	{
		name: "5万以下",
		value: {
			high: 5
		},
	},
	{
		name: "5-10万",
		value: {
			low: 5,
			high: 10
		},
	},
	{
		name: "10-20万",
		value: {
			low: 10,
			high: 20
		},
	},
	{
		name: "20-50万",
		value: {
			low: 20,
			high: 50
		},
	},
	{
		name: "50万以上",
		value: {
			low: 50,
		},
	},
]

const platformList = [
	/* {
		name: "全部",
		value: '',
		selected:true
	}, */
	{
		name: "天猫",
		value: 'tm',
		selected:true
	},
	{
		name: "淘宝",
		value: 'tb'
	},
	{
		name: "拼多多",
		value: 'pd'
	},
	{
		name: "京东",
		value: 'jd'
	},
	{
		name: "其他网店",
		value: 'qt'
	},
]

const platformlist = [
	/* {
		name: '所有店铺',
		value: '',
		column: 'platform'
	}, */
	{
		name: '天猫',
		value: 'tm',
		column: 'platform',
	},
	{
		name: '淘宝',
		value: 'tb',
		column: 'platform'
	},
	{
		name: '京东',
		value: 'jd',
		column: 'platform'
	},
	{
		name: '唯品会',
		value: 'wp',
		column: 'platform'
	},
	{
		name: '小红书',
		value: 'xh',
		column: 'platform'
	},
	{
		name: '拼多多',
		value: 'pd',
		column: 'platform'
	},
	{
		name: '蘑菇街',
		value: 'mg',
		column: 'platform'
	},
	{
		name: '当当网',
		value: 'dd',
		column: 'platform'
	},
	{
		name: '贝贝网',
		value: 'bb',
		column: 'platform'
	},
	{
		name: '阿里巴巴',
		value: 'al',
		column: 'platform'
	},
	{
		name: '苏宁',
		value: 'sn',
		column: 'platform'
	},
	{
		name: '亚马逊',
		value: 'yx',
		column: 'platform'
	},
	{
		name: '洋码头',
		value: 'ym',
		column: 'platform'
	},
	{
		name: '其他',
		value: 'qt',
		column: 'platform'
	},
];

const filterList = {
	'sort':{
		name: '排序',
		selected: false
	},
	'price':{
		name: '价格',
		selected: false
	},
	'filter':{
		name: '筛选',
		selected: true
	},
}
const trademarkTypeList = [{
		name: "R标",
		value: "r",
    selected:false
	},
	{
		name: "TM标",
		value: "tm",
    selected:false
	},
]

const taxTypeList = [{
		name: "一般纳税人",
		value: 'general',
    selected:false
	},
	{
		name: "小规模纳税人",
		value: 'small',
    selected:false
	},

]

const areaList = [{
		name: "华北",
		value: 'hb',
    selected:false
	},
	{
		name: "东北",
		value: 'db',
    selected:false
	},
	{
		name: "华东",
		value: 'hd',
    selected:false
	},
	{
		name: "华中",
		value: 'hz',
    selected:false
	},
	{
		name: "华南",
		value: 'hn',
    selected:false
	},
	{
		name: "西南",
		value: 'xn',
    selected:false
	},
	{
		name: "西北",
		value: 'xb',
    selected:false
	}
]

const isNewList=[
	{name:'新店',value:1, selected:false},
	{name:'老店',value:2, selected:false},
]
const sortList=[
	{name:'默认排序',value:0},
	{name:'价格从低到高',value:1},
	{name:'价格从高到低',value:2}
]

const searchShort={
  'w':'search',
  'h':'sort',
  'l':'price',
  'n':'isNew',
  'u':'trademarkType',
  'c':'category',
  'r':'area',
  'x':"taxType",
  'f':"firstCategory"

}
export default {
	priceList,
	platformlist,
	platformList,
	filterList,
	taxTypeList,
	trademarkTypeList,
	sortList,
	isNewList,
	areaList,
  searchShort
}