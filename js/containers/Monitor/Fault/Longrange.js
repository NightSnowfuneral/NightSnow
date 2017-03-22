import React,{Component} from 'react'


class Longrange extends Component{
	changeSpinning(state){
		const {actions}=this.props
		actions.changeSpinning(state)
	}
	render(){
		return (
			<div className="longrange">
				<h1>申请远程许可工单</h1>
			</div>
		)
	}
}

export default Longrange