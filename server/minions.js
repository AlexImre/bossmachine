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
  const newMinion = {
    name: req.body.name,
    title: req.body.title,
    salary: Number(req.body.salary),
    weaknesses: req.body.weaknesses
}
  const newMinionAdded = addToDatabase('minions', newMinion);
  res.status(201).send(newMinionAdded);
})

// Get minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
  const minionId = req.params.minionId;
  const allMinions = getAllFromDatabase('minions');
  
  // Fail if ID is not a number
  if (isNaN(minionId)){
    const error = new Error('Id is non-numeric');
    error.status = 404;
    return next(error);
  }
  
  // Fail if ID not in array
  if(!allMinions[minionId]) {
    const error = new Error('Invalid Id');
    error.status = 404;
    return next(error);
  }

  const minion = getFromDatabaseById('minions', minionId);
    res.status(200).send(minion);
})

// Update minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  minion.name = req.body.name;
  minion.title = req.body.title;
  minion.salary = req.body.salary;
  minion.weakness = req.body.weakness;
  const allMinions = getAllFromDatabase('minions');

  // Fail if ID is not a number
  if (isNaN(minion.id)){
    const error = new Error('Id is non-numeric');
    error.status = 404;
    return next(error);
  }
  
  // Fail if ID not in array
  if(!allMinions[minion.id]) {
    const error = new Error('Invalid Id');
    error.status = 404;
    return next(error);
  }

  updateInstanceInDatabase('minions', minion);
  res.status(200).send(minion);
})

// Delete a minion
minionsRouter.delete('/:minionId', (req, res, next) => {
  const minionId = req.params.minionId;
  const allMinions = getAllFromDatabase('minions');

  // Fail if ID is not a number
  if (isNaN(minionId)){
    const error = new Error('Id is non-numeric');
    error.status = 404;
    return next(error);
  }
  
  // Fail if ID not in array
  if(!allMinions[minionId]) {
    const error = new Error('Invalid Id');
    error.status = 404;
    return next(error);
  }

  deleteFromDatabasebyId('minions', minionId);
  res.status(204).send();
})
