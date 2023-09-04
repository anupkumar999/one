// src/components/JobListing.js
import React, { useState } from 'react';
import './JobListing.css'; // Import the styles for this component

const mockJobListings = [
  { id: 1, title: 'React Developer', skills: ['react'], salary: 50 },
  { id: 2, title: 'Angular Developer', skills: ['angular'], salary: 60 },
  // Add more job listings
];

function JobListing() {
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('');
  const [minSalaryFilter, setMinSalaryFilter] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);

  const filteredJobs = mockJobListings.filter((job) =>
    (!selectedSkillFilter || job.skills.includes(selectedSkillFilter)) &&
    (!minSalaryFilter || job.salary >= minSalaryFilter)
  );

  const handleQuickApply = (jobId) => {
    setAppliedJobs((prevJobs) => [...prevJobs, jobId]);
  };

  return (
    <div className="job-listing-container">
      <h2>Job Listings</h2>
      <div className="filters">
        <label>Filter by Skill:</label>
        <select value={selectedSkillFilter} onChange={(e) => setSelectedSkillFilter(e.target.value)}>
          <option value="">All</option>
          <option value="react">React</option>
          <option value="angular">Angular</option>
          {/* Add more skills */}
        </select>
        <label>Min. Salary per Hour:</label>
        <input
          type="number"
          value={minSalaryFilter}
          onChange={(e) => setMinSalaryFilter(e.target.value)}
        />
      </div>
      <ul className="job-list">
        {filteredJobs.map((job) => (
          <li key={job.id} className="job-item">
            <h3>{job.title}</h3>
            <p>Skills: {job.skills.join(', ')}</p>
            <p>Salary: ${job.salary} per hour</p>
            {!appliedJobs.includes(job.id) ? (
              <button className="apply-button" onClick={() => handleQuickApply(job.id)}>
                Quick Apply
              </button>
            ) : (
              <span className="applied-label">Applied</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobListing;
