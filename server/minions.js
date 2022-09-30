const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

const { getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');


// Get all minions
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).send(minions);
})

// Create a minion
minionsRouter.post('/', (req, res, next) => {
  // id assignment taken care of by DB??
  const newMinion = req.body;
  addToDatabase('minions', newMinion);
  res.status(201).send(newMinion);
})

// Get minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
  const minionId = String(req.params.minionId);
  console.log(`minion Id is: ${minionId}`);
  const minion = getFromDatabaseById('minions', minionId);
  res.status(200).send(minion);
})

// Update minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = req.body;
  updateInstanceInDatabase('minions', updatedMinion);
  res.status(200).send(updatedMinion);
})

// Delete a minion
minionsRouter.delete('/:minionId', (req, res, next) => {
  const minionId = String(req.params.minionId)
  deleteFromDatabasebyId('minions', minionId);
  res.status(204).send();
})
