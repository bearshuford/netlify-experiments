import React, { useState, useEffect, useContext } from 'react';
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
  const [series, setSeries] = useState('');
  const [credits, setCredits] = useState('');
  const [title, setTitle] = useState('');

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
            setTimeout(() => { joypad.vibrate(gamepad, defaultVibrate) }, 900);
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
    {!!title && <h1>{title}</h1>}
    {
      !!series ?
        <SeriesDetails
          id={series}
          closeDetails={() => setSeries('')}
        />
        : !!credits ?
          <Credits
            id={credits}
            closeDetails={() => { setCredits(''); setTitle(''); }}
            setSeries={id => setSeries(id)}
          />
          :
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
              <SearchResults
                query={query}
                setSeries={id => setSeries(id)}
                setCredits={(id, title) => { setCredits(id); setTitle(title); }}
              />
            }
          </>
    }

    <ToastContainer />
  </div>
};

export default App;