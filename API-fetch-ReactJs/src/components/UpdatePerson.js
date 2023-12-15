import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdatePerson() {
  const [personData, setPersonData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    images: null,
  });
  const [id,setId]=useState('');
  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/person/${id}`);
        setPersonData(response.data);
      } catch (error) {
        console.error("Error fetching person data:", error);
      }
    };
    fetchPersonData();
  
  }, [id]);

  const handleInputChange = (e) => {
    if (e.target.name === "images") {
      setPersonData({
        ...personData,
        images: e.target.files[0], 
      });
    } else {
      setPersonData({
        ...personData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(personData);
    try {
      const formData = new FormData();
      formData.append("name", personData.name);
      formData.append("email", personData.email);
      formData.append("phone", personData.phone);
      formData.append("images", personData.images); 
      console.log([...formData]); // Log all key-value pairs in the FormData object


      await axios.post(`http://localhost:8000/api/updateperson/${id}`, formData);
      console.log("Person updated successfully");
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  return (
    <div className="container rounded bg-info">
   
      <h1>Update Person</h1>
      <form onSubmit={handleUpdate}>
      <input type="text" className="form-control" onChange={(e)=>setId(e.target.value)} value={id} placeholder="enter the id"/>
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={personData.name}
          onChange={handleInputChange}
        />
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={personData.email}
          onChange={handleInputChange}
        />
        <label className="form-label">Phone:</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          value={personData.phone}
          onChange={handleInputChange}
        />
        <label className="form-label">Upload New Image:</label>
        <input
          type="file"
          name="images"
          className="form-control"
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary mt-3 mb-5">Update</button>
      </form>
    </div>
  );
}

export default UpdatePerson;

