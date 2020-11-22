import React from 'react';
import ProjectPanel from './ProjectPanel';

const ProjectsList = ({ projects }) => (
    <>
        {projects.map((project, key) => {
            return (
                <div key={key}>
                    <ProjectPanel project={project} />
                </div>
            );
        })}
    </>
);

export default ProjectsList;
