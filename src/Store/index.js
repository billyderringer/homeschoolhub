import { createStore, combineReducers } from 'redux'
import styleReducer from './Reducers/styleReducer'
import teacherReducer from './Reducers/teacherReducer'
import {loadState, saveState} from './localStorage'

const persistedState = loadState()
const reducer = combineReducers({
    styleReducer,
    teacherReducer
})

const store = createStore(
    reducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    saveState(store.getState())
})

export default store
