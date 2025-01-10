import { useSelector } from "react-redux";
import user from "../Images/logo.jpg";
import * as ENV from "../config";
const User = (userData) => {
  const user = useSelector((state) => state.users.user);

  const picURL = `${ENV.SERVER_URL}/uploads/` + user.profilePic;

  // استخراج التاريخ فقط من birthday
  const formattedBirthday = user.birthday
    ? new Date(user.birthday).toLocaleDateString("en-GB") // تنسيق اليوم/الشهر/السنة
    : "Not provided";

  // حساب العمر
  const calculateAge = (birthday) => {
    if (!birthday) return "Not provided";
    const birthDate = new Date(birthday);
    const today = new Date();

    if (birthDate > today) {
      return "Not yet born"; // إذا كان تاريخ الميلاد في المستقبل
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
    const user = userData.userData;
  };

  const userAge = user.birthday ? calculateAge(user.birthday) : "Not provided";

  return (
    <div className="user-card">
      <div className="user-image-container">
        <img src={picURL} className="user-image-o" />
      </div>
      <div className="user-info">
        <h4 className="user-name">{user.name}</h4>
        <p className="user-email">{user.email}</p>
        <p className="user-phone">{user.phoneNumber || "No phone number"}</p>
        <p className="user-birthday">Birthday: {formattedBirthday}</p>
        <p className="user-age">Age: {userAge}</p>
      </div>
    </div>
  );
};

export default User;
