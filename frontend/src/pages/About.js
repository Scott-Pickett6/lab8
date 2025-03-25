import { useEffect, useState, useMemo } from "react";

function About() {
    const programmingLanguages = useMemo(() => ["Java", "C", "HTML", "CSS", "JavaScript", "Python", "C#", "PHP"], []);
    const tools = useMemo(() => ["React", "Unity", "Django", "ASP.NET MVC", "Bootstrap"], []);

    const dropdownValues = ["All", "Frontend", "Backend", "Other"];

    const [programmingLanguagesShown, setProgrammingLanguagesShown] = useState(programmingLanguages);
    const [toolsShown, setToolsShown] = useState(tools);

    const [searchInput, setSearchInput] = useState("");
    const [dropdown, setDropdown] = useState("All");

    useEffect(() => {
        const search = searchInput.toLowerCase().trim();

        let filteredLanguages = programmingLanguages;
        let filteredTools = tools;

        if (dropdown === "Frontend") {
            filteredLanguages = programmingLanguages.filter((language) =>
                ["HTML", "CSS", "JavaScript"].includes(language)
            );
            filteredTools = tools.filter((tool) => ["React", "Bootstrap"].includes(tool));
        } else if (dropdown === "Backend") {
            filteredLanguages = programmingLanguages.filter((language) =>
                ["Java", "Python", "C#", "PHP"].includes(language)
            );
            filteredTools = tools.filter((tool) => ["Django", "ASP.NET MVC"].includes(tool));
        } else if (dropdown === "Other") {
            filteredLanguages = programmingLanguages.filter((language) => ["C"].includes(language));
            filteredTools = tools.filter((tool) => ["Unity"].includes(tool));
        }

        if (search !== "") {
            filteredLanguages = filteredLanguages.filter((language) =>
                language.toLowerCase().includes(search)
            );
            filteredTools = filteredTools.filter((tool) =>
                tool.toLowerCase().includes(search)
            );
        }

        setProgrammingLanguagesShown(filteredLanguages);
        setToolsShown(filteredTools);
    }, [searchInput, dropdown, programmingLanguages, tools]);

    return (
        <main className="container d-flex flex-column">
            <h2 className="align-self-center">About</h2>
            <div className="ms-5">
                <section>
                    <h4>Education</h4>
                    <ul>
                        <li>
                            <strong>Prince Andrew High School</strong> - High School Diploma
                        </li>
                        <li>
                            <strong>Dalhousie University</strong> - Bachelor of Computer Science (Expected Graduation: August 2025)
                        </li>
                    </ul>
                </section>
                <section>
                    <h4>Experience</h4>
                    <ul>
                        <li><strong>Giant Tiger</strong> - Grocery Associate (July 2020 - August 2022)</li>
                        <li><strong>Maritime Travel</strong> - Junior Software Developer (May 2023 - August 2023)</li>
                        <li><strong>CAE</strong> - Junior Programmer Intern (Jan 2024 - August 2024)</li>
                    </ul>
                </section>
                <section>
                    <h4>Technical Skills</h4>
                    <div className="form-group d-flex gap-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Skills"
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <select className="form-control" onChange={(e) => setDropdown(e.target.value)}>
                            {dropdownValues.map((value, index) => (
                                <option key={index}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div className="ms-4">
                        <h6>Programming Languages</h6>
                        <ul>
                            {programmingLanguagesShown.map((language, index) => (
                                <li key={index}>{language}</li>
                            ))}
                        </ul>
                        <h6>Tools</h6>
                        <ul>
                            {toolsShown.map((tool, index) => (
                                <li key={index}>{tool}</li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section>
                    <h4>Goals</h4>
                    <p>
                        My goals are to graduate from Dalhousie in August 2025 and then begin working as a software developer.
                        I hope to go back and work for CAE as I enjoyed working there as an intern.
                        I also hope to code outside of work and build my own personal projects. Unity is something specificly I would like to improve on.
                    </p>
                </section>
            </div>
        </main>
    );
}

export default About;