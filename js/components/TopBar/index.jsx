import React,{Component} from 'react'
import {Link} from 'react-router'
import { Menu, Dropdown } from 'antd'
import "./topbar.css"

class TopBar extends Component{
	renderSkin(){
		const arry=["1","2","3","4","5","6","7","8","9","10","11","12"]
		return (
			<Menu 
				className="dd-menu flex flex-wrap"
				onClick={this.handleButtonClick.bind(this)}
			>
				{
					arry.map((item)=>{
						return (
							<Menu.Item key={item} className="flex-0 small-bg" style={{backgroundImage:"url(../../../assets/img/bg/small/small-bg"+item+".jpg)"}}></Menu.Item>
						)
					})
				}
		    </Menu>
		)
	}
	handleButtonClick(e){
		this.props.changeSkinIndex(e.key)
	}
	render(){
		return (
			<div className="topbar flex flex-stretch">
				<div className="flex-1 flex flex-align-center">
					<a className="title">应急抢险系统</a>
				</div>
				<div className="flex flex-stretch">
					<div className="count flex flex-stretch">
						<a className="dropdown flex flex-align-center" href="javascript:;">
							{this.props.people}人在线
						</a>
					</div>
					<div className="skin flex flex-stretch">
						<Dropdown 
							overlay={this.renderSkin()} 
							trigger={['click']}
						>
						    <a className="ant-dropdown-a dropdown flex flex-align-center" href="javascript:;">
						      <i className="iClass fa fa-adjust"></i>
						      皮肤
						    </a>
						</Dropdown>
					</div>
					<div className="setting flex flex-stretch">
						<Link className="ant-dropdown-a dropdown flex flex-align-center" to="/logout">
					      <i className="iClass fa fa-sign-out fa-fw"></i>
					      退出
					    </Link>
					</div>					
				</div>
			</div>
		)
	}
}

export default TopBar

/*const {dropdownArry}=this.props
		const menuArry=[]
		dropdownArry.map((item,i)=>{
			menuArry.push(
				<Menu>
				   {item.menuArry.map((item,i)=>{
				   		if(!item.isLast){
				   			return (
				   				<Menu.Item key={i}>
							        <Link to={item.linkTo}>
							      	    <i className={item.iconCn}></i>{'  '}
							      	   	{item.text}
							        </Link>
							    </Menu.Item>
				   			)
				   		}

				   })}
				   <Menu.Divider />
				   {item.menuArry.map((item,i)=>{
				   		if(item.isLast){
				   			return (
				   				<Menu.Item key={i}>
							        <Link to={item.linkTo}>
							      	    <i className={item.iconCn}></i>{'  '}
							      	   	{item.text}
							        </Link>
							    </Menu.Item>
				   			)
				   		}

				   })}
				</Menu>
			)
		})*/

	/*{dropdownArry.map((item,i)=>{
						return (
							<div className="setting flex flex-stretch" key={i}>
								<Dropdown overlay={menuArry[i]} trigger={['click']}>
								    <a className="ant-dropdown-a dropdown flex flex-align-center" href="javascript:;">
								      <i className={item.iconCn}></i>
								      <i className="fa fa-caret-down"></i>
								    </a>
								</Dropdown>
							</div>
						)
					})}*/

	/*TopBar.defaultProps = {
	dropdownArry:[
		{
			iconCn:"fa fa-user fa-fw",
			menuArry:[
				{text:"设置",iconCn:"fa fa-gear fa-fw",linkTo:"/setting"},
				{text:"退出",iconCn:"fa fa-sign-out fa-fw",isLast:true,linkTo:"/logout"}
			]

		}
	]
}*/