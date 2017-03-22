import React,{Component} from 'react'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import moment from 'moment'
import {bindActionCreators} from 'redux'
import {Spin} from 'antd'
import * as actions from '../../../actions'
import Navigation from '../../../components/Navigation'
import {PersonalNavigationArr} from '../../../utils/config'

class Personal extends Component{
	componentDidMount() {
		this.GetLatestWorkOrderList()
			.then(()=>{
				this.props.router.replace('/monitor/personal/havesent')
			})
		/*this.timer=setInterval(()=>{
			this.GetLatestWorkOrderList()
		},5000)*/
	}
	componentWillUnmount() {
		clearInterval(this.timer)
	}
	setOptions(){
		return {
			service:"ElectricityGridAegisRealTimeService",
			fun:"json/GetLatestWorkOrderList",
		}
	}
	GetLatestWorkOrderList(){
		const options=this.setOptions()
		const {actions}=this.props
		return actions.fetchPostsIfNeeded("WorkOrderList","LatestWorkOrderList",options,true)
	}
	
	render(){
		return (
			<div className="fault flex flex-1">
				<Spin
					spinning={false} 
					tip="Loading..."
					style={{width:"100%"}}
				>
					<Navigation navigationArry={PersonalNavigationArr} />
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
	}=postsByPostTitle.WorkOrderList || {
		isFetching: true,
    	lists: [],
	}
	return {
		isFetching,
		lists,
		spinning
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Personal)) 
