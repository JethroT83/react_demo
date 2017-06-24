export default (state={
	description:"",
	temp:"",
	sun:"",
	coord:"",
	wind:{speed:0,deg:0}
}, action) => {
//console.log(state);
console.log(action);
	switch(action.type){

		case "test":
			return {test:"this shit works"}

		case "q":
			state = {...state,q:action.q}
			return state;

		case 'weather':
			console.log(action.payload.data);
			state ={...state,
				description: action.payload.data.weather[0].description,
				temp:action.payload.data.main,
				sun:action.payload.data.sys,
				coord:action.payload.data.coord,
				wind:action.payload.data.wind
			};
			console.log(state)
			return state;

		default:
			return state;

	}
}