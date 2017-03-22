import React,{Component} from 'react'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Spin} from 'antd'
import * as actions from '../actions'
import Ajax from '../components/Ajax'
import TopBar from '../components/TopBar'
import NavBar from '../components/NavBar'

class Dashboard extends Component{
	constructor(props) {
		super(props);
		
		this.state={
			skinIndex:0,
		}
	}
	componentWillMount() {
		sessionStorage.refreshIndex=parseInt(sessionStorage.refreshIndex)+1
	}
	componentDidMount() {
		this.GetCurrentOnLines()
		/*this.timer=setInterval(()=>{
			this.GetCurrentOnLines()
		},5000)*/
	}
	setOptions(){
		return {
			service:"RegisterService",
			fun:"json/CurrentOnLines",
		}
	}
	GetCurrentOnLines(){
		const options=this.setOptions()
		const {actions}=this.props
		actions.fetchPostsIfNeeded("CurrentOnLines","Count",options,true)
	}
	PostHeartBeat(){
		const data={loginId:sessionStorage.LoginId}
		const options={
			service:"RegisterService",
			fun:"json/HeartBeat",
			data:JSON.stringify(data)
		}
		const ajax=new Ajax(options)
		ajax.post()
			.then((res)=>{
				console.log(res)
			})
	}
	changeSkinIndex(index){
		this.setState({
			skinIndex:index
		})
	}
	render(){
		if(sessionStorage.refreshIndex>1){
			this.props.router.replace("/logout")
			return false
		}
		const skin={backgroundImage:"url(../../assets/img/bg/bg"+this.state.skinIndex+".jpg"}
		return (
			<div 
				className="dashboard flex flex-column"
				style={skin}
			>
				<div className="header flex-0">
					<TopBar 
						people={this.props.data.Count} 
						changeSkinIndex={this.changeSkinIndex.bind(this)}
					/>
				</div>
				<div className="content flex-1 flex">
					<div className="nav">
						<NavBar />
					</div>
					<div className="wrapper flex-1 flex">
						{this.props.children}
					</div>
				</div>
				<div className="footer flex-0"></div>
			</div>
		)
	}
}

const mapStateToProps=state=>{
	const {postsByPostTitle,refresh}=state
	const {
		isFetching,
		data,
	}=postsByPostTitle.CurrentOnLines || {
		isFetching: true,
    	data: {},
	}
	return {
		isFetching,
		data,
		refresh
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dashboard))  