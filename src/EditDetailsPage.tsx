import React, { useState } from 'react';

interface EditDetailsPageProps {
  onSave: (details: any) => void;
}

const EditDetailsPage: React.FC<EditDetailsPageProps> = ({ onSave }) => {
  const [details, setDetails] = useState({
    Age: '25',
    University: 'UT Dallas',
    Expertise: 'Full stack',
    Name: '',
    Course: '',
    Talents: '',
    'Fun Fact': '',
    Hobbies: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSave = () => {
    onSave(details);
  };

  return (
    <div>
      <h2>Edit Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Age:</td>
            <td>
              <input type="text" name="Age" value={details.Age} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>University:</td>
            <td>
              <input type="text" name="University" value={details.University} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>Expertise:</td>
            <td>
              <input type="text" name="Expertise" value={details.Expertise} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>
              <input type="text" name="Name" value={details.Name} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>Course:</td>
            <td>
              <input type="text" name="Course" value={details.Course} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>Talents:</td>
            <td>
              <input type="text" name="Talents" value={details.Talents} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>Fun Fact:</td>
            <td>
              <input type="text" name="Fun Fact" value={details['Fun Fact']} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>Hobbies:</td>
            <td>
              <input type="text" name="Hobbies" value={details.Hobbies} onChange={handleChange} />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};


export default EditDetailsPage;
