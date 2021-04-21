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
const storeTypeList={
  'tm':[
    {name:"旗舰店",value:1,selected:false},
    {name:"专营店",value:2,selected:false},
    {name:"专卖店",value:3,selected:false},
    {name:"供销平台",value:4,selected:false},
    {name:"美妆店",value:5,selected:false},
  ],
  "jd":[
    {name:"旗舰店",value:100,selected:false},
    {name:"专营店",value:101,selected:false},
    {name:"专卖店",value:102,selected:false},
    {name:"京喜",value:103,selected:false},
    {name:"全球购",value:104,selected:false},
    {name:"自营",value:105,selected:false},
    {name:"优创店",value:106,selected:false},
    {name:"拼购",value:107,selected:false},
    {name:"卖场型",value:108,selected:false},
  ],
  "tb":[
    {name:"个人店",value:200,selected:false},
    {name:"企业店",value:201,selected:false},
  ],
  "pd":[
    {name:"个人店",value:300,selected:false},
    {name:"企业店",value:301,selected:false},
    {name:"旗舰店",value:301,selected:false},
    {name:"专营店",value:301,selected:false},
    {name:"专卖店",value:301,selected:false},
  ],
  "wp":[
    {name:"旗舰店",value:400,selected:false},
    {name:"专营店",value:401,selected:false},
    {name:"专卖店",value:401,selected:false},
    {name:"自营店",value:401,selected:false},
  ],
  "xh":[
    {name:"旗舰店",value:500,selected:false},
    {name:"集合店",value:501,selected:false},
    {name:"专卖店",value:501,selected:false},
  ],
  "mg":[
    {name:"蘑菇街主站",value:600,selected:false},
    {name:"蘑菇街小程序",value:601,selected:false},
  ],
}
const searchShort={
  'w':'search',
  'h':'sort',
  'l':'price',
  'n':'isNew',
  'u':'trademarkType',
  'c':'category',
  'r':'area',
  'x':"taxType",
  'f':"firstCategory",
  's':"storeType"

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
  searchShort,
  storeTypeList
}
