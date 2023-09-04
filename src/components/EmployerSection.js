// EmployerSection.js
import React, { useState } from 'react';
import './EmployerSection.css';
import DarkModeToggle from './DarkModeToggle'; 
import './styles.css';

function EmployerSection() {
  const [jobListings, setJobListings] = useState([]);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);
  const [selectedApplicantIndex, setSelectedApplicantIndex] = useState(null);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requirements: '',
    tags: '',
    companyName: '',
    contactInfo: '',
    jobDescription: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 16 * 1024) {
      // Check if the file format is either DOC or PDF
      if (file.type === 'application/msword' || file.type === 'application/pdf') {
        setNewJob((prevJob) => ({
          ...prevJob,
          jobDescription: file,
        }));
      } else {
        alert("Please upload a DOC or PDF file.");
        e.target.value = ''; // Clear the file input
      }
    } else {
      alert("Please upload a file that is 16KB or smaller.");
      e.target.value = ''; // Clear the file input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (
      !newJob.title ||
      !newJob.description ||
      !newJob.requirements ||
      !newJob.companyName ||
      !newJob.contactInfo ||
      !newJob.jobDescription
    ) {
      return;
    }

    const newJobListing = { ...newJob, applications: [] };
    setJobListings((prevListings) => [...prevListings, newJobListing]);
    setNewJob({
      title: '',
      description: '',
      requirements: '',
      tags: '',
      companyName: '',
      contactInfo: '',
      jobDescription: null,
    });
  };

  const handleViewJob = (index) => {
    setSelectedJobIndex(index);
    setSelectedApplicantIndex(null);
  };

  const handleViewApplicantProfile = (applicantIndex) => {
    setSelectedApplicantIndex(applicantIndex);
  };

  return (
    <div className="employer-section-container">
      <div className="post-job-form">
        <h3>Post a New Job</h3>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newJob.title}
            onChange={handleInputChange}
            required
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={newJob.description}
            onChange={handleInputChange}
            rows="4"
            required
          />
          <label>Requirements:</label>
          <textarea
            name="requirements"
            value={newJob.requirements}
            onChange={handleInputChange}
            rows="4"
            required
          />
          <label>Tags:</label>
          <input
            type="text"
            name="tags"
            value={newJob.tags}
            onChange={handleInputChange}
          />
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={newJob.companyName}
            onChange={handleInputChange}
            required
          />
          <label>Contact Info:</label>
          <input
            type="text"
            name="contactInfo"
            value={newJob.contactInfo}
            onChange={handleInputChange}
            required
          />
          <label>Job Description (Max 16KB):</label>
          <input
            type="file"
            name="jobDescription"
            accept=".doc, .docx, .pdf"
            onChange={handleFileUpload}
            required
          />
          <button type="submit">Post Job</button>
        </form>
      </div>
      <div className="job-listings">
        <h3>Your Job Listings</h3>
        <ul>
          {jobListings.map((job, index) => (
            <li key={index}>
              <h4>{job.title}</h4>
              <p>Company: {job.companyName}</p>
              <p>Applications: {job.applications.length}</p>
              <button onClick={() => handleViewJob(index)}>View Applications</button>
              {selectedJobIndex === index && (
                <div>
                  <h4>Applications for {job.title}</h4>
                  <ul>
                    {job.applications.map((applicant, applicantIndex) => (
                      <li key={applicantIndex}>
                        <p>Applicant: {applicant.name}</p>
                        <p>Email: {applicant.email}</p>
                        <button onClick={() => handleViewApplicantProfile(applicantIndex)}>
                          View Profile
                        </button>
                      </li>
                    ))}
                  </ul>
                  {selectedApplicantIndex !== null && (
                    <div>
                      <h4>Applicant Profile</h4>
                      <p>Name: {job.applications[selectedApplicantIndex].name}</p>
                      <p>Email: {job.applications[selectedApplicantIndex].email}</p>
                      {/* Additional profile details */}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        <DarkModeToggle /> {/* Add the DarkModeToggle component */}
      </div>
    </div>
    
  );
}

export default EmployerSection;
