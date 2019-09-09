import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CityStore } from './stores/CityStore';
import { FavoritesStore } from './stores/FavoritesStore';
import { NavStore } from './stores/NavStore';

const cityStore = new CityStore()
const favoritesStore = new FavoritesStore()
const navStore = new NavStore()

const stores = {cityStore, favoritesStore, navStore}

ReactDOM.render(<Provider {... stores} >
                    <App />
                </Provider>, document.getElementById('root'));

serviceWorker.unregister();
