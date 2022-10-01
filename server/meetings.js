const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase,
    addToDatabase,
    createMeeting,
    deleteAllFromDatabase
  } = require('./db');

module.exports = meetingsRouter;

meetingsRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('meetings'));
})

meetingsRouter.post('/', (req, res, next) => {
    const meeting = createMeeting();
    const meetingAdded = addToDatabase('meetings', meeting);
    res.status(201).send(meetingAdded);
})

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings')
    res.status(204).send();
})