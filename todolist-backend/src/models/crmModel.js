import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    finish_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

export const ProjectSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a first name'
    },
    tasks: [Schema.Types.ObjectId],
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});
