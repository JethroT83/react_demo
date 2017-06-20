export default (state={}, action) => {
//console.log(state);
console.log(action);
	switch(action.type){

		case "q":
			state = {...state,q:action.q}
			return state;

		case 'SEARCH':
			state ={...state,
				weather: action.search.weather[0].description,
				temp:action.search.main,
				sun:action.search.sys,
				coord:action.search.coord,
				wind:action.search.wind
			};
			return state;

		default:
			return state;

	}
}