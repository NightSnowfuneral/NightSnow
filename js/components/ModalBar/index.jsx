import React,{Component} from 'react'
import { Modal, Button,Spin } from 'antd'
import FormBar from '../FormBar'
import './modalbar.css'

class ModalBar extends Component{
	handleOk(){
		this.props.closeModal()
	}
	handleCancel(e){
		this.props.closeModal()
	}
	render(){
		return (
			<Modal
				width={this.props.modalWidth}
				title={this.props.modalTitle}
				visible={this.props.visible}
				wrapClassName="vertical-center-modal"
				onOk={this.handleOk.bind(this)}
				onCancel={this.handleCancel.bind(this)}
				footer={false}
			>
				<FormBar 
					modalVisible={this.props.visible}
					closeModal={this.handleCancel.bind(this)}
					modalVisible={this.props.visible}
					request={this.props.request}
				/>
			</Modal>
		)
	}
}

export default ModalBar