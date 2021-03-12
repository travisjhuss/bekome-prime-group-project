const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const formsRouter = require('./routes/forms.router');
const exploreRouter = require('./routes/explore.router');
const providerDetailsRouter = require('./routes/providerDetails.router');
const favoriteRouter = require('./routes/favorite.router');
const interestedClientsRouter = require('./routes/interested-clients.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/forms', formsRouter);
app.use('/api/explore', exploreRouter);
app.use('/api/provider-details', providerDetailsRouter);
app.use('/api/favorite', favoriteRouter);
app.use('/api/interested-clients', interestedClientsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
