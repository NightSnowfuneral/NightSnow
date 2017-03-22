import React,{Component} from 'react'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {message,Button} from 'antd'
import * as actions from '../actions'
import Ajax from '../components/Ajax'
import md5 from 'md5'

class Login extends Component{
  constructor(props) {
    super(props);
    
    this.state={
      indentifyCode:"",
      userName:"",
      password:"",
      btnLoading:false
    }
  }
  componentWillMount() {
    if(this.props.location.action!="POP"){
      const {actions}=this.props
      const obj={}
      actions.clearPosts(obj)
    }
  }
  componentDidMount() {
    this.setIndentifyCode()
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  setIndentifyCode(){
    const ajax=new Ajax({service:"RegisterService",fun:"json/IndentifyCode"})
    ajax.get()
      .then((res)=>{
          this.setState({indentifyCode:res.random})
      })
  }
  handleChange(name,even){
    let newState={}
    newState[name]=even.target.value
    this.setState(newState)
  }
  warning(content){
    message.warning(content,5)
  }
  showMessage(type,content){
    switch(type) {
      case "warning":
        message.warning(content)
        break
      case "error":
        message.error(content)
        break;
      default :
        message.success(content)
    }
  }
  ajaxLogin(options){
     const { location } = this.props
     const ajax=new Ajax(options)
     this.setState({btnLoading:true})
     this.timer=setTimeout(()=>{
        ajax.post()
        .then((res)=>{
            if(!res.LoginID){
              this.showMessage("error","网络不佳，请重新刷新页面")
              return false
            }
            sessionStorage.LoginId = res.LoginID
            sessionStorage.refreshIndex=0
            this.props.router.replace('/')
        })
      },2000)
  }
  setMD5Password(password){
    const {indentifyCode}=this.state
    const newPassword=md5(md5("zhidian"+password).toLocaleUpperCase()+indentifyCode).toLocaleUpperCase()
    return newPassword
  }
  handleSubmit(e){
    e.preventDefault()
    const {userName,password,indentifyCode}=this.state
    if(userName===""){
      this.showMessage("warning","请输入用户名！")
      return false 
    }
    if(password===""){
      this.showMessage("warning","请输入密码！")
      return false
    } 

    const data={
      userName,
      password:this.setMD5Password(password),
      random:indentifyCode
    }
    const options={
      service:"RegisterService",
      fun:"json/Login",
      data:JSON.stringify(data),
    }
    this.ajaxLogin(options)
  }
  render(){
    document.title="后台登入"
    const {btnLoading}=this.state
    return (
        <div className="login">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <dl className="login_box">
               <dt>
                  <strong>应急抢险系统</strong>
               </dt>
               <dd className="user">
                  <input type="text" placeholder="账号" className="login_txtbx" onChange={this.handleChange.bind(this,"userName")} />
               </dd>
               <dd className="pwd"> 
                  <input type="password" placeholder="密码" className="login_txtbx" onChange={this.handleChange.bind(this,"password")} />
               </dd>
               <dd>
                  <button disabled={btnLoading} className="submit_btn" type="submit">
                    {btnLoading &&
                      <i className="fa fa-spinner fa-pulse fa-fw" style={{marginRight:"6px"}}></i>
                    }
                    立即登入
                  </button>
               </dd>
            </dl>
          </form>
        </div>
    )
  }
}

const mapStateToProps=state=>{
  const {postsByPostTitle}=state
  return {
    postsByPostTitle
  }
}
const mapDispatchToProps=(dispatch)=>({
  actions:bindActionCreators(actions,dispatch)
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))
