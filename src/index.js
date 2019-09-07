import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CityStore } from './stores/CityStore';
import { FavoritesStore } from './stores/FavoritesStore';

const cityStore = new CityStore()
const favoritesStore = new FavoritesStore()

const stores = {cityStore, favoritesStore}

ReactDOM.render(<Provider {... stores}>
                    <App />
                </Provider>, document.getElementById('root'));

serviceWorker.unregister();
