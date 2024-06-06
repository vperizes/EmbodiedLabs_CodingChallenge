import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import UserCube from "./components/UserCube";

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

  return (
    <AllUsersContext.Provider value={{ users }}>
      <h1>User Profile Dashboard</h1>
      <div>
        <UserCube />
      </div>
    </AllUsersContext.Provider>
  );
};

export const useAllUsersContext = () => useContext(AllUsersContext);
export default App;
