import React, { Component } from 'react';

import '../styles/Search.css';

class Search extends Component {

	constructor(props){
		super(props);
    	this.state = {
      		q: ""
    	};
    	this.fetching = false;
    	this.getWeather= this.getWeather.bind(this);
	}

	getWeather(evt){

		this.setState({
			q: evt.target.value
		});

		let url = "http://api.openweathermap.org/data/2.5/weather?q="+evt.target.value+"&APPID=c6572f189031f383fca2ba6d67ac690a";
		if(this.fetching === false){
			this.fetching = true;
			return fetch(url) 
				.then(result=>result.json())
				.then(result=> {
					this.fetching = false;
					/*this.setState({items:result.json()});*/
					console.log(result);

					this.setState({
						r: result
					});
			});
		}
	}


	render(){
		return (<div>
		<h1>Don't know what the data will look like </h1>
		<input value={this.state.q} onChange={this.getWeather}/>
		</div>);
	}
}


export default Search;
