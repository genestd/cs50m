import INITIAL_STATE from './initialState'
import * as actions from './actionTypes'

const movieReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.SET_SEARCH: 
            return {
                ...state,
                searchInput: action.value
            }
        case actions.SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case actions.SET_RESULTS:
            return {
                ...state,
                results: action.results
            }
        case actions.ADD_RESULTS:
            return {
                ...state,
                results: {
                    ...state.results,
                    Search: [
                        ...state.results.Search,
                        ...action.results.Search,
                    ]
                },
                page: action.page
            }
        case actions.SELECT_MOVIE:
            return {
                ...state,
                selectedMovie: state.results.Search.find(mv => mv.imdbID === action.id)
            }
        default:
            return state
    }
}

export default movieReducer