import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../Features/ManageUserSlice.js";
import { FaSave, FaEdit, FaTrash } from "react-icons/fa";
import "./Manage.css";
import axios from "axios";
import * as ENV from "../config";

const Manage = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userType, setUserType] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);

  const user = useSelector((state) => state.users.user);
  const allUsers = useSelector((state) => state.manageUsers.allUsers);
  const picURL = `${ENV.SERVER_URL}` + "uploads/";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(getUsers());
    }
  }, [user, dispatch]);

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditedValues({ ...user });
  };

  const handleInputChange = (field, value) => {
    setEditedValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    setProfilePicFile(e.target.files[0]);
  };

  const handleSave = async () => {
    const updatedUser = { ...editedValues, _id: editingUserId, userType };

    if (profilePicFile) {
      const formData = new FormData();
      formData.append("profilePic", profilePicFile);

      try {
        const picResponse = await axios.post(
          `${ENV.SERVER_URL}/uploadProfilePic`,
          formData
        );
        updatedUser.profilePic = picResponse.data.profilePic;
      } catch (err) {
        console.error("Error uploading profile pic:", err);
      }
    }

    dispatch(updateUser(updatedUser));
    setEditingUserId(null);
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setEditedValues({});
  };

  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUser(userToDelete));
    setShowConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const isValidDate = (date) => !isNaN(new Date(date).getTime());

  const calculateAge = (birthday) => {
    if (!birthday || !isValidDate(birthday)) return "Not provided";
    const birthDate = new Date(birthday);
    const today = new Date();
    if (birthDate > today) return "Not yet born";

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference =
      today.getMonth() - birthDate.getMonth() ||
      (today.getDate() < birthDate.getDate() && -1);

    if (monthDifference < 0) age--;
    return age;
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${ENV.SERVER_URL}/getUser/${id}`);
      const user = response.data.user;
      setUserName(user.name);
      setPwd(user.password);
      setProfilePic(user.profilePic);
      setConfirmPassword(user.password);
      setUserType(user.userType);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  return (
    <div className="manage-users-container dark-theme">
      <h2 className="text-center title">Manage Users</h2>
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Birthday</th>
              <th>Age</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => {
              const formattedBirthday =
                user.birthday && isValidDate(user.birthday)
                  ? new Date(user.birthday).toLocaleDateString("en-GB")
                  : "Not provided";

              const userAge = calculateAge(user.birthday);

              const isEditing = editingUserId === user._id;

              return (
                <tr key={user._id} className="gray-and-black-row">
                  <td>
                    <img
                      src={picURL + user.profilePic}
                      alt={user.name}
                      className="user-image"
                    />
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedValues.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedValues.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedValues.phoneNumber || ""}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                      />
                    ) : (
                      user.phoneNumber || "Not provided"
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedValues.birthday}
                        onChange={(e) =>
                          handleInputChange("birthday", e.target.value)
                        }
                      />
                    ) : (
                      formattedBirthday
                    )}
                  </td>

                  <td>{userAge}</td>
                  <td>
                    {isEditing ? (
                      <select
                        id="usertype"
                        name="usertype"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span
                        className={`badge ${
                          user.userType === "admin"
                            ? "badge-admin"
                            : "badge-user"
                        }`}
                      >
                        {user.userType}
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="actions">
                      {isEditing ? (
                        <>
                          <button className="btn save-btn" onClick={handleSave}>
                            <FaSave /> Save
                          </button>
                          <button
                            className="btn cancel-btn"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn edit-btn"
                            onClick={() => handleEdit(user)}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="btn delete-btn"
                            onClick={() => handleDelete(user._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showConfirmModal && (
        <div className="confirm-modal">
          <div className="modal-content">
            <h3>Are you sure you want to delete this user?</h3>
            <p>This action cannot be undone.</p>
            <div>
              <button onClick={handleConfirmDelete} className="btn confirm-btn">
                Yes, Delete
              </button>
              <button onClick={handleCancelDelete} className="btn cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
