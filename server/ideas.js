const express = require('express');
const ideasRouter = express.Router();
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
ideasRouter.post('/', (req, res, next) => {
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
ideasRouter.get('/ideaId', (req, res, next) => {
    getFromDatabaseById('ideas', req.body.id);
    res.status(200).send(req.body);
})

// Edit idea
ideasRouter.put('/ideaId', (req, res, next) => {
    updateInstanceInDatabase('ideas', req.body)
    res.status(200).send(req.body);
})

// Delete idea
ideasRouter.delete('/ideaId', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.body.id);
    res.status(200).send();
})