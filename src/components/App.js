import React, { Component } from 'react';
//import {combineReducers, createStore} from 'redux';
import {connect} from "react-redux";

import DefaultBackground from '../assets/default.jpg';
import SunnyBackground from '../assets/sunny.jpg';
import FewCloudsBackground from '../assets/few_clouds.jpg';
import BrokenCloudsBackground from '../assets/broken_clouds.jpg';
import OvercastCloudsBackground from "../assets/overcast_clouds.jpg";
import MistBackground from "../assets/mist.jpg";
import LightRainBackground from "../assets/light_rain.jpg";
import RainBackground from "../assets/rain.jpg";
import Thunderstorm from "../assets/thunderstorm.jpg";


import Wind from "./Wind";

import moment from 'moment-timezone';

import '../styles/App.css';



//Actions
import {getWeather} from '../actions/weather.js';

class App extends Component {

	constructor(props){
		super(props);
console.log(this.props);
//console.log(this.getStore());
		this.state = {
			q: "",
			weather:"",
			temp:"",
			sun:"",
			coord:"",
			wind:""
		};
    	this.fetching = false;

		this.sectionStyle = {
			width: "100%",
			height: "1000px",
			backgroundImage: `url(${DefaultBackground})`,
			color:'#ffffff',
			fontSize:'2em',
			'text-shadow': '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
		};

		this.location = "";

		this.getLocation    = this.getLocation.bind(this);
		this.getWeather		= this.getWeather.bind(this);
		this.getTemperature	= this.getTemperature.bind(this);
		this.getSunRiseSet	= this.getSunRiseSet.bind(this);
		//this.getWind		= this.getWind.bind(this);
		this.changeBackground= this.changeBackground.bind(this);

		this.handleGetWeather=this.handleGetWeather.bind(this);
	}

	getWeather(evt){
		//store.dispatch({
			//type:"q",q:evt.target.value
		//})

		this.setState({
			q:evt.target.value
		});


		let url = "http://api.openweathermap.org/data/2.5/weather?q="+evt.target.value+"&APPID=c6572f189031f383fca2ba6d67ac690a";
		if(this.fetching === false){
			this.fetching = true;
			return fetch(url) 
				.then(result=>result.json())
				.then(result=> {
					this.fetching = false;
					//console.log(result);
					if(result.cod === 200){

						//store.dispatch({
						//	type:"SEARCH",search:result
						//})


						this.setState({
							weather: result.weather[0].description,
							temp:result.main,
							sun:result.sys,
							coord:result.coord,
							wind:result.wind
						});
						this.getLocation();
						this.getTemperature();
						this.getSunRiseSet();
						//this.getWind();
					}

				});
		}
	}

	handleGetWeather(evt){

		this.setState({
			q:evt.target.value
		});
//console.log(this.props.dispatch())
		//getWeather(evt.target.value)
		this.props.dispatch(getWeather(evt.target.value));

		console.log(this.props);
	}


	getLocation(){
//console.log(store.getState());
		let long = this.state.coord.lon;
		let lat  = this.state.coord.lat;
		let url = "https://maps.googleapis.com/maps/api/geocode/json?address="+lat+"%20"+long+"&key=AIzaSyBtaQ93f1eXlvE8JiUkHF7hsjiJzejUrMQ";
		return fetch(url) 
		.then(result=>result.json())
		.then(result=> {

			if(result.status === "OK"){
				let addressComponents = result.results[0].address_components;
				//let city, state, country;
				let locale = {"city":"","state":"","country":""};

				addressComponents.forEach((component, i)=>{

					// Get City
					if(component.types.indexOf("locality") !== -1){
						locale.city = component.long_name;
					}

					//Get State
					if(component.types.indexOf("administrative_area_level_1") !== -1){
						locale.state = component.long_name;
					}

					//Get Country
					if(component.types.indexOf("country") !== -1){
						locale.country = component.long_name;
					}
					this.location = "";

					Object.keys(locale).forEach((key)=> {
						if(typeof locale[key] !== undefined)
							switch(key){
								case "city":
									this.location += locale[key];
									break;
								case "state":
									this.location += ", "+locale[key];
									break;
								case "country":
									this.location += " "+locale[key];
									break;

								default:
									// Silence is golden
							}
					});
				});

			}
		});
	}



	// Temp given in Kelvin  F = 9/5 (K - 273) + 32
	getTemperature(){	

		this.high 		= Math.round((9/5) * (this.state.temp.temp_max - 273) + 32,1);
		this.low        = Math.round((9/5) * (this.state.temp.temp_min - 273) + 32,1);
		this.temp 		= Math.round((9/5) * (this.state.temp.temp - 273) + 32,1);
		this.humidity 	= this.state.temp.humidity;
		this.pressure 	= this.state.temp.pressure;

			//console.log("this.temp-->"+this.temp + "---this.high-->"+ this.high + "---this.low--"+ this.low + "---this.humidity--"+ this.humidity + "---pressure--"+ this.pressure);
	}


	getSunRiseSet(){

		let long = this.state.coord.lon;
		let lat  = this.state.coord.lat;
		let url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+long+"&timestamp=1458000000&key=AIzaSyDbapD11ArZHjF38_AbfRgPgnzZz8MXACY";

		return fetch(url)
				.then(result=>result.json())
				.then(result=> {

					//Get timeZone
					let timeZone = result.timeZoneId;

					//Get Sunrise time
					let sr = this.state.sun.sunrise * 1000;
					this.sunrise = moment.tz(sr,timeZone).format('h:mm:ss A');

					//Get Sunset time
					let ss = this.state.sun.sunset * 1000;
					this.sunset = moment.tz(ss,timeZone).format('h:mm:ss A');
				});

	}




	changeBackground(){
//console.log(this.state.weather)

		switch(this.state.weather){

			case "sunny":
				this.sectionStyle.backgroundImage = `url(${SunnyBackground})`
				break;

			case "clear sky":
				this.sectionStyle.backgroundImage = `url(${SunnyBackground})`
				break;

			case "few clouds":
				this.sectionStyle.backgroundImage = `url(${FewCloudsBackground})`
				break;

			case "scattered clouds":
				this.sectionStyle.backgroundImage = `url(${FewCloudsBackground})`
				break;

			case "broken clouds":
				this.sectionStyle.backgroundImage = `url(${BrokenCloudsBackground})`
				break;

			case "overcast clouds":
				this.sectionStyle.backgroundImage = `url(${OvercastCloudsBackground})`
				break;

			case "mist":
				this.sectionStyle.backgroundImage = `url(${MistBackground})`
				break;

			case "light rain":
				this.sectionStyle.backgroundImage = `url(${LightRainBackground})`
				break;

			case "rain":
				this.sectionStyle.backgroundImage = `url(${RainBackground})`
				//this.fontStyle.color = "#ffffff";
				break;

			case "thunderstorm":
				this.sectionStyle.backgroundImage = `url(${Thunderstorm})`
				break;

			default:
				this.sectionStyle.backgroundImage = `url(${DefaultBackground})`
				//this.fontStyle.color = "#ffffff";
		}
		
//console.log(this.sectionStyle);
	}
							/*<div className='spacer row' />style={'font-size:2em'}*/
    render(){
    	return(	
    			<div>
	    			<header>
	    				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
	    				<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script>
	    			</header>
	    			<section onChange={this.changeBackground} style={this.sectionStyle}>
	    				<div className='col-xs-12 ui grid'>
							<div className='row'>
								<div className='col-xs-offset-2'>
									<h1>Weather App</h1>
								</div>
							</div>
							<div className='row'>
								<br/>
							</div>
							<div className='row'>
								<div className='col-xs-9'>
									<div className='col-xs-3'>
										<span>Search:</span>
									</div>
									<div className='col-xs-6'>
										<input className='form-control' value={this.state.q/*store.getState().q*/} onChange={this.handleGetWeather}/>
									</div>
								</div>
							</div>
							<div className='row'>
								<br/>
							</div>
							<div className='row'>
								<span>Location: {this.location}</span>
							</div>
							<div className='row'>
								<div className="col-xs-6">
									<span>Current Temp: {this.temp}F°</span>
								</div>
								<div className='col-xs-3'>
									<span>Low/High:{this.low}/{this.high}F°</span>
								</div>
							</div>
							<div className='row'>
								<div className="col-xs-6">
									<span>Humidity: {this.humidity}%</span>
								</div>
								<div className="col-xs-6">
									<span>Pressure: {this.pressure}</span>
								</div>
							</div>
							<div className='row'>
								<div className="col-xs-6">
									<span>Sunrise: {this.sunrise}</span>
								</div>
								<div className="col-xs-6">
									<span>Sunset: {this.sunset}</span>
								</div>
							</div>
							<div className='row'>
								<Wind onChange={this.state.wind} wind={this.state.wind}/>
							</div>
				    	</div>
				    </section>
			    </div>
			   );
    }
}



export default connect((store)=>{return {weather:store.weatherReducer};})(App);
//export default App;