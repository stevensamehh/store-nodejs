const express = require('express');
const apiRoutes = require('./routes/api');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON request bodies

// Register API routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
