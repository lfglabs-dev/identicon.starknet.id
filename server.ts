import express from 'express';
import Identicons from 'starknetid-identicons';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Load the identicons.min.svg file
const svgPath = path.join(__dirname, 'public', 'identicons.min.svg');
Identicons.svgPath = svgPath;

// Serve generated SVG image at the root URL
app.get('/:tokenId', async (req, res) => {
  const { tokenId } = req.params;
  if (!tokenId) {
    return res.status(400).send('TokenId is required');
  }
  try {
    const svg = await Identicons.svg(tokenId);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
  } catch (error) {
    res.status(500).send('Error generating SVG');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
