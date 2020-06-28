import INITIAL_STATE from './initialState'

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        default: 
            return {
                ...state
            }
    }
}