import { useState } from "react";
import { Avatar, BGProfile } from "../../assets";
import { CiCamera, CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import UpdateAccountPopup from "./UpdateAccountPopup";

function Profile() {
  const user = useSelector((state) => state?.user?.user);

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  };

  return (
    <div className="relative">
      <div className="font-semibold text-2xl">Profile</div>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={BGProfile}
            alt="background"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          <div className="absolute bottom-4 right-4 z-10 xsm:bottom-4 xsm:right-4 px-2 bg-orange-400 rounded-sm">
            <label
              htmlFor="fileInput"
              className="flex cursor-pointer items-center justify-center gap-2 rounded 
            bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
            >
              <input type="file" id="fileInput" style={{ display: "none" }} />
              <span>
                <CiCamera className="text-xl" />
              </span>
              <span className="font-semibold">Edit</span>
            </label>
          </div>
        </div>

        <div className="absolute w-full top-36 flex flex-col items-center justify-center z-30">
          <div className="relative rounded-full border-4 border-slate-200 border-opacity-40">
            <img src={Avatar} alt="avatar" className="w-28 rounded-full" />
            <div
              onClick={handleEditClick}
              className="absolute right-0 bottom-0 bg-orange-400 p-2 rounded-full 
            border shadow-md"
            >
              <CiEdit className="text-xl text-white" />
            </div>
          </div>
          {isEditPopupOpen && (
            <div className="flex">
              <UpdateAccountPopup
                user={user}
                onClose={() => setIsEditPopupOpen(false)}
              />
            </div>
          )}
          <div className="mb-1.5 text-2xl font-semibold text-black">
            {user?.firstName} {user?.lastName}
          </div>
          <p className="font-medium">{user?.email}</p>

          <div className="flex flex-col items-center justify-center mx-auto max-w-180 py-4">
            <div className="font-semibold text-black py-4">About Me</div>
            <p className="mt-4.5 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque posuere fermentum urna, eu condimentum mauris tempus
              ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
              ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
              pharetra ligula sed, aliquam lacus.
            </p>
          </div>

          <div className="mt-6.5 flex flex-col items-center justify-center">
            <div className="font-medium text-slate-500 py-4">
              Link with Social
            </div>
            <div className="flex items-center justify-center gap-3.5 text-slate-500">
              <Link to={"facebook.com"} className="px-2 text-xl">
                <FaFacebookF />
              </Link>
              <Link to={"Twitter.com"} className="px-2 text-xl">
                <FaXTwitter />
              </Link>
              <Link to={"facebook.com"} className="px-2 text-xl">
                <FaLinkedinIn />
              </Link>
              <Link to={"github.com"} className="px-2 text-xl">
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
