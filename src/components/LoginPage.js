import React, { useState } from 'react';
import FreelancerSection from './FreelancerSection'; // Import the FreelancerSection component
import EmployerSection from './EmployerSection'; // Import the EmployerSection component
import './LoginPage.css';
import './styles.css';
import DarkModeToggle from './DarkModeToggle'; 
import './dark-styles.css';


function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('');

  return (
    <div className="login-container">
      <h1>Welcome to the Job Portal</h1>
      <div className="role-buttons">
        <button onClick={() => setSelectedRole('freelancer')}>Freelancer</button>
        <button onClick={() => setSelectedRole('employer')}>Employer</button>
      </div>
      {selectedRole === 'freelancer' && <FreelancerSection />}
      {selectedRole === 'employer' && <EmployerSection />}
      <DarkModeToggle /> {/* Add the DarkModeToggle component */}
    </div>
  );
}

export default LoginPage;
