import React from 'react';
import TaskPanel from './TaskPanel';

const ProjectPanel = ({ project }) => {
    return (
        <>
            <h3>{project.title}</h3>
            <h4>Tasks:</h4>
            <ul>
                {project.tasks.map((task, key) => {
                    return (
                        <li key={key}>
                            <TaskPanel task={task} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default ProjectPanel;
