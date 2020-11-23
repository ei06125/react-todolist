import {
    addNewProject,
    getUserProjects,
    updateProject,
    deleteProject,
    addNewTask,
    getProjectTasks,
    updateTask,
    deleteTask
} from '../controllers/crmController';
import { login, register, loginRequired } from '../controllers/userController';

const routes = (app) => {
    // Project CRUD control
    app.route('/api/projects/:userId')
        .get((req, res, next) => {
            // TODO remove and let getUserProjects only
            // // middleware
            // console.log(`Request from: ${req.originalUrl}`)
            // console.log(`Request type: ${req.method}`)
            next();
        }, getUserProjects);

    app.route('/api/projects/:userId/add-project')
        .post(addNewProject);

    app.route('/api/projects/:userId')
        .put(updateProject)
        .delete(deleteProject);

    // Task CRUD control
    app.route('/api/projects/:userId/project/:projectId')
        .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next();
        }, getProjectTasks);

    app.route('/api/projects/:userId/project/:projectId/add-task')
        .post(addNewTask);

    app.route('/api/projects/:userId/project/:projectId/')
        .put(updateTask)
        .delete(deleteTask);

    // Authentication & Registration
    app.route('/auth/register')
        .post(register);

    app.route('/login')
        .post(login);
}

export default routes;
