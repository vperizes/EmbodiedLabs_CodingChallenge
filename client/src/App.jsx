import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import Cube from "./components/Cube";

const AllUsersContext = createContext();

const App = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/");
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };

  // fetch users invoked after app component mounts/renders in DOM
  useEffect(() => {
    fetchUsers();
  }, []);

  // map over users array, destructure data, and render in div
  //eventually we want to display this data on the cube: make a cub component (three js), pass data to cube.
  return (
    <AllUsersContext.Provider value={{ users }}>
      <h1>User Profile Dashboard</h1>
      <div>
        <div>
          <Cube />
        </div>
        {users.map((user) => {
          const {
            first_name,
            last_name,
            email,
            cell_phone,
            profile_pic,
            user_id,
          } = user;
          return (
            <div key={user_id}>
              <p>
                {first_name} {last_name}
              </p>
              <p>{email}</p>
              <p>{cell_phone}</p>
              <img src={profile_pic} alt="profile pic" />
            </div>
          );
        })}
      </div>
    </AllUsersContext.Provider>
  );
};

export const useAllUsersContext = () => useContext(AllUsersContext);
export default App;
