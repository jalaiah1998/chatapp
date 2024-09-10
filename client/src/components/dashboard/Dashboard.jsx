import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import MenuDesc from "./MenuDesc";
import ChatBox from "./ChatBox";
import Cookies from 'js-cookie'

const Dashboard = () => {
  const [isSelected, setIsSelected] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [theme, setTheme] = useState(false);
  const [chatBox, setChatBox] = useState("0");
  const [conversationId, setConversationId] = useState(null);
  const [user, setUser] = useState()
  const navigate = useNavigate();
  const [myGroups, setMyGroups] = useState([])
  const [groupSelected, setGroupSelected] = useState("");

  useEffect(() => {
    let token = Cookies.get('jwt_token');
    if(!token){
      navigate('/')
    }

    fetchUserDetails();
    fetchGroups();
    fetchAllUsers();

    
  }, [ navigate, groupSelected]);

  const fetchUserDetails=async()=>{
    try{
      axios.get('http://localhost:4444/auth/profile', {
        headers:{
          'Authorization':`Bearer ${Cookies.get('jwt_token')}`
        }
      })
      .then((res)=>setUser(res.data))

    }catch(e){
      console.log(e)
    }
  }

  const fetchGroups = async()=>{
    try{
      axios.get('http://localhost:4444/groups/my-groups', {
        headers:{
          'Authorization':`Bearer ${Cookies.get('jwt_token')}`
        }
      })
      .then((res)=>setMyGroups(res.data))

    }catch(e){
      console.log(e)
    }
  }

  const fetchAllUsers=()=>{
    try{
      axios.get('http://localhost:4444/users/all-users', {
        headers:{
          'Authorization':`Bearer ${Cookies.get('jwt_token')}`
        }
      })
      .then((res)=>setUsers(res.data))

    }catch(e){
      console.log(e)
    }
  }

 





  return (
    <div
      className="conta"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: theme ? "#303841" : "#f1f1ff",
      }}
    >
      <Sidebar
        setThemee={() => setTheme((prevTheme) => !prevTheme)}
        theme={theme}
        isSelected={isSelected}
        
        setIsSelected={setIsSelected}
      />

      <MenuDesc
        chatUser={chatUser}
        setChatUser={setChatUser}
        setChatBox={setChatBox}
        theme={theme}
        user={user}
        setConversationId={setConversationId}
        users={users}
        isSelected={isSelected}
        myGroups={myGroups}
        fetchGroups={fetchGroups}
        groupSelected={groupSelected} // Pass the selected group state
        setGroupSelected={setGroupSelected} // Pass the setter for groupSelected
      />

      <ChatBox
        chatBox={chatBox}
        setChatBox={setChatBox}
        theme={theme}
        conversationId={conversationId}
        chatUser={user}
        groupId={groupSelected}
      />
    </div>
  );
};

export default Dashboard;
