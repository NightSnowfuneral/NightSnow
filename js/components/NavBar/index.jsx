import React,{Component} from 'react'
import { Menu,Icon } from 'antd'
import {Link} from 'react-router'
import {ModuleMenu} from '../../utils/config'
import './navbar.css'

const SubMenu = Menu.SubMenu
class NavBar extends Component{
	constructor(props) {
		super(props);
		
		this.state={
			current: '1',
      		openKeys: [],
		}
	}	
	handleClick(e) {
	    this.setState({ current: e.key });
	}
	onOpenChange(openKeys) {
	    const state = this.state;
	    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
	    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

	    let nextOpenKeys = [];
	    if (latestOpenKey) {
	      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
	    }
	    if (latestCloseKey) {
	      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
	    }
	    this.setState({ openKeys: nextOpenKeys });
	}
	getAncestorKeys(key) {
	    const map = {
	     	/*sub3: ['sub2'],在submenu下嵌套的submenu点击时不收回*/
	    };
	    return map[key] || [];
	}
	render(){
		const {navbarArry} = this.props
		let subId=0,menuId=0
		return (
			<Menu
				className="navbar"
		        mode="inline"
		        openKeys={this.state.openKeys}
		        selectedKeys={[this.state.current]}
		        style={{ width: 180 }}
		        onOpenChange={this.onOpenChange.bind(this)}
		        onClick={this.handleClick.bind(this)}
		    >
		      	{navbarArry.map((item,i)=>{
		      		subId+=1
		      		return (
		      			<SubMenu className="menu_sub" key={"sub"+subId} title={<span><i className={item.sub.iconCn}></i><span>{item.sub.name}</span></span>}>
		      			    {item.menu.map((item,i)=>{
		      			    	menuId+=1
		      			    	return (
		      			    		<Menu.Item className="menu_item" key={menuId}>
		      			    			<Link to={item.linkTo}>{item.text}</Link>
		      			    		</Menu.Item>
		      			    	)
		      			    })}
				        </SubMenu>
		      		)
		      	})}
		    </Menu>
		)
	}
}

NavBar.defaultProps={
	navbarArry:ModuleMenu
}

export default NavBar