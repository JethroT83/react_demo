import DefaultBackground from '../assets/default.jpg';

export default (state={
	location:"",
	temperature: {temp:0,high:0,low:0,humidity:0,pressue:0},
	sun:{sunrise:0,sunset:0},
	background: `url(${DefaultBackground})`
}, action) => {

	switch(action.type){

		case 'LOCATION':
			state ={...state,
				location: action.payload
			};
			return state;

		case 'TEMPINFO':
			state = {...state,
				temperature: action.payload}
			return state;

		case 'SUN':
			state = {...state,
				sun: action.payload}
			return state;

		case 'BACKGROUND':
			state = {...state,
				background: action.payload}
			return state;


		default:
			return state;

	}
}