import Promise from 'native-promise-only' 
import 'whatwg-fetch'

const Ajax=function(options){
	this.service=options.service
	this.fun=sessionStorage.LoginId?options.fun.indexOf("&")==-1?options.fun+"?loginId="+sessionStorage.LoginId:options.fun.substring(0,options.fun.indexOf("&"))+"?loginId="+sessionStorage.LoginId+options.fun.substring(options.fun.indexOf("&")):options.fun
	this.url="http://192.168.1.5:8070/BlockLogicRequest.ashx"
	this.data=options.data || ""
}
Ajax.prototype.CreateRequestDataOnGet=function(){
	const json={
		method:"GET",
		service:this.service,
		fun:this.fun
	}
	return json
}
Ajax.prototype.CreateRequestDataOnPost=function(){
	const json={
		method:"POST",
		service:this.service,
		fun:this.fun,
		data:this.data
	}
	return json
}
Ajax.prototype.get=function(){
	const p=new Promise((resolve,reject)=>{
		fetch(this.url,{
			method: "POST",
			headers: {
			    "Content-Type": "application/json",
			},
			mode: "cors",
			body:JSON.stringify(this.CreateRequestDataOnGet())
		})
		.then((response)=>response.json())
		.then((json)=>{resolve(json)})
		.catch((error)=>{console.log(error)})
	})
	return p
	
}
Ajax.prototype.post=function(){
	const promise=new Promise((resolve,reject)=>{
		fetch(this.url,{
			method:"POST",
			headers: {
			    "Content-Type": "application/json",
			},
			mode: "cors",
			body:JSON.stringify(this.CreateRequestDataOnPost())
		})
		.then((response)=>response.json())
		.then((json)=>{resolve(json)})
		.catch((error)=>{console.log(error)})
	})
	return promise
}

export default Ajax