import logo from "./logo.svg";
import "./App.css";
import tableColumn from "./data";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Hammad",
      address: "banigala",
      email: "hammadalibu@gmail.com",
      contact: "03045360339",
    },
    {
      id: 2,
      name: "umer",
      address: "Rawalpindi",
      email: "umer@gmail.com",
      contact: "12345678911",
    },
    {
      id: 3,
      name: "saad",
      address: "Karachi",
      email: "saad@gmail.com",
      contact: "5432678543",
    },
  ]);
  const [newColumn, setNewColumn] = useState("");
  const [showField, setShowField] = useState(false);
  const initialNewData = {
    name: "",
    address: "",
    contact: "",
    email: "",
    exist: false,
  };
  const [newData, setNewData] = useState(initialNewData);
  const handleDelete = (userId) => {
    setData(data.filter((person) => person.id !== userId));
  };
  const handleInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleSubmitButton = () => {
    console.log("newdata is =>", newData);
    if (newData.exist) {
      setData(data.map((user) => (user.id === newData.id ? newData : user)));
      setNewData(initialNewData);
    } else {
      setData([...data, { ...newData, id: data.length + 1 }]);
      setNewData(initialNewData);
    }
  };
  const handleEdit = (user) => {
    setNewData({ ...user, ["exist"]: true });
  };
  const handleAddNewColumn = (e) => {
    if (e.key === "Enter") {
      tableColumn.push({ columnName: newColumn });
      setNewColumn("");
      setShowField(false);
    }
  };

  useEffect(() => {
    console.log("data changed", data);
  }, [data]);
  return (
    <div className="App">
      <div className="input-group">
        <input
          name="name"
          className="input-field"
          placeholder="Enter name"
          value={newData.name}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <input
          name="address"
          className="input-field"
          placeholder="Enter Address"
          value={newData.address}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <input
          name="email"
          type="email"
          className="input-field"
          placeholder="Enter Email"
          value={newData.email}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <input
          name="contact"
          type="tel"
          className="input-field"
          placeholder="Enter Contact"
          value={newData.contact}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <button
          onClick={() => {
            handleSubmitButton();
          }}
        >
          Submit
        </button>
      </div>
      <table>
        <tr>
          {tableColumn.map((heading) => {
            return <th>{heading.columnName}</th>;
          })}
             
          <th>
            <button
              className="action-button"
              onClick={() => {
                setShowField(true);
              }}
            >
              Add Column
            </button>
            {showField && (
              <input
                value={newColumn}
                onChange={(e) => setNewColumn(e.target.value)}
                onKeyDown={(e) => {
                  handleAddNewColumn(e);
                }}
              />
            )}
          </th>
        </tr>
        {data.map((user, index) => {
          return (
            <tr key={index}>
              <td>{user["id"]}</td>
              <td>{user["name"]}</td>
              <td>{user["email"]}</td>
              <td>{user["contact"]}</td>
              <td>{user["address"]}</td>
              <td>
                <button
                  className="action-button"
                  onClick={() => {
                    handleEdit(user);
                  }}
                >
                  Edit
                </button>
                <button
                  className="action-button"
                  onClick={() => {
                    handleDelete(user.id);
                  }}
                >
                  Delete
                </button>
              </td>
                      
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
