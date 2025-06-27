const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.use(require('cors')());

app.get('/api/videos', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: YOUTUBE_API_KEY,
        q: 'cute animals',
        part: 'snippet',
        maxResults: 10,
        type: 'video',
        safeSearch: 'strict',
      },
    });
    res.json(data.items);
  } catch (err) {
    console.error('Error fetching videos:', err.message);
    res.status(500).send('Error fetching videos');
  }
});

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
