import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    FETCH_RESULTS_SUCCESS,
    FETCH_RESULTS_ERROR,
    DEFAULT_LOCATION,
    SEARCH_LOCATION
} from '../actions/protected-data';


const initialState = {
    results: [],
    data: '',
    error: null,
    location: {
      lat: 37.782,
      lng: -122.403
    }
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if(action.type === FETCH_RESULTS_SUCCESS) {
        return Object.assign({}, state, {
            results: action.results
        });
    } else if(action.type === FETCH_RESULTS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if(action.type === DEFAULT_LOCATION) {
        return Object.assign({}, state, {
            location: action.location
        });
    } else if(action.type === SEARCH_LOCATION) {
        return Object.assign({}, state, {
            location: action.location
        });
    }
    return state;
}
