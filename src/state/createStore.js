import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

function profileReducer(profile = { 'name': 'Oliver Cheok' }, action) {
    switch (action.type) {
        default:
            return profile
    }
}

const rootReducer = combineReducers({ profile: profileReducer})

// preloadedState will be passed in by the plugin
export default preloadedState => {
    return createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
};