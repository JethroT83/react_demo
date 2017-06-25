export default (state={
	description:"",
	temp:"",
	sun:"",
	coord:"",
	wind:{speed:0,deg:0},
	halt:true
}, action) => {

	switch(action.type){

		//case "q":
			//state = {...state,q:action.q}
			//return state;

		case 'weather':
			state ={...state,
				description: action.payload.data.weather[0].description,
				temp:action.payload.data.main,
				sun:action.payload.data.sys,
				coord:action.payload.data.coord,
				wind:action.payload.data.wind
			};
			return state;

		case 'HALT':
			state ={...state,
					halt:action.payload
				};
			return state;
		default:
			return state;

	}
}