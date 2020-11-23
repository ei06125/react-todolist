import React, { useState, useEffect } from 'react';
import NotFoundPage from './NotFoundPage';
import ProjectsList from '../components/ProjectsList';

const ProjectsPage = ({ match }) => {
    const userId = match.params.userId;
    console.log(userId);

    const [projectsInfo, setProjectsInfo] = useState([]);

    useEffect(() => {
        const fetchDate = async () => {
            const result = await fetch(`/api/projects/${userId}`);
            console.log(result);
            const body = await result.json();
            console.log(body);
            setProjectsInfo(body);
        }
        fetchDate();
    }, [userId]);

    if (!projectsInfo) return (<NotFoundPage />);

    console.log("projectsInfo");
    console.log(projectsInfo);


    // const projects = projectsContent.filter((project) => project.userId === userId);

    return (
        <>
            <h1>Projects</h1>
            <h2>User: {userId}</h2>
            <ProjectsList projects={projectsInfo} />
        </>
    );
};

export default ProjectsPage;
