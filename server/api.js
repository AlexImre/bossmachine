const express = require('express');
const apiRouter = express.Router();

// Mount minions Router
const minionsRouter = require('./minions');
apiRouter.use('/minions', minionsRouter);

// Mount ideas Router
const ideasRouter = require('./ideas');
apiRouter.use('/ideas', ideasRouter);

// Mount meetings Router
const meetingsRouter = require('./meetings');
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
