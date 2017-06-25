import moment from 'moment-timezone';
import axios from "axios";

export function getTemperature(temp){
	if(typeof temp.temp !== 'undefined'){
		return (dispatch)=>{
			let payload = {};
			payload.high 		= Math.round((9/5) * (temp.temp_max - 273) + 32,1);
			payload.low         = Math.round((9/5) * (temp.temp_min - 273) + 32,1);
			payload.temp 		= Math.round((9/5) * (temp.temp - 273) + 32,1);
			payload.humidity 	= temp.humidity;
			payload.pressure 	= temp.pressure;

			dispatch({type:"TEMPINFO",payload:payload});
		}
	}
}


export function  getSunRiseSet(lat,long,sun){
	return (dispatch)=>{
		let url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+long+"&timestamp=1458000000&key=AIzaSyDbapD11ArZHjF38_AbfRgPgnzZz8MXACY";

		return axios.get(url)
			.then(result=> {
				if(result.status === 200){

					//Get timeZone
					let timeZone = result.data.timeZoneId;

					let payload = {};

					//Get Sunrise time
					let sr = sun.sunrise * 1000;
					payload.sunrise = moment.tz(sr,timeZone).format('h:mm:ss A');

					//Get Sunset time
					let ss = sun.sunset * 1000;
					payload.sunset = moment.tz(ss,timeZone).format('h:mm:ss A');

					dispatch({type:"SUN",payload:payload});	
				}
				
			});

	}
}


import DefaultBackground from '../assets/default.jpg';
import SunnyBackground from '../assets/sunny.jpg';
import FewCloudsBackground from '../assets/few_clouds.jpg';
import BrokenCloudsBackground from '../assets/broken_clouds.jpg';
import OvercastCloudsBackground from "../assets/overcast_clouds.jpg";
import MistBackground from "../assets/mist.jpg";
import LightRainBackground from "../assets/light_rain.jpg";
import RainBackground from "../assets/rain.jpg";
import Thunderstorm from "../assets/thunderstorm.jpg";

export function getBackground(weather){
	return (dispatch)=>{
		switch(weather){

			case "sunny":
				dispatch({type:"BACKGROUND",payload:`url(${SunnyBackground})`});
				break;

			case "clear sky":
				dispatch({type:"BACKGROUND",payload:`url(${SunnyBackground})`});
				break;

			case "few clouds":
				dispatch({type:"BACKGROUND",payload:`url(${FewCloudsBackground})`});
				break;

			case "scattered clouds":
				dispatch({type:"BACKGROUND",payload: `url(${FewCloudsBackground})` });
				break;

			case "broken clouds":
				dispatch({type:"BACKGROUND",payload: `url(${BrokenCloudsBackground})`});
				break;

			case "overcast clouds":
				dispatch({type:"BACKGROUND",payload: `url(${OvercastCloudsBackground})`});
				break;

			case "mist":
				dispatch({type:"BACKGROUND",payload: `url(${MistBackground})`});
				break;

			case "light rain":
				dispatch({type:"BACKGROUND",payload: `url(${LightRainBackground})`});
				break;

			case "rain":
				dispatch({type:"BACKGROUND",payload: `url(${RainBackground})`});
				break;

			case "thunderstorm":
				dispatch({type:"BACKGROUND",payload: `url(${Thunderstorm})`});
				break;

			default:
				dispatch({type:"BACKGROUND",payload:`url(${DefaultBackground})`})

		}
		
	}
}	