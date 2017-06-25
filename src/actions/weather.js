import axios from "axios";

export function getWeather(search){
	return (dispatch)=>{
		let url = "http://api.openweathermap.org/data/2.5/weather?q="+search+"&APPID=c6572f189031f383fca2ba6d67ac690a";

		axios.get(url)
			.then((result) =>{
				dispatch({type:"weather",payload: result});
				dispatch({type:"HALT",payload: false});
			})
			.catch((err)=>{
				dispatch({type:"HALT",payload: true});
			});
		}
	}
