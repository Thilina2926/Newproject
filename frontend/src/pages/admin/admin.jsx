import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Admin component to display user data in a table
function Admin() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // useEffect to call the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/users");
        setData(response.data); // Assuming the API returns an array of users
        console.log(response);
      } catch (err) {
        console.log(err)
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/users/${id}`);
      console.log("User deleted:", response.data);

      // Update the users list on successful deletion
      setData((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };
  const handleStatusChange = async (id, newStatus) => {
    try {
      console.log(id, newStatus);
      await axios.put(`http://127.0.0.1:5000/users/${id}`, {
        status: newStatus,
      });
      alert("Status updated");
      setData((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const editData = (id) => {
    navigate(`/EditForm/${id}`);
  };

  const calculateStatusCounts = () => {
    const statusCounts = {
      Accepted: 0,
      Rejected: 0,
      Processing: 0,
    };

    data.forEach((user) => {
      if (statusCounts[user.status] !== undefined) {
        statusCounts[user.status]++;
      }
    });

    return statusCounts;
  };
  const { Accepted, Rejected, Processing } = calculateStatusCounts();
  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Admin Dashboard: User Data</h3>
      <p>
          Accepted: {Accepted} &nbsp;&emsp;&nbsp; Rejected: {Rejected}
          &nbsp;&emsp;&nbsp; Processing: {Processing}
      </p>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Selected Course</th>
            <th>Uploaded Image</th>
            <th>Uploaded Document</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            // eslint-disable-next-line react/prop-types
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.course}</td>
                <td>
                  <a href={item.image} style={styles.link}>
                    View
                  </a>
                </td>
                <td style={styles.tableCell}>
                  <a href={item.document} style={styles.link}>
                    View
                  </a>
                </td>

                <td>
                  <select
                    style={styles.select}
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(item.id, e.target.value)
                    }
                  >
                    <option value="Processing">Processing</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <button
                    style={styles.button}
                    onClick={() => editData(item.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteUser(item.id)}
                    style={styles.button1}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
const styles = {
  button1: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    marginLeft: "5px",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  select: {
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
};
