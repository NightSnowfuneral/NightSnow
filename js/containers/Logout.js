import React,{Component} from 'react'
import { withRouter } from 'react-router'
import {message} from 'antd'
import Ajax from '../components/Ajax'

class Logout extends Component{
	logoutAjax(){
		const data={loginId:sessionStorage.LoginId}
		const options={
			service:"RegisterService",
			fun:"json/Logout",
			data:JSON.stringify(data)
		}
		const ajax=new Ajax(options)
		ajax.post().then(
			(res)=>{
				message.success("退出成功")
				delete sessionStorage.LoginId
				delete sessionStorage.refreshIndex
				this.props.router.replace('/login')
			},
			(error)=>{console.log(error)}
		)
	}
	componentDidMount() {
		this.logoutAjax()
	}
	render(){
		return (
			<div className="logout">
				<p>你正在退出...</p>
			</div>
		)
	}
}

export default withRouter(Logout) 