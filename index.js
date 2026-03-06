const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.get('/', (req, res) => res.send('Cloudinary Server is Live! 🚀'));

app.post('/delete-image', async (req, res) => {
  const { publicId } = req.body;
  
 
  const clientApiKey = req.headers['x-api-key'];

  
  if (!clientApiKey || clientApiKey !== process.env.MY_DELETE_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Access Denied' });
  }

  if (!publicId) return res.status(400).json({ error: 'Missing publicId' });

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
