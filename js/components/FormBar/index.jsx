import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'
import { Form, Row, Col, Input, Button, Icon, Select, Cascader, DatePicker,message,Checkbox,Spin } from 'antd'
import moment from 'moment'
import objectAssign from 'object-assign'
import classnames from "classnames"
const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker
import { FormDataAll,workOrderDetailLists } from '../../utils/config'
import Ajax from '../Ajax'
import './formbar.css'

class CustomizedForm extends Component{
	constructor(props) {
		super(props);
		
		this.state={
			FormData:[],
			submitBtnLoading:false
		}
	}
	componentDidMount() {
		const {selectType}=this.props
		this.GetDistrictAll()
		this.GetBillSortList(selectType.text)
		this.getSecondFlowStepList(selectType.text)
	}
	componentWillReceiveProps(nextProps) {
		const districtAllState=nextProps.districtAll 
		const billSortListState=nextProps.billSortList
		const secondFlowStepListState=nextProps.secondFlowStepList
		if(districtAllState && billSortListState && secondFlowStepListState){
			let nweOptions=objectAssign({},{selectType:nextProps.selectType},{districtAll:nextProps.districtAll.options},{billSortList:nextProps.billSortList.options},{secondFlowStepList:nextProps.secondFlowStepList.options},{workOrderDetailList:nextProps.list},{request:nextProps.request})
	      	this.filterFormData(nextProps.selectType.text,nweOptions)
	    }
	}
	componentWillUpdate(nextProps, nextState) {
		if(nextProps.selectType!=this.props.selectType){
			this.GetBillSortList(nextProps.selectType.text)
			this.getSecondFlowStepList(nextProps.selectType.text)
		}
		if(!nextProps.modalVisible){
			this.handleReset()
		}
	}
	
	recursionOptions(lists,pid){
	    let result=[],temp
	    lists.map((item,i)=>{
	        if(item.ParentID==pid){
		        result.push(item)
		        item.label=item.SortName
		        item.value=item.SortID
		        temp=this.recursionOptions(lists,item.SortID)
		        if(temp.length>0){
		          item.children=temp
		        }
	        }
	    })
	    return result
  	}
  	isEmptyObject(obj){
	    for (var key in obj) {
	        return false;
	      }
	      return true
    }

	setSelectTypeValue(item,list){
		if(item.dataIndex=="SelectType"){
			item.value=list.text
			item.disabled=list.disabledState
		}
	}
	setDistrictIDOptions(item,lists){
		if(item.dataIndex=="DistrictID"){
			if(item.options.length==0){
				lists.map((list)=>{
					item.options.push({...list,name:list.DistrictName,value:list.DistrictID})
				})
			}
		}
	}
	setBillSortListOptions(item,lists){
		if(item.dataIndex=="SortId"){
			item.options=this.recursionOptions(lists,"")
		}
	}
	setSecondFlowStepList(item,lists){
		let arry=[]
		if(item.dataIndex=="nextStepId"){
			lists.map((list)=>{
				arry.push({...list,name:list.StepName,value:list.FlowStepID})
			})
			item.options=arry
		}
	}
	setFormDataValue(item,workOrderDetailList){
		for(let value in workOrderDetailList){
			if(item.dataIndex==value && workOrderDetailList[value]!=null){
				item.value=workOrderDetailList[value].toString()
			}
		}
	}
	setEmptyFormDataValues(item){
	    if(item.dataIndex!="SelectType"){
	        item.value=""
	        item.disabled=false
	    }
	}
	setStaffIdList(index){
		let ltStaffIdList=[]
		this.props.secondFlowStepList.options.map((item)=>{
			if(item.FlowStepID==index){
				if(item.StepStaffs.length>0){
					item.StepStaffs.map((list)=>{
						ltStaffIdList.push(list.StaffID)
					})
				}
			}
		})
		return ltStaffIdList
	}

	filterFormData(index,options){
	    let arry=[]
	    FormDataAll.map((item)=>{
	    	this.setSelectTypeValue(item,options.selectType)
	    	this.setDistrictIDOptions(item,options.districtAll)
	    	this.setBillSortListOptions(item,options.billSortList)
	    	this.setSecondFlowStepList(item,options.secondFlowStepList)
	    	if(options.request=="put" && !this.isEmptyObject(options.workOrderDetailList)){
	    		this.setFormDataValue(item,options.workOrderDetailList)
	    	}else if(options.request=="post"){
	    		this.setEmptyFormDataValues(item)
	    	}
		    if(!item.slectIndex){
		        arry.push(item)
		    }else{
		        item.mapIndex.map((list)=>{
		            if(list==index){
		           		arry.push(item)
		            }
		        })
		    }
	    })
	    this.setState({FormData:arry})
	}
	changeSelectValue(value){
		const {actions}=this.props
		actions.selectType(value,false)
	}
	handleChange(name,value){
		switch(name) {
			case "SelectType":
				this.changeSelectValue(value);
				this.handleReset()
				break;
			default :
				return
		}
	}
	formClassiFication(item){
	    const {getFieldDecorator}=this.props.form
	    switch(item.type) {
	      case "textarea":
	        return (
	            getFieldDecorator(item.dataIndex,{
		            initialValue:item.value,
		            rules:[{ required: item.require, message: '请输入'+item.title }]
	            })(
	                <Input
	                    disabled={item.disabled} 
			            type="textarea"
			            autosize={{ minRows: 2, maxRows: 6 }}
	           		/>
	            )
	        )
	      case "select":
	        return (
	            getFieldDecorator(item.dataIndex,{
		            initialValue:item.value,
		            onChange:this.handleChange.bind(this,item.dataIndex),
		            rules:[{ required: item.require, message: '请选择'+item.title }]
	            })(
	                <Select 
	                	disabled={item.disabled}
	                >
		              	{item.options.map((item,i)=>{
			                return (
			                  <Option key={i} value={item.value}>{item.name}</Option>
			                )
		             	})}
		            </Select>
	            ) 
	        )
	      case "cascader":
	        return (
		        getFieldDecorator(item.dataIndex,{
		            rules:[{ required: item.require, message: '请输入'+item.title }]
		        })(
		            <Cascader
			            disabled={item.disabled}  
			            notFoundContent={"Not Found"}
			            options={item.options}
			            placeholder="请选择"
			            expandTrigger="hover"
		            />
	          )
	        )
	      case "date":
	        return (
		        getFieldDecorator(item.dataIndex,{
		            initialValue: item.value?moment(item.value):moment(),
		            rules:[{ required: item.require, message: '请输入'+item.title }]
		        })(
		            <DatePicker
		              	disabled={item.disabled} 
		                showTime
		                format="YYYY-MM-DD HH:mm:ss"
		                placeholder="日期 时间"
		            />
	          )
	        )
	      case 'checked':
	        return (
		        getFieldDecorator(item.dataIndex, {
	                valuePropName: 'checked',
	                initialValue: true,
	            })(
	                <Checkbox>{item.title}</Checkbox>
	            )
	        )
	      default:
	        return (
		        getFieldDecorator(item.dataIndex,{
		            initialValue:item.value,
		            rules:[{ required: item.require, message: '请输入'+item.title }]
		        })(
	                <Input disabled={item.disabled}  />
	            )
	        )
	    }
	}
	renderFormItem(item,i){
	    let formItem=<FormItem
	              key={item.dataIndex}
	              className={classnames("row",item.rowCn?item.rowCn:"row-3")}
	              label={item.title}
	            >
	              {this.formClassiFication(item)}
	            </FormItem>
	    return formItem
	}

	getFlowType(SelectType){
	    switch(SelectType) {
	      case "0":
	        return 203;
	        break;
	      case "1":
	        return 204;
	        break;
	      case "2":
	        return 205;
	        break;
	      case "3":
	        return 206;
	        break;
	      case "4":
	        return 207;
	        break;
	      case "5":
	        return 208;
	        break;
	      case "6":
	        return 209;
	        break;
	      case "7":
	        return 210;
	        break;
	      case "8":
	        return 211;
	        break;
	    }
	}

	GetDistrictAll(){
	    const options={
	      service:"ElectricityGridAegisService",
	      fun:"json/GetRepairDistrictsALL",
	    }
	    const {actions}=this.props
	    actions.fetchPostsIfNeeded("districtAll","RepairDistrict",options)
	}
	GetBillSortList(SelectType){
		const options={
		    service:"ElectricityGridAegisService",
		    fun:"json/GetBillSortListBySortType&SortType="+SelectType
		}
		const {actions}=this.props
    	actions.fetchPostsIfNeeded("billSortList","BillSort",options,true)
	}
	getSecondFlowStepList(SelectType){
	    const options={
	      service:"BaseDataOnRunFlowService",
	      fun:"json/GetSecondFlowStepList&flowType="+this.getFlowType(SelectType)
	    }
	    const {actions}=this.props
	    actions.fetchPostsIfNeeded("secondFlowStepList","NextStepList",options,true)
	}

	getInitialValues(index){
		let initialValue={}
		workOrderDetailLists.map((item)=>{
			if(item.SelectType==index){
				initialValue=item.list
			}
		})
		return initialValue
	}
	filterDateValue(date){
		const newDate=moment.utc(date).valueOf()
	    var str="/Date("+newDate+"+0800)/"
	    return str
	}
	filterValues(item,values){
	    switch(item.type) {
		    case 'date':
		        return values[item.dataIndex]=this.filterDateValue(values[item.dataIndex])
		        break
		    case 'select':
		        return values[item.dataIndex]=item.flowStepID=="string"?values[item.dataIndex]:parseInt(values[item.dataIndex])
		        break
		    case 'cascader':
		        return values[item.dataIndex]=parseInt(values[item.dataIndex][values[item.dataIndex].length-1])
		        break;
		    case 'checked':
		        return values[item.dataIndex]=values[item.dataIndex]?1:0
		        break
		    default :
		        return values[item.dataIndex]=values[item.dataIndex]
		}
	}
	getApiOptions(index){
	    switch(index) {
	        case "0":
		        return {options:{service:"OrderFlowService",fun:"json/SendFaultOrderFlow"},listsName:"electricityGridAegisFaultOrder"};
		        break;
	        case "1":
		        return {options:{service:"OrderFlowService",fun:"json/SendBusinessConsultingOrderFlow"},listsName:"businessConsultingOrder"};
		        break;
	    }
	}
	filterValuesAttr(values,nameMapIndex){
		let newValues={}
    	let nameIndex=""
		for(let value in values){
			nameMapIndex.map((item)=>{
				if(value==item){
					nameIndex=value
				}
			})
			if(value!=nameIndex){
				newValues[value]=values[value]
			}
		}
		return newValues
	}
	getPostoptions(values,SelectType,FormData){
		const initialState=this.getInitialValues(SelectType.text)
		const apiOptions=this.getApiOptions(SelectType.text)
		const nameMapIndex=["SelectType","nextStepId","ltStaffIdList","dealIdea","content"]
		const options={...apiOptions.options}
		const data={
			[apiOptions.listsName]:{...initialState,...this.filterValuesAttr(values,nameMapIndex)},
			flowType:this.getFlowType(SelectType.text),
			nextStepId:values.nextStepId,
			ltStaffIdList:this.setStaffIdList(values.nextStepId),
			dealIdea:"",
			content:""
		}
		options.data=JSON.stringify(data)
   		return options
	}
	ajaxPost(options){
		let ajax=new Ajax(options)
		this.setState({submitBtnLoading:true})
		ajax.post()
			.then((res)=>{
					if(res.Msg=="成功"){
			          	message.success("提交成功")
			         	this.setState({submitBtnLoading:false})
			        	this.props.closeModal()
			        }else{
			          	message.warning(res.Information)
			          	console.log(res)
			        }
				}
				,(error)=>{
					message.error("提交失败")
        			console.log(error)
				}
			)
			.then(()=>{
				this.setState({submitBtnLoading:false})
			})
	}
	handleSubmit(e){
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
	        if (!err) {
	        	const {FormData}=this.state
	        	const {selectType}=this.props
	        	FormData.map((item)=>{
	        		this.filterValues(item,fieldsValue)
	        	})
	        	let options=this.getPostoptions(fieldsValue,selectType,FormData)
	        	this.ajaxPost(options)
	        }
        })
	}
	handleReset(){
	    this.props.form.resetFields()
	}
	render(){
		const {FormData}=this.state
		return (
			<Spin 
				tip="加载中"
				spinning={this.props.isFetching}
				style={{width:"100%"}}
			>
				<Form 
					onSubmit={this.handleSubmit.bind(this)}
					className="flex flex-wrap"
				>
					{FormData.map((item,i)=>this.renderFormItem(item,i))}
					<div className="ant-modal-footer" style={{width:"100%",marginTop:"18px"}}>
						<Button key="back" type="ghost" size="large" disabled={this.state.submitBtnLoading} onClick={this.handleReset.bind(this)}>重置</Button>
						<Button key="submit" type="primary" htmlType="submit" size="large" loading={this.state.submitBtnLoading} >保存</Button>
					</div>
				</Form>
			</Spin>
		)
	}
}



const FormBar = Form.create()(CustomizedForm)

const mapStateToProps=state=>{
	const {selectType,postsByPostTitle}=state
	const {districtAll,billSortList,workOrderDetailList,secondFlowStepList}=postsByPostTitle
	const {list,isFetching}=workOrderDetailList || {isFetching:false,list:{}}
	return {
		selectType,
		billSortList,
		districtAll,
		secondFlowStepList,
		list,
		isFetching
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(FormBar)     