import React,{Component} from 'react'

class Monitor extends Component{
	render(){
		return (
			<div className="monitor flex-1 flex">
				{this.props.children}
			</div>
		)
	}
}

export default Monitor
