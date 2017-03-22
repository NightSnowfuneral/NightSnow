import React,{Component} from 'react'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Spin} from "antd"
import * as actions from '../../../actions'
import Navigation from '../../../components/Navigation'
import {FaultNavigationArr} from '../../../utils/config'

class Fault extends Component{
	componentDidMount() {
		this.GetLatestFaultWorkOrderList()
			.then(()=>{
				this.props.router.replace('/monitor/fault/havesent')
			})
		this.timer=setInterval(()=>{
			this.GetLatestFaultWorkOrderList()
		},5000)
	}
	componentWillUnmount() {
		clearInterval(this.timer)
	}
	setOptions(){
		return {
			service:"ElectricityGridAegisRealTimeService",
			fun:"json/GetLatestFaultWorkOrderList",
		}
	}
	GetLatestFaultWorkOrderList(){
		const options=this.setOptions()
		const {actions}=this.props
		return actions.fetchPostsIfNeeded("FaultWorkOrderList","LatestWorkOrderList",options,true)
	}
	render(){
		const {isFetching,lists}=this.props
		return (
			<div className="fault flex flex-1">
				<Spin
					spinning={isFetching && lists.length===0} 
					tip="Loading..."
					style={{width:"100%"}}
				>
					<Navigation  
						navigationArry={FaultNavigationArr} 
					/>
					{this.props.children}
				</Spin>
			</div>
		)
	}
}
const mapStateToProps=state=>{
	const {postsByPostTitle,spinning}=state
	const {
		isFetching,
		lists,
		data
	}=postsByPostTitle.FaultWorkOrderList || {
		isFetching: true,
    	lists: [],
	}
	return {
		isFetching,
		lists,
		data,
		spinning
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Fault))
