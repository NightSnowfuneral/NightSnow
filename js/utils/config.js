/*******************************导航模块**********************************/
export const ModuleMenu=[
	{sub:{name:"监控模块",iconCn:"fa fa-eye"},menu:[{text:"抢修跟踪模块",linkTo:"/monitor/tracking"},{text:"故障工单监控",linkTo:"/monitor/fault"},{text:"工单发起",linkTo:"/monitor/sendorder"},{text:"个人工单",linkTo:"/monitor/personal"},{text:"导入工单"},{text:"短信发送"}]},
	{sub:{name:"配置模块",iconCn:"fa fa-gear fa-fw"},menu:[{text:"抢修片区管理"},{text:"停电计划管理"},{text:"预处理时间"},{text:"登录客户端审核"},{text:"话务账号管理"},{text:"设置坐席号"},{text:"语单提醒设置"}]},
	{sub:{name:"电网工作流",iconCn:"fa fa-magnet"},menu:[{text:"工作流"}]},
	{sub:{name:"系统管理",iconCn:"fa fa-wrench"},menu:[{text:"部门资料"},{text:"人事资料"},{text:"角色管理"},{text:"分组管理"},{text:"权限管理"},{text:"人事管理"},{text:"区域管理"},{text:"机构管理"},{text:"流程管理"},{text:"全局设置"},{text:"一键召测"},{text:"批量设置"}]},
	{sub:{name:"呼叫中心报表",iconCn:"fa fa-headphones"},menu:[{text:"呼叫超时"},{text:"坐席迁入迁出查询"},{text:"坐席pk指标"},{text:"坐席统计情况表"},{text:"语音留言"}]}
]
/*******************************工单**********************************/
//1.所有的业务类型
const SourceTypeOptions=[
	{name:"故障抢修",value:"0"},
	{name:"业务咨询",value:"1"},
	{name:"投诉",value:"2"},
	{name:"举报",value:"3"},
	{name:"建议",value:"4"},
	{name:"意见",value:"5"},
	{name:"表扬",value:"6"},
	{name:"信息查询",value:"7"},
	{name:"催办",value:"8"},
	{name:"综合业务",value:"9"}
]
//2.工单分类
const OrderTypeOptions=[
	{name:"社会联动",value:"1"},
	{name:"语音留言",value:"2"},
	{name:"110,市长热线,消防等",value:"3"}
]
//3.工单区域
const PowerSupplyArea=[
	{name:"龙湾区",value:"1"},
	{name:"瓯海区",value:"2"},
	{name:"鹿城",value:"3"},
]
//4.指挥中心号码
const CenterPhoneNumOptions=[
	{name:"520500",value:"520500"},
	{name:"520501",value:"520501"},
	{name:"520550",value:"520550"}
]
//5.紧急程度
const OrderGradeOptions=[
	{name:"一般",value:"0"},
	{name:"重要",value:"1"},
	{name:"紧急",value:"2"}
]
//6.高低压类别
const VoltageTypeOptions=[
	{name:"低压",value:"1"},
	{name:"高压",value:"2"},
	{name:"不确定",value:"3"},
	{name:"其他",value:"6"},
]
//7.现场分类
const FaultSiteTypeOptions=[
	{name:"城区",value:"1"},
	{name:"农村",value:"2"},
	{name:"特殊边远地区",value:"3"}
]
//8.投诉等级
const ComplainGradeOptions=[
	{name:"一般",value:"0"},
	{name:"重要",value:"1"},
	{name:"重大",value:"2"},
	{name:"特殊",value:"3"},
]
//9.客户情绪
const CustomerSentimentOptions=[
	{name:"一般",value:"0"},
	{name:"激动",value:"1"},
	{name:"非常激动",value:"2"},
]
//10.责任分类
const BlameSortOptions=[
	{name:"营销责任",value:"0"},
	{name:"非营销责任",value:"1"},
	{name:"用户责任",value:"2"},
	{name:"公司合作伙伴责任",value:"3"},
]
//11.保密方式
const PrivacyTypeOptions=[
	{name:"匿名",value:"0"},
	{name:"保密",value:"1"},
]
//12.是否保密
const IsLeapfrogOptions=[
	{name:"否",value:"0"},
	{name:"是",value:"1"}
]
//13.建议类型
const BuildTypeOptions=[
	{name:"城市配电网建设", value:"0"},
	{name:"农村配电网建设", value:"1"},
	{name:"输电网", value:"2"},
	{name:"服务规范", value:"3"},
	{name:"停送电", value:"4"},
	{name:"故障抢修", value:"5"},
	{name:"业扩报装", value:"6"},
	{name:"用电变更", value:"7"},
	{name:"抄表催费", value:"8"},
	{name:"缴费方式", value:"9"},
	{name:"用电检查", value:"10"},
	{name:"电价电费", value:"11"},
	{name:"电能计量", value:"12"},
	{name:"业务收费", value:"13"},
	{name:"服务渠道", value:"14"},
	{name:"电动汽车充换电", value:"15"},
	{name:"电费充值卡业务", value:"16"},
	{name:"其他建议", value:"17"},
]
const PraiseTypeOptions=[
	{name:"行风建设", value:"0"},
	{name:"供电服务", value:"1"},
	{name:"电网建设", value:"2"},
	{name:"其他表扬", value:"3"},
]
//基本工单title
const BasicFormData=[
	{title:"工单分类",dataIndex:"OrderType",key:"OrderType",type:"select",options:OrderTypeOptions,rowCn:"row-3",require:true},
	{title:"受理人员",dataIndex:"AcceptStaff",key:"AcceptStaff",rowCn:"row-3"},
	{title:"供电区域",dataIndex:"PowerSupplyArea",key:"PowerSupplyArea",type:"select",options:PowerSupplyArea,rowCn:"row-3",require:true},
	{title:"户号",dataIndex:"AmmeterAccountNum",key:"AmmeterAccountNum",rowCn:"row-3"},
	{title:"用户姓名",dataIndex:"UserName",key:"UserName",rowCn:"row-3",require:true},
	{title:"联系电话",dataIndex:"ContactPhone",key:"ContactPhone",rowCn:"row-3",require:true},
	{title:"联系地址",dataIndex:"ContactAddr",key:"ContactAddr",rowCn:"row-3"},
	{title:"受理内容",dataIndex:"AcceptContent",key:"AcceptContent",type:"textarea",rowCn:"row-1",require:true},
]
//9.关联工单title
const RelationFormData=[
	{title:"业务类型",value:"0",dataIndex:"SelectType",key:"SelectType",type:"select",options:SourceTypeOptions,rowCn:"row-1"},
	{title:"等级分类",dataIndex:"SortId",key:"SortId",rowCn:"row-2",type:"cascader",options:[],slectIndex:"SelectType",mapIndex:["0","1","2","3","5","7","9"],require:true},
	{title:"指挥中心号码",dataIndex:"CenterPhoneNum",key:"CenterPhoneNum",type:"select",options:CenterPhoneNumOptions,rowCn:"row-2",slectIndex:"SelectType",mapIndex:["0"],require:true},
	{title:"故障时间",dataIndex:"FaultTime",key:"FaultTime",type:"date",rowCn:"row-2",slectIndex:"SelectType",mapIndex:["0"],require:true},
	{title:"故障设备名称",dataIndex:"FaultDeviceName",key:"FaultDeviceName",rowCn:"row-2",slectIndex:"SelectType",mapIndex:["0"]},
	{title:"紧急程度",dataIndex:"OrderGrade",key:"OrderGrade",type:"select",options:OrderGradeOptions,rowCn:"row-2",slectIndex:"SelectType",mapIndex:["0","3"],require:true},
	{title:"高低压类别",dataIndex:"VoltageType",key:"VoltageType",type:"select",options:VoltageTypeOptions,rowCn:"row-2",slectIndex:"SelectType",mapIndex:["0"],require:true},
	{title:"现场分类",dataIndex:"FaultSiteType",key:"FaultSiteType",type:"select",options:FaultSiteTypeOptions,rowCn:"row-2",slectIndex:"SelectType",mapIndex:["0"],require:true},
	{title:"故障地址",dataIndex:"FaultAddr",key:"FaultAddr",rowCn:"row-2",slectIndex:"SelectType",mapIndex:["0"]},
	{title:"抢修队",dataIndex:"DistrictID",key:"DistrictID",type:"select",flowStepID:"string",options:[],rowCn:"row-2",slectIndex:"SelectType",mapIndex:["0"],require:true},
	{title:"投诉等级",dataIndex:"ComplainGrade",key:"ComplainGrade",type:"select",options:ComplainGradeOptions,rowCn:"row-2",slectIndex:"SelectType",mapIndex:["2"],require:true},
	{title:"客户情绪",dataIndex:"CustomerSentiment",key:"CustomerSentiment",type:"select",options:CustomerSentimentOptions,rowCn:"row-2",slectIndex:"SelectType",mapIndex:["2"],require:true},
	{title:"责任分类",dataIndex:"BlameSort",key:"BlameSort",type:"select",options:BlameSortOptions,rowCn:"row-2",slectIndex:"SelectType",mapIndex:["2"],require:true},
	{title:"涉及部门",dataIndex:"RelateDepartment",key:"RelateDepartment",rowCn:"row-2",slectIndex:"SelectType",mapIndex:["3"]},
	{title:"涉及人员",dataIndex:"RelateStaff",key:"RelateStaff",rowCn:"row-2",slectIndex:"SelectType",mapIndex:["3"]},
	{title:"被举报人户号",dataIndex:"ReportUserID",key:"ReportUserID",rowCn:"row-2",slectIndex:"SelectType",mapIndex:["3"]},
	{title:"被举报人地址",dataIndex:"ReportAddress",key:"ReportAddress",rowCn:"row-2",slectIndex:"SelectType",mapIndex:["3"]},
	{title:"保密方式",dataIndex:"PrivacyType",key:"PrivacyType",type:"select",options:PrivacyTypeOptions,rowCn:"row-2",slectIndex:"SelectType",mapIndex:["2"],require:true},
	{title:"是否越级",dataIndex:"IsLeapfrog",key:"IsLeapfrog",type:"select",options:IsLeapfrogOptions,rowCn:"row-2",slectIndex:"SelectType",mapIndex:["2"],require:true},
	{title:"越级原因",dataIndex:"LeapfrogContent",key:"LeapfrogContent",rowCn:"row-2",slectIndex:"SelectType",mapIndex:["2"]},
	{title:"建议类型",dataIndex:"BuildType",key:"BuildType",rowCn:"row-2",type:"select",options:BuildTypeOptions,slectIndex:"SelectType",mapIndex:["4"],require:true},
	{title:"表扬类型",dataIndex:"PraiseType",key:"PraiseType",rowCn:"row-2",type:"select",options:PraiseTypeOptions,slectIndex:"SelectType",mapIndex:["4"],require:true},
	{title:"下一步骤",dataIndex:"nextStepId",key:"nextStepId",type:"select",flowStepID:"string",options:[],rowCn:"row-2",require:true},
	{title:"是否回访",dataIndex:"IsNeedVisit",key:"IsNeedVisit",type:"checked",rowCn:"row-4"},
]

//新增工单title
export const FormDataAll=[
	...BasicFormData,
	...RelationFormData
]

//所有表头
export const columnsAll=[
	{ title: '工单号', dataIndex: 'WorkOrderNo', key: 'WorkOrderNo' ,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    { title: '受理人员', dataIndex: 'AcceptStaff', key: 'AcceptStaff',pageId:["1","2","3","4","5","6","7","8","9","10","11"] },
    { title: '电话号码', dataIndex: 'PhoneNumber', key: 'PhoneNumber',pageId:["1","2","3","4","5","6","7","8","9","10","11"] },
    { title: '客户姓名', dataIndex: 'UserName', key: 'UserName', pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    { title: '客户联系电话', dataIndex: 'ContactPhone', key: 'ContactPhone' ,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    { title: '客户联系地址', dataIndex: 'AmmeterAccountNum', key: 'AmmeterAccountNum' ,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    { title: '户号', dataIndex: 'address', key: 'address' ,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
]
//所有按钮操作
export const actionsBtnsAll=[
	{name:"编辑",funIndex:"0",pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
	/*{name:"重新派单",funIndex:"9",pageId:["1","2","3","4","5","6","7","8","9","10","11"]},*/
]
//故障工单状态
export const FaultNavigationArr=[
	{name:"已派工单",linkTo:"/monitor/fault/havesent",pageId:"1"},
	{name:"已接工单",linkTo:"/monitor/fault/received",pageId:"2"},
	{name:"到达现场",linkTo:"/monitor/fault/arrive",pageId:"3"},
	{name:"抢修完成",linkTo:"/monitor/fault/complete",pageId:"4"},
	{name:"归档工单",linkTo:"/monitor/fault/file",pageId:"5"},
	{name:"申请远程许可工单",linkTo:"/monitor/fault/longrange",pageId:"6"},
	{name:"回退工单",linkTo:"/monitor/fault/Fallback",pageId:"7"}
]
//工单发起状态
export const SendOrderNavigationArr=[
	{name:"已派工单",linkTo:"/monitor/sendorder/havesent",pageId:"8"},
	{name:"未派工单",linkTo:"/monitor/sendorder/notsend",pageId:"9"},
]
//个人工单状态
export const PersonalNavigationArr=[
	{name:"已派工单	",linkTo:"/monitor/personal/havesent",pageId:"10"},
	{name:"代办工单",linkTo:"/monitor/personal/agency",pageId:"11"},
]

export const workOrderDetailLists=[
	{SelectType:"0",list:{WorkOrderID: "",WorkOrderNo: "",AcceptStaff: "",PhoneNumber: "",UserName: "",ContactPhone: "",ContactAddr: "",AmmeterAccountNum: "",Longitude: 0,Latitude: 0,FaultTime: "",FaultDeviceName: "",BelongCounty: "",OrderGrade: "",VoltageType: 0,AcceptContent: "",OrderType: 0,DeviceEquityPro: "",CompanyDuty: "",FaultAddr: "",DistrictID: "",CenterPhoneNum: "",AlikeWorkOrderID: "",SourceType: "",SortId: "",PowerSupplyArea: "",FaultSiteType: 0,IsNeedVisit:0}},
	{SelectType:"1",list:{WorkOrderID: "",WorkOrderNo: "",AcceptStaff: "",PhoneNumber: "",UserName: "",ContactPhone: "",ContactAddr: "",AmmeterAccountNum: "",SourceType: "",AcceptContent: "",PowerSupplyArea: "",SortId: "",IsNeedVisit:0}},
]