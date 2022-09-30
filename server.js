const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase } = require('./server/db.js');

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Logging
app.use(morgan('short'));

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// Get all minions
apiRouter.get('/minions', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).send(minions);
})

// Create a minion
apiRouter.post('/minions', (req, res, next) => {
  // id assignment taken care of by DB??
  const newMinion = req.body;
  addToDatabase('minions', newMinion);
  res.status(201).send(newMinion);
})

// Get minion by id
apiRouter.get('/minions/:minionId', (req, res, next) => {
  const minionId = String(req.params.minionId);
  console.log(`minion Id is: ${minionId}`);
  const minion = getFromDatabaseById('minions', minionId);
  res.status(200).send(minion);
})

// Update minion by id
apiRouter.put('/minions/:minionId', (req, res, next) => {
  const updatedMinion = req.body;
  updateInstanceInDatabase('minions', updatedMinion);
  res.status(200).send(updatedMinion);
})

// Delete a minion
apiRouter.delete('/minions/:minionId', (req, res, next) => {
  const minionId = String(req.params.minionId)
  deleteFromDatabasebyId('minions', minionId);
  res.status(204).send();
})

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT);
}
