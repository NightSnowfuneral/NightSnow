import React,{Component} from 'react'
import { Link,IndexLink } from 'react-router'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class Navigation extends Component{
	constructor(props) {
		super(props);
		
		this.state={
			current:"menu1"
		}
	}
	handleClick(e){
		this.setState({
			current:e.key
		})
	}
	render(){
		const {navigationArry}=this.props
		let menuId=0
		return (
			<Menu 
				mode="horizontal"
				selectedKeys={[this.state.current]}
				onClick={this.handleClick.bind(this)}
			>
				{navigationArry.map((item,i)=>{
					menuId+=1
					return (
						<Menu.Item key={"menu"+menuId} className={"menu"+menuId}>
							<Link activeClassName="active" to={item.linkTo}>{item.name}</Link>
						</Menu.Item>
					)
				})}
			</Menu>
		)
	}
}

export default Navigation

