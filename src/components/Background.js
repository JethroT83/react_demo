import React, { Component } from 'react';

import SunnyBackground from '../assets/sunny.jpg';
import partlyCloudlyBackground from '../assets/partlyCloudly.png';


class Background extends Component {

	constructor(props){
		super(props);


		this.sectionStyle = {
			width: "100%",
			height: "1000px",
			backgroundImage: `url(${SunnyBackground})`
		};
	}


	changeBackground(){
		console.log(" parent function...");
		console.log(this.props);

		switch(this.props.sky){

			case "sunny":
				this.sectionStyle.backgroundImage = `url(${SunnyBackground})`
				break;


		}

	}

	render(){

		return (<section onChange={this.changeBackground} style={this.sectionStyle}></section>)

	}

}

export default Background;