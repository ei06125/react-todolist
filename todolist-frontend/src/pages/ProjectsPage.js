import React from 'react';
import projectsContent from './projects-content';
import NotFoundPage from './NotFoundPage';
import ProjectsList from '../components/ProjectsList';

const ProjectsPage = ({ match }) => {
    const userId = match.params.userId;
    const user = projectsContent.find((project) => project.userId === userId);
    
    // throw, send 404
    if (!user) return (<NotFoundPage />);
    
    const projects = projectsContent.filter((project) => project.userId === userId);

    return (
        <>
            <h1>Projects</h1>
            <h2>User: {userId}</h2>
            <ProjectsList projects={projects} />
        </>
    );
};

export default ProjectsPage;
