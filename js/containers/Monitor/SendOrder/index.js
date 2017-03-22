import React,{Component} from 'react'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Spin} from 'antd'
import * as actions from '../../../actions'
import Navigation from '../../../components/Navigation'
import {SendOrderNavigationArr} from '../../../utils/config'

class SendOrder extends Component{
	componentDidMount() {
		this.GetLatestWorkOrderList()
			.then(()=>{
				this.props.router.replace('/monitor/sendorder/havesent')
			})
		/*this.timer=setInterval(()=>{
			this.GetLatestWorkOrderList()
		},5000)*/
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
	componentWillUnmount() {
		clearInterval(this.timer)
	}
	render(){
		const {isFetching,lists}=this.props
		return (
			<div className="fault flex flex-1">
				<Spin
					spinning={false} 
					tip="Loading..."
					style={{width:"100%"}}
				>
					<Navigation navigationArry={SendOrderNavigationArr} />
					{this.props.children}
				</Spin>
			</div>
		)
	}
}

const mapStateToProps=state=>{
	const {postsByPostTitle}=state
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
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SendOrder))  
