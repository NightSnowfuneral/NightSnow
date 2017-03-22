import React,{Component} from 'react'

class Admin extends Component{
	render(){
		return (
			<div className="admin">
				{this.props.children}
			</div>
		)
	}
}

export default Admin