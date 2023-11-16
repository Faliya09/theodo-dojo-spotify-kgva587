import React, { useState, useEffect } from 'react';
import logo from './assets/logo.svg';
import './App.css';

const App = () => {
  const [trackUrls, setTrackUrls] = useState([
    'https://p.scdn.co/mp3-preview/742294f35af9390e799dd96c633788410a332e52',
    'https://p.scdn.co/mp3-preview/5a12483aa3b51331aba663131dbac967ccb33d99',
    'https://p.scdn.co/mp3-preview/31f65b6a613010f22316c7be335b62226cf2f263',
    'https://p.scdn.co/mp3-preview/0f6b8a3524ec410020457da4cdd7717f9addce2f',
    'https://p.scdn.co/mp3-preview/ac28d1b0be285ed3bfd8e9fa5fad133776d7cf36',
  ]);

  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {
    const apiToken = ''; // Assurez-vous de remplir votre jeton d'API Spotify ici

    const fetchTracks = async () => {
      try {
        const response = await fetch('https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + apiToken,
          },
        });

        if (!response.ok) {
          throw new Error(`Fetching tracks failed with status ${response.status}`);
        }

        const data = await response.json();
        const trackItems = data.items.map((item) => item.track.preview_url).filter(Boolean);
        setTrackUrls(trackItems);
      } catch (error) {
        console.error('Error fetching tracks:', error.message);
      }
    };

    fetchTracks();
  }, []); // Le tableau de dépendances vide assure que cela s'exécute uniquement lors du montage initial.

  const goToNextTrack = () => {
    setTrackIndex((prevIndex) => (prevIndex + 1) % trackUrls.length);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur le blind test</h1>
      </header>
      <div className="App-images">
        <p>Il va falloir modifier immédiatement le code pour faire un vrai blind test !</p>
      </div>
      <div className="App-buttons">
        <audio src={trackUrls[trackIndex]} autoPlay controls />
        <button onClick={goToNextTrack}>Next track</button>
      </div>
    </div>
  );
};

export default App;


