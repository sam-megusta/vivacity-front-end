import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EditDetailsPage from './EditDetailsPage';

interface Applicant {
  credentials: string;
  details: string;
}



const url = './Assets/lavner.png';

const App = () => {
  const [applicant, setApplicant] = useState<Applicant[]>([]);
  const [editing, setEditing] = useState(false);

  const handleEditDetails = (details: any) => {
    console.log('Updated details:', details);

    const requestBody = {
      credentials: {
        details,
      },
    };
  
    console.log('Request body:', JSON.stringify(requestBody));
  
    // Perform API call to update details in the server
    fetch('http://localhost:3001/awesome/applicant/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fields updated successfully:', data);
        // Perform any additional actions after updating the details
      })
      .catch(error => {
        console.error('Error updating fields:', error);
        // Handle error case
      });
  };

  const handleEditButtonClick = () => {
    setEditing(true);
  };

  const handleClick = async () => {
    try {
      if (applicant.length === 0) {
        const response = await fetch('http://localhost:3001/awesome/applicant');
        const data = await response.json();
        setApplicant(data);
      }
    } catch (error) {
      console.error('Error fetching applicant data:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Click the Picture</h1>
        <img src={url} alt="Click Me" onClick={handleClick} />
        <Switch>
          <Route exact path="/">
            {applicant.length > 0 && (
              <div className="applicant-info">
                <h2>
                  <span style={{ color: 'Orange' }}>Applicant Information</span>
                </h2>
                {applicant.map((item, index) => (
                  <div key={index}>
                    <p>
                      <strong>
                        <span style={{ color: 'red' }}>
                          {item.credentials}: {item.details}
                        </span>
                      </strong>
                    </p>
                  </div>
                ))}
                <Link to="/edit-details">
                  <button onClick={handleEditButtonClick}>Edit My Details</button>
                </Link>
              </div>
            )}
          </Route>
          <Route path="/edit-details">
            <EditDetailsPage onSave={handleEditDetails} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
