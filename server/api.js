const express = require('express');
const apiRouter = express.Router();

// Mount minions Router
const minionsRouter = require('./minions');
apiRouter.use('/minions', minionsRouter);

module.exports = apiRouter;
