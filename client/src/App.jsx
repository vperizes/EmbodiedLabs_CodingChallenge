import axios from "axios";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <h1>User Profile Dashboard</h1>
      <div>
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
    </>
  );
};
export default App;
