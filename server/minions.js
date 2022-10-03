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
  // Fail if ID is not a number
  if (isNaN(minionId)){
    const error = new Error('Id is non-numeric');
    error.status = 404;
    return next(error);
  }

  const minion = getFromDatabaseById('minions', minionId);
  
  // Fail if ID not in array
  if(minion === null || minion === undefined) {
    const error = new Error('Invalid Id');
    error.status = 404;
    return next(error);
    }
  
    res.status(200).send(minion);
})

// Update minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
  const minionId = req.params.minionId;
  // Fail if ID is not a number
  if (isNaN(minionId)){
    const error = new Error('Id is non-numeric');
    error.status = 404;
    return next(error);
  }

  const minion = getFromDatabaseById('minions', req.params.minionId);

  // Fail if ID not in array
  if(minion === null || minion === undefined) {
    const error = new Error('Invalid Id');
    error.status = 404;
    return next(error);
  }

  minion.name = req.body.name;
  minion.title = req.body.title;
  minion.salary = req.body.salary;
  minion.weakness = req.body.weakness;
  updateInstanceInDatabase('minions', minion);
  res.status(200).send(minion);
})

// Delete a minion
minionsRouter.delete('/:minionId', (req, res, next) => {
  const minionId = req.params.minionId;
  // Fail if ID is not a number
  if (isNaN(minionId)){
    const error = new Error('Id is non-numeric');
    error.status = 404;
    return next(error);
  }
  
  const allMinions = getAllFromDatabase('minions');
  const minion = getFromDatabaseById('minions', minionId);
  // Fail if ID not in array
  if(!allMinions.includes(minion)) {
    const error = new Error('Invalid Id');
    error.status = 404;
    return next(error);
  }

  deleteFromDatabasebyId('minions', minionId);
  res.status(204).send();
})

// ------------------------ FUNCTIONS FOR WORK ------------------------
minionsRouter.get('/:minionId/work', (req, res, next) => {
  const minionId = req.params.minionId;
  if (isNaN(minionId)){
    const error = new Error('Id is non-numeric');
    error.status = 404;
    return next(error);
  }

  const allWork = getAllFromDatabase('work');
  if (allWork === null || allWork === undefined) {
    const error = new Error('invalid id');
    error.status = 404;
    return next(error);
  }
  
  const minionWork = [];
  for (let i = 0; i < allWork.length; i++) {
      if (allWork[i].minionId === minionId){
        minionWork.push(allWork[i]);
      }
  }

  // const minionValidation = getFromDatabaseById('minion', minionId);
  // if (minionValidation === null || minionValidation === undefined) {
  //   const error = new Error('invalid minion id');
  //   error.status = 404;
  //   return next(error);
  // }
  res.status(200).send(minionWork);
});
 





  // if (isNaN(minionId)){
  //   const error = new Error('Id is non-numeric');
  //   error.status = 404;
  //   return next(error);
  // }
  // const workAssignedToMinion = getFromDatabaseById('work', minionId);
  // if (workAssignedToMinion === null || workAssignedToMinion === undefined) {
  //   const error = new Error('invalid id');
  //   error.status = 404;
  //   return next(error);
  // }

minionsRouter.post('/:minionId/work', (req, res, next) => {
  const minionId = req.params.minionId;
  if (isNaN(minionId)){
    const error = new Error('Id is non-numeric');
    error.status = 404;
    return next(error);
  }

  const workObject = {
    title: req.body.title,
    description: req.body.description,
    hours: req.body.hours,
    minionId: minionId
  }
  res.status(201).send(addToDatabase('work', workObject));
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  const workId = req.params.workId;
  const minionId = req.params.minionId;

  if (isNaN(workId)){
    const error = new Error('Id is non-numeric');
    error.status = 404;
    return next(error);
  }

  const workValidation = getFromDatabaseById('work', workId);
  if (workValidation === null || workValidation === undefined) {
    const error = new Error('invalid work id');
    error.status = 404;
    return next(error);
  }

  if (minionId !== req.body.minionId) {
    const error = new Error('minionIds do not match');
    error.status = 400;
    return next(error);
  }

  const workObject = {
    id: workId,
    title: req.body.title,
    description: req.body.description,
    hours: req.body.hours,
    minionId: req.body.minionId
  }

  const updatedWork = updateInstanceInDatabase('work', workObject);
  if (updatedWork === null || updatedWork === undefined) {
    const error = new Error('element not updated');
    error.status = 404;
    return next(error);
  }

  res.status(200).send(updatedWork);

//   2) BONUS: /api/minions/:minionId/work routes
//   PUT /api/minions/:minionId/work/:workId
//     returns a 400 if a work ID with the wrong :minionId is requested:
// Error: expected 400 "Bad Request", got 404 "Not Found"


})

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const workId = req.params.workId;
  if (isNaN(workId)){
    const error = new Error('Id is non-numeric');
    error.status = 404;
    return next(error);
  }

  const deletedWork = deleteFromDatabasebyId('work', workId);
  if (!deletedWork) {
    const error = new Error('element not found');
    error.status = 404;
    return next(error);
  }

  res.status(204).send();
})