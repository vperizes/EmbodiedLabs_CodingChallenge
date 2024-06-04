import axios from "axios";

const data = await axios.get("http://127.0.0.1:8000/");
console.log(data);

const App = () => {
  return (
    <>
      <h1>User Profile Dashboard</h1>
    </>
  );
};
export default App;
