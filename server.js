const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;



// Middleware
app.use(bodyParser.json());
app.use(cors());






// Route to handle data
app.post('/index', (req, res) => {
      const newData = req.body;

      // Write the new data (which is the entire table) to the file
      fs.writeFile('data.json', JSON.stringify(newData, null, 2), (err) => {
          if (err) {
              console.error('Error writing to data.json:', err);
              return res.status(500).send('Internal Server Error');
          }
          res.status(200).send('Data saved successfully!');
      });
  });








// Start the server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});

