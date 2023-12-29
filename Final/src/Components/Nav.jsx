import React from "react";
import { Input, Button } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { CloseIcon } from "../Assets/Icons/CloseIcon";
import { Link, useNavigate } from "react-router-dom";
import { AddNewPlaceIcon } from "../Assets/Icons/AddNewPlaceIcon";
import { HomeIcon } from "../Assets/Icons/HomeIcon";
import { ProfileIcon } from "../Assets/Icons/ProfileIcon";
import { FavoriteIcon } from "../Assets/Icons/FavoriteIcon";
import { LanguageIcon } from "../Assets/Icons/LanguageIcon";
import { BlindColorIcon } from "../Assets/Icons/BlindColorIcon";
import { EasyModeIcon } from "../Assets/Icons/EasyModeIcon";
import { SignOutIcon } from "../Assets/Icons/SignOutIcon";
import user from '../Assets/Icons/user.svg'
import { AddIcon } from "../Assets/Icons/AddIcon";

function Nav() {

  const navigate = useNavigate()
  const [isLogged, setIsLogged] = React.useState(true)

  // to close the menu every time the user clicks anywhere 
  const userMenuRef = React.useRef();
  // const scrollRef = React.useRef();

  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const userMenuClick = () => {
        setShowUserMenu(!showUserMenu);
    };

  const sign_out = () => {
        localStorage.clear()
        setIsLogged(false)
        setShowUserMenu(false);
    };

    React.useEffect(() => {
      // scrollRef.current.scrollIntoView()

      const outsideClick = (e) => {

        if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
          setShowUserMenu(false);
        }
      };
  

      document.body.addEventListener("click", outsideClick);
      return () => {
        document.body.removeEventListener("click", outsideClick);
      };
    }, [showUserMenu]);

  return (
    <>
      <nav className="bg-[#005B41] h-[12vh] flex justify-between py-4 px-8 items-center">
        <h1 className="text-white font-bold text-4xl">Logo</h1>
        <div className="w-[35rem] max-sm:w-[16rem]">
          <Input
            classNames={{
              base: " sm:max-w-[10rem] h-12 max-sm:hidden",
              mainWrapper: "h-full",
              input: "text-large",
              inputWrapper:
                "h-full font-normal text-default-500 bg-white w-[35rem] mr-10 max-sm:w-[4rem]",
            }}
            placeholder="بحث"
            size="lg"
            endContent={<SearchIcon size={22} />}
            type="search"
            fullWidth={true}
          />
        </div>

        {isLogged ? 
        <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="flex text-sm rounded-full md:me-0 focus:ring-4"
                  id="user-menu-button"
                  // aria-expanded={showUserMenu}
                  onClick={userMenuClick}
                >
                  <img className="w-12 h-12 rounded-full" src={user} alt="user icon" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute left-1 top-20 text-right mt-2 w-80 max-sm:w-64 bg-white border 
                  rounded-lg shadow z-[1000] overflow-y-auto max-h-[80vh]"
                  // ref={scrollRef}
                  >
                    <div className="py-2">
                      <div className="px-4 py-3"> 

                       <span 
                        onClick={userMenuClick}
                        className="">
                          <CloseIcon />
                        </span>

                      <div className="text-center flex flex-col">
                        {/* avatar  */}
                       <div>
                            <div className="avatar relative">
                            <div className="w-24 rounded-full">
                              <img src={user} />
                              <div>
                                <div className="absolute bg-[#005B41] rounded-full p-1 bottom-0.5"> <AddIcon /> </div>
                              </div>
                            </div>
                          </div>
                       </div>

                       {/* username  */}
                       <div className="flex justify-center items-center text-black 
                       font-bold gap-2">
                        <div>تسنيم سليمان</div>
                        <div><AddNewPlaceIcon size={16}/></div>
                       </div>

                       {/* user email  */}
                       <div className="flex justify-center items-center text-gray-600 
                       font-bold gap-2 mb-6">
                        <div>tasneem.luhimi@gmail.com</div>
                        <div><AddNewPlaceIcon size={16}/></div>
                       </div>
                       
                      </div>

                      <hr className="w-48 h-1 mx-auto bg-gray-200 border-0 
                        rounded md:my-1 max-sm:my-7"/>
                        
                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <Link to="/" className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full">
                            <HomeIcon />
                            الرئيسية
                          </Link>
                        </li>
                        <li className="flex w-full items-center">
                        <Link to="/NewRequest" className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full">
                        <AddNewPlaceIcon />
                        اضافة مكان جديد
                          </Link>

                        </li>
                        
                        {/* <li>
                          <Link to="/" className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full">
                          <FavoriteIcon />
                          المفضلة
                          </Link>
                        </li> */}

                        <hr className="w-48 h-1 mx-auto bg-gray-200 border-0 
                        rounded md:my-7 max-sm:my-7"/>

                          <li>
                          <Link to="/" className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full">
                          <LanguageIcon />
                          اللغة العربية
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full">
                          <BlindColorIcon />
                          عمى الالوان
                          </Link>
                        </li>
                        <li>
                          <Link to="/EasyLayout" className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full">
                          <EasyModeIcon />
                          الوضع السهل
                          </Link>
                        </li>

                        <hr className="w-48 h-1 mx-auto bg-gray-200 border-0 
                        rounded md:my-7 max-sm:my-7"/>

                        <li>
                          <button 
                          onClick={sign_out}
                          className="text-black px-4 py-2 hover:bg-gray-100 font-bold text-lg flex gap-5 w-full">
                          <SignOutIcon />
                          تسجيل الخروج
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                )}
              </div>
        :
        <Button 
        onClick={()=>{navigate('/SignIn')}}
        className="text-black font-bold bg-white text-xl max-sm:text-sm p-2 ">
          تسجيل دخول
        </Button>
        }
        
      </nav>
    </>
  );
}

export default Nav;
