import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EditDetailsPage from './EditDetailsPage';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApplicantData } from './slices/applicantSlice';
import { RootState } from './store';

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
  
    // Perform API call to POST method to trigger DB Update at the backend
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
      
      })
      .catch(error => {
        console.error('Error updating fields:', error);
        
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

//redux integrated to include API Data
const ApplicantInfo = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.applicant);

  useEffect(() => {
    dispatch(fetchApplicantData() as any);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map((item: { credentials: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; details: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
        <div key={index}>
          <p>
            <strong>{item.credentials}: {item.details}</strong>
          </p>
        </div>
      ))}
    </div>
  );
};

export {ApplicantInfo};
