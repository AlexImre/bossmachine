const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');
const { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

module.exports = ideasRouter;

// Get all ideas
ideasRouter.get('/', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    res.status(200).send(allIdeas);
})

// Add idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = {
        name: req.body.name,
        description: req.body.description,
        weeklyRevenue: Number(req.body.weeklyRevenue),
        numWeeks: Number(req.body.numWeeks)
    }
    const newIdeaAdded = addToDatabase('ideas', newIdea);
    res.status(201).send(newIdeaAdded);
})

// Select single idea
ideasRouter.get('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    if (isNaN(ideaId)){
        const error = new Error('Id is non-numeric');
        error.status = 404;
        return next(error);
    }
    
    const idea = getFromDatabaseById('ideas', ideaId);
    // Fail if ID not in array
    if(idea === null || idea === undefined) {
    const error = new Error('Invalid Id');
    error.status = 404;
    return next(error);
    }
    
    res.status(200).send(idea);
})

// Edit idea
ideasRouter.put('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;

    // Fail if ID is not a number
    if (isNaN(ideaId)){
        const error = new Error('Id is non-numeric');
        error.status = 404;
        return next(error);
    }

    const idea = getFromDatabaseById('ideas', ideaId);
    // Fail if ID not in array
    if(idea === null || idea === undefined) {
        const error = new Error('Invalid Id');
        error.status = 404;
        return next(error);
    }

    const updatedIdea = req.body;
    updateInstanceInDatabase('ideas', updatedIdea);
    res.status(200).send(updatedIdea);
})

// Delete idea
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    // Fail if ID is not a number
    if (isNaN(ideaId)){
        const error = new Error('Id is non-numeric');
        error.status = 404;
        return next(error);
    }

    const allIdeas = getAllFromDatabase('ideas');
    const idea = getFromDatabaseById('ideas', ideaId);
    // Fail if ID not in array
    if(!allIdeas.includes(idea)) {
      const error = new Error('Invalid Id');
      error.status = 404;
      return next(error);
    }

    deleteFromDatabasebyId('ideas', ideaId);    
    res.status(204).send();
})