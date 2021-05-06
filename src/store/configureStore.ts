import { applyMiddleware, createStore, Store, Middleware, compose } from 'redux';
import { History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import getReducer from './reducers';
import sagas from './sagas';

const initialState = undefined;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof composeWithDevTools;
    store?: () => Store;
  }
}

interface StoreConfig {
  isDevelopment: boolean;
}

export default function configureStore(history: History, config: StoreConfig) {
  let middlewares;
  let store: Store;
  const sagaMiddleware = createSagaMiddleware();
  const reducer = getReducer(history);
  const middlewareList: Middleware[] = [routerMiddleware(history), sagaMiddleware];

  if (config.isDevelopment) {
    middlewares = composeWithDevTools(applyMiddleware(...middlewareList));
    store = createStore(reducer, initialState, middlewares);

    if (module.hot) {
      module.hot.accept('store/index', () => {
        // eslint-disable-next-line
        const nextGetReducer = require('store/index').default;
        store.replaceReducer(nextGetReducer(history));
      });
    }

    window.store = () => store;
  } else {
    middlewares = compose(applyMiddleware(...middlewareList));
    store = createStore(reducer, initialState, middlewares);
  }

  sagaMiddleware.run(sagas);
  return store;
}
