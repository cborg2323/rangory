import express from 'express';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errors());

app.listen(3000);