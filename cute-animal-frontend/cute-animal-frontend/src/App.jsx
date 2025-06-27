import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/videos')
      .then(res => {
        setVideos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching videos", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <h1>Cute Animal Videos 🐾</h1>
      {loading && <p>Loading videos...</p>}
      <div className="videos">
        {videos.map(video => (
          <div key={video.id.videoId} className="video-card">
            <h4>{video.snippet.title}</h4>
            <iframe
              width="300"
              height="200"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allowFullScreen
              title={video.snippet.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
