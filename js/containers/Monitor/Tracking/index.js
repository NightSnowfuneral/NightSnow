import React,{Component} from 'react'
import {Select} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../../actions'
import ChartBar from '../../../components/ChartBar'
import './tracking.css'

const Option=Select.Option
	
const orderStateData = [{
    values: [{x: '已派', y: 10}, {x: '已接', y: 4}, {x: '已到', y: 3},{x:'已修',y:34},{x:'已转',y:2},{x:'归档',y:21}]
}]
const orderTypeData=[{
    values: [{x: '高压', y: 10}, {x: '低压', y: 75}, {x: '不确定', y: 3}]
}]

class Tracking extends Component{
	constructor(props) {
		super(props);
		
		this.state={
			districtAll:[]
		}
	}
	componentDidMount() {
		const {districtAll}=this.props
		if(!districtAll){
			this.GetDistrictAll()
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
	handleChange(value){
		console.log(value)
	}
	render(){
		return (
			<div className="tracking flex flex-1">
				<div className="left">
					<ChartBar 
						data={orderStateData}
						title="工单状态"
					/>
					<ChartBar 
						data={orderTypeData}
						title="工单类型"
					/>
					<ul className="total">
						<li>工单数量（今天）：1</li>
						<li>工单数量（未归）：2</li>
						<li>抢修队数量：3</li>
						<li className="flex flex-align-center">
							抢修队：
							<Select
								className="flex-1"
								showSearch
								placeholder="---请选择---"
								optionFilterProp="name"	
								onChange={this.handleChange.bind(this)}
							>
							 	<Option name="阿斯达" value="aaa">阿斯达</Option>
							    <Option name="法国的" value="bbb">法国的</Option>
							    <Option name="水电费是个" value="ccc">水电费是个</Option>
							</Select>
						</li>
					</ul>
				</div>
				<div className="center flex-1"></div>
				<div className="right"></div>
			</div>
		)
	}
}

const mapStateToProps=state=>{
	const {postsByPostTitle}=state
	const {districtAll}=postsByPostTitle
	return {
		districtAll
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Tracking) 