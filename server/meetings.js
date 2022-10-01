const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase,
    createMeeting,
    deleteAllFromDatabase
  } = require('./db');

module.exports = meetingsRouter;

meetingsRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('meetings'));
})

meetingsRouter.post('/', (req, res, next) => {
    createMeeting();
})

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings')
    res.status(204).send();
})