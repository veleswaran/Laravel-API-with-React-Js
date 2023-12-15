import { useEffect, useState } from "react";
import axios from 'axios';

export default function GetApi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/person')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function delClick(userId) {
    axios.delete(`http://localhost:8000/api/person/${userId}`)
      .then(response => {
        console.log(response.data);
        axios.get('http://localhost:8000/api/person')
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  }
  

  return (
    <div className="container bg-info rounded p-3 mt-5 mb-5">
      <h1>User List</h1>
      <table className="table-bordered mb-5" >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Image</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => {
            return (
              <tr className="p-5" key={user.id}>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  <img srcSet={"http://localhost:8000/storage/images/"+user.image} alt={user.image} width="20%"/>
                </td>
                <td className="p-3">
                  <button className="btn btn-primary" onClick={()=>delClick(user.id)}>delete</button>
                </td>
              </tr>
            );
        })}
        </tbody>
      </table>
    </div>
  );
}