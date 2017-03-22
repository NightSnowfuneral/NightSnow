import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../../actions'
import TableBar from '../../../components/TableBar'

class Fallback extends Component{
	constructor(props) {
		super(props);
		
		this.state={
			pageId:"7"
		}
	}
	filterLists(lists,index){
		let newLists=[]
		if(lists){
			newLists=this.props.lists.filter((list)=>list.OrderState==index)
		}
		return newLists
	}
	render(){
		const {pageId}=this.state
		return (
			<div className="fallback">
				<TableBar 
					dataSource={this.filterLists(this.props.lists,7)} 
					pageId={pageId}
				/>
			</div>
		)
	}
}

const mapStateToProps=state=>{
	const {postsByPostTitle}=state
	const {
		lists
	}=postsByPostTitle.FaultWorkOrderList || []
	return {
		lists,
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Fallback) 