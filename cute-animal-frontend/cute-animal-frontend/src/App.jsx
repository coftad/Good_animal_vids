import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://good-animal-vids-4.onrender.com/api/videos')
      .then(res => {
        setVideos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching videos", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (e) => {
  e.preventDefault();
  if (!searchTerm.trim()) return;
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get(`https://your-render-api.onrender.com/api/videos?q=${encodeURIComponent(searchTerm)}`);
    setVideos(response.data);
  } catch (err) {
    console.error('Error fetching videos:', err);
    setError('Failed to load videos');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app">
      <h1>Cute Animal Videos 🐾</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search for animals (e.g. puppies, otters)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '16px',
            width: '300px',
            marginRight: '10px',
          }}
       />
       <button type="submit" style={{ padding: '8px 16px' }}>
          Search
       </button>
     </form>
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
