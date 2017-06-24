import React, { Component } from 'react';
import {connect} from "react-redux";
import arrow from '../assets/arrow.jpg';
//import {TweenMax, Power2, TimelineLite} from "gsap";
//import {TweenMax} from "gsap";
//import TweenMax from 'react-gsap-enhancer';
//import '../styles/Wind.css';

class Wind extends Component {

	//constructor(props){
		//super(props);

		//this.arrowStyle = {}
	//}



	render(){
		return(
			<div>		
				<div className="col-xs-6">
					<span className="font" >Wind: {this.props.wind.speed}</span>
				</div>
				<div className="col-xs-6">
					<img ref="direction" src={arrow} alt='oops'/>
				</div>
			</div>
			);
	}
}

export default connect((store)=>{return {wind:store.weatherReducer.wind};})(Wind);