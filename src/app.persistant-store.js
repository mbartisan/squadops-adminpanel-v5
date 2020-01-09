import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from './app.reducers';

const middleware = [thunk];
const enhancers = [];
const initialState = {};

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

export default () => {
    const store = createStore(persistedReducer, initialState, composedEnhancers);
    return { store, persistor: persistStore(store) };
};
