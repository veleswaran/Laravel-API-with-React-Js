import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({ name: '', email: '', phone: '', images: null });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('images', data.images); 
    console.log(formData);

    axios.post('http://localhost:8000/api/person', formData)
      .then(response => {
        console.log("Data added successfully", response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChange = (event) => {
    if (event.target.name === 'images') {
      setData({
        ...data,
        images: event.target.files[0] // Access the file from event.target.files
      });
    } else {
      setData({
        ...data,
        [event.target.name]: event.target.value
      });
    }
  };

  return (
    <div className="container mt-5 ">
      <h1 className="text-center bg-info text-dark rounded p-2">Add User</h1>
      <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
        <label className="form-label mt-3">Name:</label>
        <input type="text" name="name" className="form-control" value={data.name} onChange={handleChange} />

        <label className="form-label mt-3">Email:</label>
        <input type="email" name="email" className="form-control" value={data.email} onChange={handleChange} />

        <label className="form-label mt-3">Phone:</label>
        <input type="text" name="phone" className="form-control" value={data.phone} onChange={handleChange} />

        <label className="form-label mt-3">Upload image:</label>
        <input type="file" className="form-control" name="images" onChange={handleChange} />

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}

export default App;
