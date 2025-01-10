import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as ENV from "../config";
//import * as ENV from "../config";
const ManageProfile = () => {
  const [user, setUser] = useState({});
  const id = useParams().id;
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userType, setuserType] = useState();

  const getUser = async () => {
    try {
      const response = await axios.get(`${ENV.SERVER_URL}/getUser/${id}`);
      const user = response.data.user;
      //console.log(user);
      setUserName(user.name);
      setPwd(user.password);
      setProfilePic(user.profilePic);
      setConfirmPassword(user.password);
      setuserType(user.userType);
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(user);
    }
  };
  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);
  return <div></div>;
};

export default ManageProfile;
