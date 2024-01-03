import React, { useContext, useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { CloseIcon } from "../Assets/Icons/CloseIcon";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AddNewPlaceIcon } from "../Assets/Icons/AddNewPlaceIcon";
import { HomeIcon } from "../Assets/Icons/HomeIcon";
import { ProfileIcon } from "../Assets/Icons/ProfileIcon";
import { FavoriteIcon } from "../Assets/Icons/FavoriteIcon";
import { LanguageIcon } from "../Assets/Icons/LanguageIcon";
import { BlindColorIcon } from "../Assets/Icons/BlindColorIcon";
import { EasyModeIcon } from "../Assets/Icons/EasyModeIcon";
import { SignOutIcon } from "../Assets/Icons/SignOutIcon";
import userIcon from "../Assets/Icons/user.svg";
import { AddIcon } from "../Assets/Icons/AddIcon";
import SignInWindow from "./SignInWindow";
import SignUpWindow from "./SignUpWindow";
import { ArLogo } from "../Assets/Logo/ArLogo";
import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import { CheckIcon } from "../Assets/Icons/CheckIcon";
import { EmailAuthProvider, updateProfile, updateEmail, reauthenticateWithCredential } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc, collection } from "firebase/firestore";
import { storage,db } from "../Config/firebase";
// import { usePassword } from "../Context/PasswordContext"; in future ill do it c:

function Nav({ handelLayoutChange, easyMode }) {

  // const { password } = usePassword();
  // console.log('pass ' + password);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { currentUser } = useContext(AuthContext); // to get the user info c:
  const userMenuRef = React.useRef(); //for the menu

  // const [image, setImage] = useState();
  const [userAvatar, setUserAvatar] = useState()

  // to close the menu every time the user clicks anywhere
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [updateName, setUpdateName] = React.useState(false);
  const [updateUserEmail, setUpdateUserEmail] = React.useState(false);

  const local_username = localStorage.getItem('username')
  const local_userEmail = localStorage.getItem('userEmail')

  const [newName, setNewName] = React.useState(local_username)
  // const [newEmail, setNewEmail] = React.useState(local_userEmail)

  const userMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };
  const admins = ["RdDQQRbPBIWUcmD10UICl6S7TTb2"];
  const sign_out = () => {
    signOut(auth);
    localStorage.clear()
    setShowUserMenu(false);
    navigate("/");
  };

  // for sign in model
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // for sign up model
  const [isSignUpModel, setIsSignUpModel] = React.useState(false);

  const openSignUpModel = () => {
    console.log("hello");
    setIsSignUpModel(!isSignUpModel);
  };

  const changeLayout = () => {
    localStorage.setItem("easy", !easyMode);
    handelLayoutChange();
  };

  React.useEffect(() => {
    // scrollRef.current.scrollIntoView()
    const outsideClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (admins.includes(currentUser.uid)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    document.body.addEventListener("click", outsideClick);
    return () => {
      document.body.removeEventListener("click", outsideClick);
    };
  }, [showUserMenu]);

  const updateUsername = (e) => {
    e.stopPropagation(); 
    setUpdateName(!updateName);
    console.log('e');
  };
  
  // const update_Email = (e) => {
  //   e.stopPropagation(); 
  //   setUpdateUserEmail(!updateUserEmail);
  // };

  const handleNameChange = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      setUpdateName(false);
    } catch (error) {
      // console.error(error.message);
    }
  };


  const uploadAvatar = async (e) => {
    const file = e.target.files[0];
 
    if (file) {
       const avatarURL = await handleAvatarUpload(file);

      //  await updateProfile(auth.currentUser, { photoURL: file });
       await updateDoc(doc(db, "users", currentUser.uid), {
          avatar: avatarURL,
       });
    }
 };

 const handleAvatarUpload = async (file) => {
  const date = new Date();
  const storageRef = ref(
     storage,
     `Avatars/${currentUser.uid}_${date.getTime()}`
  );

  try {
     await uploadBytes(storageRef, file);
     const avatarURL = await getDownloadURL(storageRef);
     return avatarURL;
  } catch (error) {
     console.error(error.message);
  }
};

// getting the avatar from the firebase
useEffect(() => {
  const getAvatar = async () => {
    const docRef = doc(db, 'users', currentUser.uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const userAvatar = userData.avatar;

      setUserAvatar(userAvatar);
    }
  };

  getAvatar();
}, [currentUser]);

  const changingName =(event)=>{
    // console.log('hi '+ event);
    setNewName(event.target.value)
  }

  // console.log(currentUser);

  return (
    <>
      {isAdmin ? (
        <nav className="bg-[#005B41] h-[12vh] flex justify-between py-4 px-8 items-center">
          <Link to="/">
            <div className="">
              <ArLogo size={100} />
            </div>
          </Link>

          {isAdmin ? (
            <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              className="flex text-sm rounded-full md:me-0 focus:ring-4"
              id="user-menu-button"
              onClick={userMenuClick}
            >
              <img
                className="w-12 h-12 rounded-full"
                src={userIcon}
                alt="user icon"
              />
            </button>

            {showUserMenu && (
              <div
                className="absolute left-1 top-20 text-right mt-2 w-80 max-sm:w-64 bg-white border 
                rounded-lg shadow z-[1000] overflow-y-auto max-h-[80vh]"
              >
                <div className="py-2">
                  <div className="px-4 py-3">
                    <span onClick={userMenuClick} className="">
                      <CloseIcon />
                    </span>

                    <div className="text-center flex flex-col">
                      {/* avatar  */}
                      <div>
                        <div className="avatar relative">
                          <div className="w-24 rounded-full">
                            <img src={userIcon} />
                            <div>
                              {/* <div className="absolute bg-[#005B41] rounded-full p-1 bottom-0.5">
                                {" "}
                                <AddIcon />{" "}
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* username  */}
                      <div
                        className="flex justify-center items-center text-black 
                     font-bold gap-2"
                      >
                        <div>{currentUser.displayName}</div>
                        <div>
                          {/* <AddNewPlaceIcon size={16} /> */}
                        </div>
                      </div>

                      {/* user email  */}
                      <div
                        className="flex justify-center items-center text-gray-600 
                     font-bold gap-2 mb-6"
                      >
                        <div>{currentUser.email}</div>
                        <div>
                          {/* <AddNewPlaceIcon size={16} /> */}
                        </div>
                      </div>
                    </div>

                    <hr
                      className="w-48 h-1 mx-auto bg-gray-200 border-0 
                      rounded md:my-1 max-sm:my-7"
                    />
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to="/Dashboard"
                        className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                      >
                        <EasyModeIcon />
                        لوحة المعلومات
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                      >
                        <HomeIcon />
                        الرئيسية
                      </Link>
                    </li>
                    <li className="flex w-full items-center">
                      <Link
                        to="/NewRequest"
                        className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                      >
                        <AddNewPlaceIcon />
                        اضافة مكان جديد
                      </Link>
                    </li>

                    {/* <li>
                        <Link to="/" className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full">
                        <FavoriteIcon />
                        من نحن
                        </Link>
                      </li> */}

                    <hr
                      className="w-48 h-1 mx-auto bg-gray-200 border-0 
                      rounded md:my-7 max-sm:my-7"
                    />

                    <li>
                      <Link
                        to="/"
                        className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                      >
                        <LanguageIcon />
                        اللغة العربية
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                      >
                        <BlindColorIcon />
                        عمى الالوان
                      </Link>
                    </li>
                    {easyMode ? (
                      <li>
                        <button
                          onClick={handelLayoutChange}
                          className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                        >
                          <EasyModeIcon />
                          الوضع الافتراضي
                        </button>
                      </li>
                    ) : (
                      <li>
                        <button
                          onClick={handelLayoutChange}
                          className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                        >
                          <EasyModeIcon />
                          الوضع السهل
                        </button>
                      </li>
                    )}

                    <hr
                      className="w-48 h-1 mx-auto bg-gray-200 border-0 
                      rounded md:my-7 max-sm:my-7"
                    />

                    <li>
                      <button
                        onClick={sign_out}
                        className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                      >
                        <SignOutIcon />
                        تسجيل الخروج
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button
            size="lg"
            onClick={openModal}
            className="text-black font-bold bg-white lg:text-xl 
        max-sm:text-sm md:text-base"
          >
            تسجيل دخول
          </Button>
        )}
        </nav>
      ) : (
        <nav className="bg-[#005B41] h-[12vh] flex justify-between py-4 px-8 items-center">
          <Link to="/">
            <div className="">
              <ArLogo size={100} />
            </div>
          </Link>

          <div className="lg:w-[35rem] md:w-[16rem] max-sm:w-[16rem]">
            <Input
              classNames={{
                base: `sm:max-w-[10rem] h-12 max-sm:hidden`,
                mainWrapper: "h-full",
                input: "text-large",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-white lg:w-[35rem] md:w-[20rem] max-md:w-[15rem] max-sm:w-[4rem]",
              }}
              placeholder="بحث"
              endContent={<SearchIcon size={22} />}
              type="search"
              fullWidth={true}
            />
          </div>

          {currentUser ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                className="flex text-sm rounded-full md:me-0 focus:ring-4"
                id="user-menu-button"
                onClick={userMenuClick}
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src={userAvatar || userIcon}
                  alt="user icon"
                />
              </button>

              {showUserMenu && (
                <div
                  className="absolute left-1 top-20 text-right mt-2 w-80 max-sm:w-64 bg-white border 
                  rounded-lg shadow z-[1000] overflow-y-auto max-h-[80vh]"
                >
                  <div className="py-2">
                    <div className="px-4 py-3">
                      <span onClick={userMenuClick} className="">
                        <CloseIcon />
                      </span>

                      <div className="text-center flex flex-col">
                        {/* avatar  */}
                        <div>
                          <div className="avatar relative">
                            <div className="w-24 rounded-full">
                              <img src={userAvatar || userIcon} />
                              <div>
                                <div className="absolute bg-[#005B41] rounded-full p-1 bottom-0.5">
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    accept=".jpg, .jpeg, .png"
                                    onChange={uploadAvatar}
                                    />
                                    <label
                                    htmlFor="file"
                                    >
                                       {" "} <AddIcon /> {" "}
                                    </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* username  */}
                        <div
                          className="flex justify-center items-center text-black 
                       font-bold gap-2"
                        >

                        <div>
                                  {updateName ? (
                                    <div className="flex justify-center">
                                      <Input
                                        className={`text-black rounded-lg font-medium border-none
                                        placeholder-gray-400 text-sm text-right w-[100%] lg:w-[100%]
                                        mb-3 mt-3`}
                                        color="black"
                                        variant="bordered"
                                        type="text"
                                        label="اسم المستخدم"
                                        value={newName}
                                        // name='username'
                                        onChange={(event)=>{changingName(event)}}
                                        size='xs'
                                      />
                                      <div className="mt-3" onClick={handleNameChange}>
                                        <CheckIcon size={45} />
                                      </div>
                                      {/* <Button color="success" onClick={handleNameChange}>حفظ</Button> */}
                                    </div>
                                  ) : (
                                    <div className="flex justify-center items-center gap-1">
                                      <div>{currentUser.displayName}</div>
                                     <div onClick={(e) => { updateUsername(e) }}>
                                     <AddNewPlaceIcon size={16} />
                                      </div> 
                                    </div>
                                  )}
                                </div>
                              </div>

                        {/* user email  */}
                        <div
                          className="flex justify-center items-center text-gray-600 
                       font-bold gap-2 mb-6"
                        >
                          {/* <div>
                            {updateUserEmail ? (
                              <div className="flex justify-center">
                                <Input
                                
                                  className={`text-black rounded-lg font-medium border-none
                                  placeholder-gray-400 text-sm text-right w-[100%]
                                  px-10 mb-9 max-sm:py-5 max-sm:px-0`}
                                  color="black"
                                  variant="bordered"
                                  type="email"
                                  label="البريد الالكتروني"
                                  value={newEmail}
                                  onChange={(event)=>{setNewEmail(event.target.value)}}
                                  size='sm'
                                />
                                <div className="ml-9" onClick={handleEmailChange}>
                                <CheckIcon size={66} />
                                </div> */}
                                {/* <Button color="success" >حفظ</Button> */}
                              {/* </div> */}
                            {/* ) : ( */}
                              <div className="flex justify-center items-center gap-1">
                                <div>{currentUser.email}</div>
                                {/* <div onClick={(e)=>{update_Email(e)}}>
                                <AddNewPlaceIcon size={16} />
                                </div> */}
                              </div>
                            {/* )} */}

                         {/* </div>  */}
                      </div>
                      </div>

                      <hr
                        className="w-48 h-1 mx-auto bg-gray-200 border-0 
                        rounded md:my-1 max-sm:my-7"
                      />
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <Link
                          to="/"
                          className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                        >
                          <HomeIcon />
                          الرئيسية
                        </Link>
                      </li>
                      <li className="flex w-full items-center">
                        <Link
                          to="/NewRequest"
                          className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                        >
                          <AddNewPlaceIcon />
                          اضافة مكان جديد
                        </Link>
                      </li>

                      {/* <li>
                          <Link to="/" className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full">
                          <FavoriteIcon />
                          من نحن
                          </Link>
                        </li> */}

                      <hr
                        className="w-48 h-1 mx-auto bg-gray-200 border-0 
                        rounded md:my-7 max-sm:my-7"
                      />

                      <li>
                        <Link
                          to="/"
                          className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                        >
                          <LanguageIcon />
                          اللغة العربية
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                        >
                          <BlindColorIcon />
                          عمى الالوان
                        </Link>
                      </li>
                      {easyMode ? (
                        <li>
                          <button
                            onClick={() => changeLayout()}
                            className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                          >
                            <EasyModeIcon />
                            الوضع الافتراضي
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() => changeLayout()}
                            className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                          >
                            <EasyModeIcon />
                            الوضع السهل
                          </button>
                        </li>
                      )}

                      <hr
                        className="w-48 h-1 mx-auto bg-gray-200 border-0 
                        rounded md:my-7 max-sm:my-7"
                      />

                      <li>
                        <button
                          onClick={sign_out}
                          className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full"
                        >
                          <SignOutIcon />
                          تسجيل الخروج
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              size="lg"
              onClick={openModal}
              className="text-black font-bold bg-white lg:text-xl 
          max-sm:text-sm md:text-base"
            >
              تسجيل دخول
            </Button>
          )}

          {/* to render the models :3 */}
          <SignInWindow
            isOpen={isModalOpen}
            openModal={openModal}
            openSignUpModel={openSignUpModel}
          />
          <SignUpWindow
            isSignUpModel={isSignUpModel}
            openSignUpModel={openSignUpModel}
            openModal={openModal}
          />
        </nav>
      )}
    </>
  );
}

export default Nav;
