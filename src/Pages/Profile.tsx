import { useEffect, useState } from "react";
import { ProfileService } from "../Services/Profile";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    ProfileLoad();
  });
  const [profilePicture, setProfilePicture] = useState("");
  const [nameProfile, setNameProfile] = useState("");
  const [emailProfile, setEmailProfile] = useState("");
  const [loadPage, setLoadPage] = useState(true);
  const ProfileLoad = async () => {
    const token = localStorage.getItem("token");
    const data = await ProfileService.profileUser(token);
    setProfilePicture(data.avatar.high);
    setEmailProfile(data.email);
    setNameProfile(data.name);
    setLoadPage(false);
  };

  const handleClick = () => {
    localStorage.removeItem("token");
    setLoadPage(true);
    navigate("/");
  };
  return (
    <>
      {loadPage ? (
        <div className="flex justify-center  h-screen">
          <div className="content-center">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#02274F"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      ) : (
        <main className="h-screen bg-zinc-100 flex flex-col items-center justify-start font-roboto gap-20">
          <div className="h-20 w-screen bg-white flex justify-end items-center px-20">
            <button
              onClick={handleClick}
              className="bg-b2bit 
        rounded 
        font-semibold 
        text-white h-12
       w-64
       hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
          <div className="flex-col h-2/4  w-96 bg-white flex items-center justify-center shadow-2xl rounded-lg gap-6">
            <div className="flex flex-col gap-4 w-full max-w-xs items-center">
              <div className="flex flex-col items-center">
                <p className="gap-1">Profile Picture</p>
                <div
                  className=" h-16 w-16 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${profilePicture})` }}
                ></div>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="flex">
                  <p>Your</p> <p className="font-semibold px-1 ">Name</p>
                </label>
                <input
                  type="text"
                  value={nameProfile}
                  className="border-none border-zinc-300 shadow-sm rounded h-12 w-80 px-3 bg-zinc-100 font-light "
                  disabled
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="flex">
                  <p>Your</p> <p className="font-semibold px-1 ">E-mail</p>
                </label>
                <input
                  type="email"
                  value={emailProfile}
                  className="border-none border-zinc-300 shadow-sm rounded h-12 px-3 bg-zinc-100 font-light w-80"
                  disabled
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Profile;
