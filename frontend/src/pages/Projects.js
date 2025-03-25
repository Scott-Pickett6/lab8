import { useEffect, useState } from "react";

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch projects from the backend
        fetch("https://main--lab7backend.netlify.app/.netlify/functions/api/projects")
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) => console.error("Error fetching projects:", error));
    }, []);

    return (
        <main className="container d-flex flex-column">
            <h2 className="align-self-center">Projects</h2>
            <div className="ms-5">
                {projects.map((project, index) => (
                    <section key={index}>
                        <h4>{project.name}</h4>
                        <div className="ms-4">
                            <h6>Description</h6>
                            <p>{project.description}</p>
                            <h6>Technologies</h6>
                            <ul>
                                {project.languages.map((language, langIndex) => (
                                    <li key={langIndex}>{language}</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}

export default Projects;