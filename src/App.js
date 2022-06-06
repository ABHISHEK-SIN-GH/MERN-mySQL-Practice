import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [studentList, setstudentList] = useState([]);

  const addStudent = () => {
    Axios.post("http://localhost:3001/create", { name: name, age: age }).then((res) => {
        console.log(res.data);
        getStudent();
      }
    );
  };

  const getStudent = () => {
    Axios.get("http://localhost:3001/fetch").then((res) => {
      console.log(res.data);
      setstudentList(res.data);
    });
  };

  const delStudent = (id) => {
    Axios.post('http://localhost:3001/del', {id:id}).then((res) => {
      console.log(res.data);
      getStudent();
    });
  }

  const login = (name,password) => {
    Axios.post('http://localhost:3001/login', {name:name,password:password}).then((res) => {
      const getName = res.data[0].name;
      if(getName==name){
        console.log("Your are logged In...");
      }
    });
  }

  return (
    <div className="App mx-auto" style={{ maxWidth: "600px" }}>
      <div>
        <form className="container text-start my-5">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={addStudent}
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        <div className="container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={getStudent}
          >
            Show Students
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={()=>{delStudent(4)}}
          >
            Delete Students
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={()=>{login("raj","password")}}
          >
            Login Students
          </button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">@ID</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((val, key) => {
                return (
                  <tr key={val.id}>
                    <th scope="row">{val.id}</th>
                    <td>{val.name}</td>
                    <td>{val.age}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
