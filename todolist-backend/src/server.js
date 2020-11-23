import express, { response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/crmRoutes';

// express setup
const app = express();
const PORT = 8000;

// mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
// TODO: security

// routes setup
routes(app);

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
