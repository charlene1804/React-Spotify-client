// createStore provient du package redux
import { applyMiddleware, createStore } from 'redux';

// sert à afficher nos devtools redux
import { composeWithDevTools } from 'redux-devtools-extension';
import searchMiddleware from '../middlewares/search';

// on importe notre reducer
import reducer from './reducer';

// on crée l'instance de notre store
const store = createStore(
  reducer,
  // fait marcher les devtools
  composeWithDevTools(
    applyMiddleware(searchMiddleware),
  ),
);

// et on l'exporte
export default store;
