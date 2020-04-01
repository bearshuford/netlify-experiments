import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { SearchResults, SeriesDetails, Credits } from './components';
import { AuthContext } from './AuthContext';
import './App.css';

const defaultVibrate = {
  startDelay: 500,
  duration: 400,
  weakMagnitude: 0,
  strongMagnitude: .5,
};

function App() {
  const [query, setQuery] = useState('');

  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const joypad = window.joypad;
    if (!!joypad) {
      joypad.on('connect', ({ gamepad }) => {
        joypad.vibrate(gamepad, defaultVibrate);
        toast('gamepad connected', { type: toast.TYPE.SUCCESS })
      });

      joypad.on('button_press', e => {
        const { buttonName, gamepad: { buttons }, gamepad } = e.detail;

        // shoulder buttons
        if (buttonName === 'button_4' || buttonName === 'button_5') {
          if (buttons[4].pressed && buttons[5].pressed) {
            joypad.vibrate(gamepad, { ...defaultVibrate, strongMagnitude: .3, startDelay: 50 });
            setTimeout(() => { joypad.vibrate(gamepad, { ...defaultVibrate, strongMagnitude: 1, startDelay: 50, duration: 100 }) }, 700);
           }
        }
      });
    }
  }, []);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('userKey');
      if (!!item) setAuth(item);
    } catch (error) { }
  }, []);

  return <div className='app'>
    <Router>
      <Route path='/series/:id' component={SeriesDetails} />
      <Route path='/person/:id' component={Credits} />
      <Route path='/' exact>
        <>
          <label>
            search for movies and tv shows
          </label>
          <input
            autoFocus
            onChange={({ target }) => setQuery(target.value)}
            value={query}
            tabIndex='0'
          />
          {query && query.length > 0 &&
            <SearchResults query={query} />
          }
        </>
      </Route>
    </Router>
    <ToastContainer />
  </div>
};

export default App;