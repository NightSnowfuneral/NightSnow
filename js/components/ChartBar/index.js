import React,{Component} from 'react'
import {BarChart} from 'react-d3-components'
import './chartbar.css'

const tooltip = function(x, y0, y, total) {
	return  x+"，"+y.toString();
}

class ChartBar extends Component{
	render(){
		return (
			<div className="chartbar">
				<h3 className="title">{this.props.title}</h3>
				<BarChart
			        data={this.props.data}
			        width={200}
			        height={200}
			        margin={{top: 10, bottom: 30, left: 30, right: 0}}
			        tooltipHtml={tooltip}
			        tooltipContained={true}
			        colorByLabel={false}
			    />
			</div>
		)
	}
}

export default ChartBar