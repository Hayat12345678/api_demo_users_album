import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userListe, setUserListe] = useState([]);
  const [selectedUser, setselectedUser] = useState();
  const [userAlbum, setuserAlbum] = useState([]);
  const [selectedAlbum, setselectedAlbum] = useState();
  const [photos, setPhotos] = useState([]);

  async function getUserList() {
  
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
    
      setUserListe(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getAlbumFromUser(userId) {

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums/?userId=" + userId
      );
    
      setuserAlbum(response.data);
    
    } catch (err) {
      console.error(err);
    }
  }

  async function getPhotosFromAlbum(albumId) {
 
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos/?albumId=" + albumId
      );
  
      setPhotos(response.data);
   
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUserList();
  }, []); 

  useEffect(() => {
    getAlbumFromUser(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    getPhotosFromAlbum(selectedAlbum);
  }, [selectedAlbum]);


  return (
    <div className="App">
      <h1>API DEMO 'Users'</h1>
      <h2>User List</h2>
      <ul className="user-list">
        {userListe.map((user) => (
          <li
            onClick={() => {
            
              setselectedUser(user.id);
            }}
          >
            {user.name}
          </li>
        ))}
      </ul>

      <h2>User album</h2>

      <ul className="user-album">
        {userAlbum.map((album) => (
          <li
            onClick={() => {
           
              setselectedAlbum(album.id);
            }}
          >
            {album.title}
          </li>
        ))}
      </ul>
      
      <h2>User Photos</h2>
      {photos.map((photo) => (
        <img src={photo.thumbnailUrl} alt="Photos" />
      ))}
    </div>
  );
}

export default App;

