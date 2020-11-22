import express, { response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
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


// const withDB = async (operations, res) => {
//     try {
//         const client = await MongoClient.connect('mongodb://localhost:27017', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         const db = client.db('todolist');

//         await operations(db);

//         client.close();
//     } catch (error) {
//         res.status(500).json({ message: 'Error connecting to db', error });
//     }
// };

// app.post('/api/auth/register', (req, res) => {
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;

//     usersInfo.push({
//         userId: usersInfo.length + 1,
//         username: username,
//         email: email,
//         password: password
//     });

//     res.status(200).send(`User ${usersInfo.length} created`);
// });

// app.get('/api/projects/:userId', async (req, res) => {
//     withDB(async (db) => {
//         const userId = req.params.userId;
//         const projects = db.collection('projects');

//         const cursor = projects.find({ userId: userId });
//         if ((await cursor.count()) === 0) {
//             res.status(500).json({ message: 'Projects not found' });
//         }

//         const userProjects = await cursor.toArray();
//         res.status(200).json(userProjects);
//     }, res);
// });


// app.post('/api/projects/:userId/add-project', async (req, res) => {
//     const userId = req.params.userId;
//     const projectName = req.body.projectName;

//     withDB(async (db) => {

//         const user = usersInfo.find((user) => user.userId === userId);
//         console.log(`user: ${JSON.stringify(user)}`);

//         if (user === undefined) res.status(401).send(`User not found`);

//         user.projects.push({ userId: userId, name: projectName });

//         res.status(200).send(user);
//     }, res);
// });

// app.post('/api/projects/:userId/:projectId/add-task', (req, res) => {

//     console.log("Adding new task");

//     const userId = req.params.userId;
//     console.log(`userId: ${userId}`);

//     const projectId = req.params.projectId;
//     console.log(`projectId: ${projectId}`);

//     const user = usersInfo.find((user) => user.userId === userId);
//     console.log(`user: ${JSON.stringify(user)}`);

//     if (user === undefined) res.status(401).send(`User not found`);

//     user.projects.push({ userId: userId, name: projectName });

//     res.status(200).send(user);
// });


app.use(express.static('public'));

app.listen(8000, () => console.log('Listening on port 8000'));
