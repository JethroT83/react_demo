import React, { Component } from 'react';
import {connect} from "react-redux";

//Styles
import '../styles/App.css';

//Components
import Wind from "./Wind";

//Actions
import {getWeather} from '../actions/weather.js';
import {getLocation} from '../actions/location.js';
import {getTemperature, getSunRiseSet, getBackground} from '../actions/auxActions.js';

class App extends Component {

	constructor(props){
		super(props);

		this.handleGetWeather=this.handleGetWeather.bind(this);
		this.handleInfo = this.handleInfo.bind(this);

	}

	componentWillMount(){

		this.state = {
			q: "",
		};

		this.sectionStyle = {
			width: "100%",
			height: "1000px",
			backgroundImage: this.props.info.background,
			color:'#ffffff',
			fontSize:'2em',
			'text-shadow': '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
		};

	}


	handleGetWeather(evt){

		this.setState({
			q:evt.target.value
		});

		//Takes the search and returns the weather from API service
		this.props.dispatch(getWeather(evt.target.value));
	}

	componentWillReceiveProps(){
		if(this.props.weather.halt !== true){
			this.props.weather.halt = true;
			this.handleInfo();
		}
	}


	handleInfo(){
			// Calls Google API for the location
			let lat = this.props.weather.coord.lat;
			let long = this.props.weather.coord.lon;

			this.props.dispatch(getLocation(lat,long));

			// Adjusts Sunrise/Set based on timezone of coordinates
			this.props.dispatch(getSunRiseSet(lat,long,this.props.weather.sun));

			//Converts the Celvin to Fahrenheit
			this.props.dispatch(getTemperature(this.props.weather.temp));

			//Gets Background for the weather
			this.props.dispatch(getBackground(this.props.weather.description));
			this.sectionStyle = {...this.sectionStyle,
									backgroundImage: this.props.info.background};

	}


    render(){
    	return(	
    			<div>
	    			<header>
	    				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
	    				<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script>
	    			</header>
	    			<section  style={this.sectionStyle}>
	    				<div className='col-xs-12 ui grid'>
							<div className='row'>
								<div className='col-xs-offset-2'>
									<h1>Weather App</h1>
								</div>
							</div>
							<div className='row'>
								<div className='col-xs-9'>
									<div className='col-xs-3'>
										<span>Search:</span>
									</div>
									<div className='col-xs-6'>
										<input className='form-control' value={this.state.q} onChange={this.handleGetWeather}/>
									</div>
								</div>
							</div>
							<div className='row'>
								<div className="col-xs-12">
									<span>Location: {this.props.info.location}</span>
								</div>
							</div>

							<div className='row'>
								<div className='col-xs-12'>
									<span>Description: {this.props.weather.description}</span>
								</div>
							</div>

							<div className='row'>
								<div className="col-xs-6">
									<span>Current Temp: {this.props.info.temperature.temp}F°</span>
								</div>
								<div className='col-xs-3'>
									<span>Low/High:{this.props.info.temperature.low}/{this.props.info.temperature.high}F°</span>
								</div>
							</div>
							<div className='row'>
								<div className="col-xs-6">
									<span>Humidity: {this.props.info.temperature.humidity}%</span>
								</div>
								<div className="col-xs-6">
									<span>Pressure: {this.props.info.temperature.pressure}</span>
								</div>
							</div>


							<div className='row'>
								<div className="col-xs-6">
									<span>Sunrise: {this.props.info.sun.sunrise}</span>
								</div>
								<div className="col-xs-6">
									<span>Sunset: {this.props.info.sun.sunset}</span>
								</div>
							</div>


							<div className='row'>
								<Wind/>
							</div>
				    	</div>
				    </section>
			    </div>
			   );
    }
}

export default connect((store)=>{return {weather:store.weatherReducer,info:store.infoReducer};})(App);
