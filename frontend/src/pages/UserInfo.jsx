import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";

const UserInfo = () => {
  const countryCode = "+90";
  const { token, backendUrl } = useContext(ShopContext);
  const [userData, setUserData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [isModified, setIsModified] = useState(false);
  const [originalData, setOriginalData] = useState({});

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const fetchUserData = async () => {
    try {
      if (!token) return;

      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token }
      });

      if (response.statusText === "OK") {
        const user = response.data.user;

        setUserData({
          ...user,
          phoneNumber: user.phoneNumber ? user.phoneNumber.slice(3) : ""
        });

        setOriginalData({
          ...user,
          phoneNumber: user.phoneNumber ? user.phoneNumber.slice(3) : ""
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  const handleChange = (e) => {
    const updatedData = { ...userData, [e.target.name]: e.target.value };
    setUserData(updatedData);

    // Kontrol et: orijinal veriden farklı mı?
    const hasChanged =
      updatedData.firstName !== originalData.firstName ||
      updatedData.lastName !== originalData.lastName ||
      updatedData.email !== originalData.email ||
      updatedData.phoneNumber !== originalData.phoneNumber;

    setIsModified(hasChanged);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullPhoneNumber = countryCode + userData.phoneNumber;
    const updatedUserData = {
      ...userData,
      phoneNumber: fullPhoneNumber
    };
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/update`,
        updatedUserData,
        {
          headers: { token }
        }
      );

      if (response.statusText === "OK") {
        toast.success(response.data.message);
        await fetchUserData();
        setIsModified(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  const handlePasswordChange = (e) => {
    const updatedPasswordData = {
      ...passwordData,
      [e.target.name]: e.target.value
    };

    setPasswordData(updatedPasswordData);

    const { currentPassword, newPassword, confirmNewPassword } =
      updatedPasswordData;
    const isValid =
      currentPassword.trim() !== "" &&
      newPassword.trim() !== "" &&
      confirmNewPassword.trim() !== "";

    setIsPasswordValid(isValid);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${backendUrl}/api/user/update-password`,
        passwordData,
        { headers: { token } }
      );

      if (response.statusText === "OK") {
        toast.success(response.data.message);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        });
      }
    } catch (err) {
      console.log(err);
      const errorMessages = err.response.data.error.split(",");
      toast.error(
        <div>
          {errorMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  return (
    <section className="flex flex-col gap-6 pb-20">
      <Title
        title1={"Kullanıcı Bilgilerim"}
        titleStyles={"!pb-0"}
        title1Styles={"!m-0"}
      />
      <div className="grid grid-cols-2 bg-white rounded-xl p-6 md:mb-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 border-r pr-8"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-secondary text-lg font-semibold">
              Üyelik Bilgilerim
            </h3>
            {/* FirstName & LastName */}
            <div className="flex gap-4 max-[576px]:flex-wrap max-[576px]:gap-0">
              <div className="w-[48%] flex flex-col max-[576px]:w-full">
                <label htmlFor="firstName" className="medium-14 ml-1">
                  Ad
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ad"
                  required
                  className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-secondary regular-14 rounded mt-1 py-1.5 px-3"
                  onChange={handleChange}
                  value={userData.firstName}
                />
              </div>
              <div className="w-[48%] flex flex-col max-[576px]:w-full">
                <label htmlFor="lastName" className="medium-14 ml-1">
                  Soyad
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Soyad"
                  required
                  className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-secondary regular-14 rounded mt-1 py-1.5 px-3"
                  onChange={handleChange}
                  value={userData.lastName}
                />
              </div>
            </div>
            {/* Email */}
            <div className="w-full flex flex-col max-[576px]:w-full">
              <label htmlFor="email" className="medium-14 ml-1">
                E-posta adresi
              </label>
              <input
                type="email"
                name="email"
                placeholder="E-posta adresi"
                required
                className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-secondary regular-14 rounded mt-1 py-1.5 px-3"
                onChange={handleChange}
                value={userData.email}
              />
            </div>
            {/* Phone Number */}
            <div className="flex gap-4 max-[576px]:flex-wrap max-[576px]:gap-0">
              <div className="w-[14%] flex flex-col max-[576px]:w-full">
                <label htmlFor="countryCode" className="medium-14 ml-1">
                  Kod
                </label>
                <input
                  type="text"
                  name="countryCode"
                  required
                  disabled
                  className="bg-gray-100 text-gray-400 ring-1 ring-slate-900/15 regular-14 rounded mt-1 py-1.5 px-3"
                  value={countryCode}
                />
              </div>
              <div className="w-full flex flex-col max-[576px]:w-full">
                <label htmlFor="phoneNumber" className="medium-14 ml-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  maxLength={10}
                  placeholder="Telefon"
                  required
                  className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-secondary regular-14 rounded mt-1 py-1.5 px-3"
                  onChange={handleChange}
                  value={userData.phoneNumber}
                />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full !font-bold mt-2 ${
                isModified
                  ? "btn-secondary"
                  : "!bg-gray-100 !text-gray-400 btn-secondary cursor-not-allowed"
              }`}
              disabled={!isModified}
            >
              Güncelle
            </button>
          </div>
        </form>
        <form
          onSubmit={handlePasswordSubmit}
          className="flex flex-col gap-6 pl-8"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-secondary text-lg font-semibold">
              Şifre Güncelleme
            </h3>
            {/* Current Password */}
            <div className="w-full flex flex-col max-[576px]:w-full">
              <label htmlFor="currentPassword" className="medium-14 ml-1">
                Mevcut şifre
              </label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Mevcut şifre"
                required
                className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-secondary regular-14 rounded mt-1 py-1.5 px-3"
                onChange={handlePasswordChange}
                value={passwordData.currentPassword}
              />
            </div>
            {/* New Password */}
            <div className="w-full flex flex-col max-[576px]:w-full">
              <label htmlFor="newPassword" className="medium-14 ml-1">
                Yeni şifre
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Yeni şifre"
                required
                className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-secondary regular-14 rounded mt-1 py-1.5 px-3"
                onChange={handlePasswordChange}
                value={passwordData.newPassword}
              />
            </div>
            {/* Confirm New Password */}
            <div className="w-full flex flex-col max-[576px]:w-full">
              <label htmlFor="confirmNewPassword" className="medium-14 ml-1">
                Yeni şifre tekrar
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Yeni şifre tekrar"
                required
                className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-secondary regular-14 rounded mt-1 py-1.5 px-3"
                onChange={handlePasswordChange}
                value={passwordData.confirmNewPassword}
              />
              {passwordData.confirmNewPassword &&
                passwordData.newPassword !==
                  passwordData.confirmNewPassword && (
                  <p className="text-red-700 text-xs mt-2 pl-1">
                    Şifreler eşleşmiyor.
                  </p>
                )}
            </div>
            <button
              type="submit"
              className={`w-full !font-bold mt-2
                 ${
                   isPasswordValid
                     ? "btn-secondary"
                     : "!bg-gray-100 !text-gray-400 btn-secondary cursor-not-allowed"
                 }`}
              disabled={!isPasswordValid}
            >
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserInfo;
