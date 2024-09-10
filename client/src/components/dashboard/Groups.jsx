import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Groups = ({
  isSelected,
  theme,
  groupSelected,
  setGroupSelected,
  myGroups,
  user,
  users,
  fetchGroups,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const [isModalOpen1, setModalOpen1] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState(myGroups);
  const [searchGroup, setSearchGroup] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleModal1 = () => setModalOpen1(!isModalOpen1);

  const createGroup = async () => {
    try {
      if (newGroupName) {
        const token = Cookies.get("jwt_token");
        await axios.post(
          "http://localhost:4444/groups/create-group",
          { name: newGroupName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Group created");
        setModalOpen(false);
        setNewGroupName("");
        fetchGroups();
      }
    } catch (error) {
      console.error(error);
      toast.warning("Error creating group");
    }
  };

  const deleteGroup = async (groupId) => {
    try {
      const token = Cookies.get("jwt_token");
      await axios.delete(`http://localhost:4444/groups/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Group Deleted");
      fetchGroups();
    } catch (error) {
      console.error(error);
      alert("Error deleting group");
    }
  };

  const addMember = async () => {
    try {
      const token = Cookies.get("jwt_token");
      await axios.post(
        `http://localhost:4444/groups/${groupSelected}/members`,
        { userId: selectedUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Member added to group");
      setModalOpen1(false);
      setSelectedUserId("");
    } catch (error) {
      console.error(error);
      alert("Error adding member");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onChangeGroups = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchGroup(value);

    if (value === "") {
      // If the search input is cleared, show all groups
      setFilteredGroups(myGroups);
    } else {
      const filtered = myGroups.filter((group) =>
        group.name.toLowerCase().includes(value)
      );
      setFilteredGroups(filtered);
    }
  };

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
   
  }, [searchTerm, users, myGroups, groupSelected, searchGroup]);

  useEffect(() => {
    // Whenever myGroups changes, update filteredGroups
    setFilteredGroups(myGroups);
  }, [myGroups]);

  return (
    <div>
      <div className="d-flex flex-column justify-content-between px-4 py-4">
        <div
          className="d-flex justify-content-between mb-4"
          style={{ height: "25.19px" }}
        >
          <h4
            className="mb-0"
            style={{ fontSize: "21px", color: theme ? "#eff2f7" : "#000000" }}
          >
            {isSelected}
          </h4>
          {user.role === "admin" && (
            <button
              style={{
                textDecoration: "none",
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={toggleModal}
            >
              <i
                className="ri-group-line"
                style={{
                  color: theme ? "#abb4d2" : "#7a7f9a",
                  fontSize: "18px",
                  marginRight: "16px",
                }}
              >
                +
              </i>
            </button>
          )}
        </div>
        <div className="d-flex">
          <span
            className={theme ? "phColorDark" : "phColorLight"}
            style={{
              padding: "8px 4px 8px 16px",
              fontSize: "18px",
              borderTopLeftRadius: "3px",
              borderBottomLeftRadius: "3px",
              backgroundColor: theme ? "#36404a" : "#e6ebf5",
            }}
          >
            <i className="ri-search-line"></i>
          </span>
          <input
            type="search"
            value={searchGroup}
            id={theme ? "gsearchPhDark" : "gsearchPhLight"}
            placeholder="Search groups..."
            className={
              "form-control " + (theme ? "phColorDark" : "phColorLight")
            }
            onChange={(e) => onChangeGroups(e)}
            style={{
              border: "none",
              borderTopRightRadius: "3px",
              borderBottomRightRadius: "3px",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              backgroundColor: theme ? "#36404a" : "#e6ebf5",
              height: "45px",
              padding: "6px 30px",
              fontWeight: "400",
            }}
          />
        </div>
      </div>
      <div className="p-4">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <div
              key={group._id}
              className="px-4 py-3"
              style={{
                backgroundColor:
                  groupSelected === group.name
                    ? theme
                      ? "#36404a"
                      : "#e6ebf5"
                    : "transparent",
              }}
            >
              <div
                onClick={() => setGroupSelected(group.name)}
                className="d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <div
                      className="rounded-circle mr-3 justify-content-center align-items-center d-flex"
                      style={{
                        width: "35.19px",
                        height: "35.19px",
                        color: "#7269ef",
                        backgroundColor: theme ? "#7269ef26" : "#e3e1fc",
                      }}
                    >
                      {group.name[0].toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h5
                      style={{
                        color: theme ? "#eff2f7" : "#343a40",
                        fontSize: "15px",
                      }}
                    >
                      {group.name}
                    </h5>
                  </div>
                </div>
                <div>
                  {user.role === "admin" && (
                    <>
                      <button
                        onClick={toggleModal1}
                        style={{ border: "none", background: "none" }}
                      >
                        <i className="ri-user-add-line"></i>
                      </button>
                      <button
                        onClick={() => deleteGroup(group._id)}
                        style={{ border: "none", background: "none" }}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No group available</p> // Display this when no groups are found
        )}
      </div>

      {/* Modal for creating a group */}
      <Modal isOpen={isModalOpen} onRequestClose={toggleModal}>
        <h2>Create a Group</h2>
        <div className="d-flex ">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Enter group name"
            className="form-control w-25 m-1"
          />
          <button onClick={createGroup} className="btn btn-primary m-1">
            Create Group
          </button>
          <button onClick={toggleModal} className="btn btn-warning m-1">
            Close
          </button>
        </div>
      </Modal>

      {/* Modal for adding a member */}
      <Modal isOpen={isModalOpen1} onRequestClose={toggleModal1}>
        <h2>Add a member to {groupSelected}</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a user..."
          className="form control"
        />
        <ul style={{ listStyleType: "none" }}>
          {filteredUsers.map((user) => (
            <li key={user._id} onClick={() => setSelectedUserId(user._id)}>
              <div onClick={() => setSearchTerm(user.username)} className="m-1">
                {user.username}{" "}
              </div>
            </li>
          ))}
        </ul>
        <button onClick={addMember} className="btn btn-primary m-1">
          Add Member
        </button>
        <button onClick={toggleModal1} className="btn btn-warning m-1">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Groups;
