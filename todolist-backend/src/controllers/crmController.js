import mongoose, { ObjectId } from 'mongoose';
import { ProjectSchema, TaskSchema } from '../models/crmModel';

// model Project is for the models collection in the database
const Project = mongoose.model('Project', ProjectSchema);

export const addNewProject = async (req, res) => {
    const userId = req.params.userId;
    let newProject = await Project.create({
        title: req.body.projectName,
        tasks: [],
        userId: userId
    });

    await newProject.save((err, project) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(project);
    });
};

export const getUserProjects = async (req, res) => {
    const userId = req.params.userId;
    const allProjects = await Project.find({});
    const userProjects = allProjects.filter((project) => String(project.userId) === userId);
    res.status(200).json(userProjects);
};

export const updateProject = async (req, res) => {
    const projectId = req.body.projectId;
    const projectName = req.body.projectName;
    Project.findOneAndUpdate({ _id: projectId }, { title: projectName }, { new: true }, (err, project) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(project);
    });
}

export const deleteProject = async (req, res) => {
    const projectId = req.body.projectId;
    Project.deleteOne({ _id: projectId }, (err, project) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json({ message: 'Successfully deleted project' });
    });
}

const Task = mongoose.model('Task', TaskSchema);

export const addNewTask = async (req, res) => {
    const projectId = req.params.projectId;
    const taskDescription = req.body.taskDescription;
    let newTask = await Task.create({
        description: taskDescription,
        created_date: Date.now(),
        finish_date: Date.now(),
        projectId: projectId
    });

    await newTask.save(async (err, task) => {
        if (err) {
            res.status(500).send(err);
        }

        // Update project
        const selfProject = await Project.findOne({ _id: mongoose.Types.ObjectId(projectId) });
        selfProject.tasks.push(newTask._id);
        Project.findOneAndUpdate({ _id: projectId }, { tasks: selfProject.tasks }, { new: true }, (err) => {
            if (err) {
                res.status(500).send(err);
            }
        });

        res.status(200).json(task);
    });
};

export const getProjectTasks = async (req, res) => {
    const userId = req.params.userId;
    const projectId = req.params.projectId;

    const allProjects = await Project.find({});
    const userProjects = allProjects.filter((project) => String(project.userId) === userId);
    const projects = userProjects.filter((project) => String(project._id) === projectId);

    const allTasks = await Task.find({});
    const userTasks = allTasks.filter(task => {
        return projects.some(project => {
            return String(project._id) === String(task.projectId);
        });
    });
    res.status(200).json(userTasks);
};

export const updateTask = (req, res) => {
    const taskId = req.body.taskId;
    const newDescription = req.body.taskDescription;
    const newEndDate = Date.parse(req.body.taskEndDate);

    Task.findOneAndUpdate({ _id: taskId }, { description: newDescription, finish_date: newEndDate }, { new: true }, (err, task) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(task);
    })
}

export const deleteTask = async (req, res) => {
    const projectId = req.params.projectId;

    const taskId = req.body.taskId;

    Task.deleteOne({ _id: taskId }, async (err, task) => {
        if (err) {
            res.status(500).send(err);
        }

        // Update Project
        const selfProject = await Project.findOne({ _id: mongoose.Types.ObjectId(projectId) });
        const newTasks = selfProject.tasks.filter((taskID) => taskID !== task._id);
        Project.findOneAndUpdate({ _id: projectId }, { tasks: selfProject.tasks }, { new: true }, (err) => {
            if (err) {
                res.status(500).send(err);
            }
        });

        res.status(200).json({ message: 'Successfully deleted task' });
    });

}
