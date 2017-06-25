import axios from "axios";

export function getLocation(lat,long){
	return (dispatch)=>{

		let url = "https://maps.googleapis.com/maps/api/geocode/json?address="+lat+"%20"+long+"&key=AIzaSyBtaQ93f1eXlvE8JiUkHF7hsjiJzejUrMQ";

		axios.get(url)
			.then((result) =>{

				if(result.status === 200){

					let addressComponents = result.data.results[0].address_components;
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

						let loc = "";

						Object.keys(locale).forEach((key)=> {
							if(typeof locale[key] !== undefined)
								switch(key){
									case "city":
										loc += locale[key];
										break;
									case "state":
										loc += ", "+locale[key];
										break;
									case "country":
										loc += " "+locale[key];
										break;

									default:
										// Silence is golden
								}
						});

						dispatch({type:"LOCATION",payload: loc});
					});
				}
			});
		}
	}
