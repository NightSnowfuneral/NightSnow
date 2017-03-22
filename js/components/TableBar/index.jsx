import React,{Component} from 'react'
import { Table,Icon,Dropdown,Menu,Input,Button } from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'
import { columnsAll, actionsBtnsAll } from '../../utils/config'
import ModalBar from '../ModalBar'
import './tablebar.css'

class TableBar extends Component{
	constructor(props) {
		super(props);
		
		this.state={
			columns:[],
			dataSource:[],
			showModal:false,
			modalWidth:"",
			modalTitle:"",
			request:"post"
		}
	}
	componentWillMount() {
		this.setColumns()
		this.setDataSource(this.props.dataSource)
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.dataSource.length!=0){
	      this.setDataSource(nextProps.dataSource)
	    }
	}
	handleClickBtn(funIndex,text){
	    switch(funIndex) {
	      case "0":
	        this.editBtn(text)
	        break
	      case "9":
	        this.againBtn(text)
	        break
	    }
	}
	filterFun(lists,index){
		let arry=[]
		lists.map((list)=>{
			list.pageId.map((item)=>{
				if(item==index){
					arry.push(list)
				}
			})
		})
		return arry
	}
	setBtns(text, record){
		const {pageId}=this.props
		const btns=this.filterFun(actionsBtnsAll,pageId)
	    const dropdownBtns=btns.slice(2)
	    const tableBtns=btns.slice(0,2)
	    const menu = (
	      <Menu>
	        {dropdownBtns.map((item,i)=>{
	            return (
	                <Menu.Item key={i}>
	                    <a href="javascript:;" onClick={this.handleClickBtn.bind(this,item.funIndex,text)}>{item.name}</a>
	                </Menu.Item>
	            )
	        })}
	      </Menu>
	    )
	    return (
	      <span>
	        {tableBtns.map((item,i)=>{
	          return (
	            <span key={i}>
	                <a href="javascript:;" onClick={this.handleClickBtn.bind(this,item.funIndex,text)}>{item.name}</a>
	                {btns.length%2==0 &&
	                	<span className="ant-divider" />
	                }
	            </span>
	          )
	        })}
	        {btns.length>2 && 
	        	<Dropdown overlay={menu} trigger={['click']}>
		            <a href="#" className="ant-dropdown-link">
		               更多 <Icon type="down" />
		            </a>
		        </Dropdown>
	        }
	      </span>
	    )
	}
	setColumns(){
		const {pageId}=this.props
	    let columns=this.filterFun(columnsAll,pageId)
	    const actionsColumn=[ { title: '操作', dataIndex: '', key: 'x', render: (text, record) => this.setBtns(text, record) }]
	    columns=columns.concat(actionsColumn)
	    this.setState({
	      columns
	    })
	}
	setDataSource(dataSource){
		dataSource.map((item,i)=>{
			return item.key=i+1
		})
		this.setState({
			dataSource
		})
	}
	closeModal(){
		const {actions}=this.props
		actions.changeRefresh(false)
	    this.setState({
	      showModal:false,
	    })
	}
	showModal(){
		const {actions}=this.props
		actions.changeRefresh(true)
	    this.setState({
	      showModal:true
	    })
	}
	addBtn(){
		const {actions,pageId}=this.props
	    this.showModal()
	    this.setState({modalWidth:"960px",modalTitle:"新增工单",request:"post"})
	    actions.selectType("0",pageId=="1")
	}
    editBtn(text){
    	const {actions}=this.props
	    this.showModal()
	    this.setState({modalWidth:"960px",modalTitle:"编辑工单",request:"put"})
	    actions.selectType(text.BusinessType?text.BusinessType.toString():"0",true)
	    this.getWorkOrderDetailList(text.BusinessType?text.BusinessType.toString():"0",text.WorkOrderID)
    }
    againBtn(text){
	   	console.log("aaaa")
    }

    getAjaxOptions(BusinessType,WorkOrderID){
	    switch(BusinessType) {
		    case "0":
		        return {options:{service:"OrderService",fun:"json/GetElectricityGridAegisFaultById&workOrderId="+WorkOrderID},listsName:"faultOrder"};
		        break;
		    case "1":
		        return {options:{service:"OrderService",fun:"json/GetBusinessConsultingById&workOrderId="+WorkOrderID},listsName:"businessConsultingOrder"};
		        break;
	    }
	}
	getWorkOrderDetailList(BusinessType,WorkOrderID){
	    const options=this.getAjaxOptions(BusinessType,WorkOrderID)
	    const {actions}=this.props
	    actions.fetchPostsIfNeeded("workOrderDetailList",options.listsName,options.options,true)
	}

	render(){
		const {dataSource,columns,showModal,modalWidth,modalTitle,request}=this.state

		return (
			<div className="tablebar">
				{this.props.addBtn && 
					<Button className="editable-add-btn" type="ghost" onClick={this.addBtn.bind(this)}>{this.props.addBtn}</Button>
				}
				<Table 
					columns={columns} 
					dataSource={dataSource} 
				/>
				<ModalBar 
			        ref="modal"
			        modalWidth={modalWidth}
			        modalTitle={modalTitle}
			        visible={showModal} 
			        closeModal={this.closeModal.bind(this)}
			        request={request}
		        />
			</div>
		)
	}
}

const mapStateToProps=state=>{
	const {selectType}=state
	return {
		selectType,
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(TableBar) 