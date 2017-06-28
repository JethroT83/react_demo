import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import arrow from '../assets/arrow.png';
import {TweenLite} from "gsap";

//Styles
import '../styles/Style.css';

class Wind extends Component {

	componentWillReceiveProps(){

		this.arrowStyle = {
			height: '4em',
		}

		let direction = ReactDOM.findDOMNode(this.refs.direction);
		TweenLite.to(direction, 2, {rotation:this.props.wind.deg});

		console.log(this.props.wind.deg);
	}


	render(){
		return(
			<div>		
				<div className="col-xs-6">
					<span className="font" >Wind: {this.props.wind.speed}</span>
				</div>
				<div className="col-xs-6" >
					<img ref="direction" id='arrow' src={arrow} alt='oops'/>
				</div>
			</div>
			);
	}
}

export default connect((store)=>{return {wind:store.weatherReducer.wind};})(Wind)