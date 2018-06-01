import { } from 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import v1Route from './routes/v1';
import { validationError } from './validations';


const app = express();
const { PORT = 3000 } = process.env;

// Middlewares
app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev', {
  skip: () => app.get('env') === 'test',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes handler
app.all('/', (req, res) => {
  res.redirect('/api/v1');
});
app.use('/api/v1', v1Route);

app.use(validationError);

/* eslint-disable no-console */
export const server = app.listen(PORT, () => {
  if (app.get('env') === 'development') console.log(`The server is live on port ${PORT}`);
});

export default app;
