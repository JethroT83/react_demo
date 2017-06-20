import React, { Component } from 'react';
import arrow from '../assets/arrow.jpg';
//import {TweenMax, Power2, TimelineLite} from "gsap";
import {TweenMax} from "gsap";
//import TweenMax from 'react-gsap-enhancer';
//import '../styles/Wind.css';

class Wind extends Component {

	constructor(props){
		super(props);
		let mixins= LinkedStateMixin;
		this.state = {
			wind:this.wind
		};

		this.arrowStyle = {

		}
console.log("wind is good -- ",this.props);
//console.log("wind is good -- ",store.getState());

		//this.getLocation    = this.getLocation.bind(this);
	}

	componentDidMount(){
		let node = this.refs.direction.getDOMnode();

		/*TweenMax.from( $('.homeImg > img'), 0.5,
		        {css:{scale:0.05, opacity:0, rotation: 180}, 
		        ease:Quad.easeInOut
		});*/
console.log(this.state.wind);
		TweenMax.from( node, 0.5,{
			css:{scale:0.05, opacity:0, rotation: this.state.wind.deg}
		});
			//ease:Quad.easeInOut
			//TweenMax.from( node, 0.5,{css:{scale:0.05, opacity:0, rotation: 100}});
	}


	render(){
		return(
			<div>		
				<div className="col-xs-6">
					<span className="font" >Wind: {this.props.windSpeed}</span>
				</div>
				<div className="col-xs-6">
					<img ref="direction" src={arrow} alt='oops'/>
				</div>
			</div>
			);
	}
}

export default Wind;