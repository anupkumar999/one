import React, { useState } from 'react';
import './FreelancerSection.css';
import JobListing from './JobListing'; // Import the JobListing component
import DarkModeToggle from './DarkModeToggle';
import './styles.css';

function FreelancerSection() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [githubUsername, setGithubUsername] = useState('');
  const [githubProjects, setGithubProjects] = useState([]);
  const [error, setError] = useState('');

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleFetchProjects = async () => {
    try {
      setError('');
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
      if (!response.ok) {
        throw new Error('GitHub username not found');
      }
      const data = await response.json();
      setGithubProjects(data);
    } catch (error) {
      setError('GitHub username not found');
      console.error(error);
    }
  };

  return (
    <div className="section-container">
      <h2>Freelancer Section</h2>
      <div>
        <h3>User Profile</h3>
        <div>
          <label>Select Skills:</label>
          <select multiple value={selectedSkills} onChange={handleSkillChange}>
            <option value="react">React</option>
            <option value="angular">Angular</option>
            {/* Add more skills */}
          </select>
        </div>
        <div>
          <label>GitHub Username:</label>
          <input
            type="text"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
          />
          <button onClick={handleFetchProjects}>Fetch Projects</button>
        </div>
        {error && <p className="error">{error}</p>}
        <div>
          <h3>GitHub Projects:</h3>
          <ul>
            {githubProjects.map((project) => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Add JobListing component */}
      <div>
        <h3>Job Listings</h3>
        <JobListing />
        <DarkModeToggle /> {/* Add the DarkModeToggle component */}
      </div>
    </div>
    
  );
}

export default FreelancerSection;
