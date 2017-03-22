import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../../actions'
import TableBar from '../../../components/TableBar'

class Agency extends Component{
	constructor(props) {
		super(props);
		
		this.state={
			pageId:"11",
		}
	}
	componentDidMount() {
		this.GetWaitHandleWorkOrderList()
	}
	setOptions(){
		return {
			service:"ElectricityGridAegisRealTimeService",
			fun:"json/GetWaitHandleWorkOrderList",
		}
	}
	GetWaitHandleWorkOrderList(){
		const options=this.setOptions()
		const {actions}=this.props
		actions.fetchPostsIfNeeded("WaitHandleWorkOrderList","WaitHandleWorkOrderList",options)
	}
	render(){
		const {isFetching,lists}=this.props
		const {pageId}=this.state
		return (
			<div className="agency">
				<TableBar 
					dataSource={this.props.lists} 
					pageId={pageId}
				/>
			</div>
		)
	}
}

const mapStateToProps=state=>{
	const {postsByPostTitle}=state
	const {
		isFetching,
		lists,
	}=postsByPostTitle.WaitHandleWorkOrderList || {
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

export default connect(mapStateToProps,mapDispatchToProps)(Agency)