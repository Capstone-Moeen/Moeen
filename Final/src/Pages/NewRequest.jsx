import React from "react";
import Nav from "../Components/Nav";
import {
  Tooltip,
  Button,
  Input,
  Checkbox,
  Select,
  SelectItem,
  CircularProgress,
  Image,
} from "@nextui-org/react";
import { useState } from "react";
import { SendIcon } from "../Assets/Icons/SendIcon";
import { AddIcon } from "../Assets/Icons/AddIcon";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import defaultMarker from "../Assets/MapPins/DefultPin.svg";
export default function NewRequest() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPVyiX5oN23vqvYmwilNu3zdeQ1yidLv0",
  });
  const [isSelected, setIsSelected] = useState(false);
  const [userPosition, setUserPosition] = useState({});
  const [mapRef, setMapRef] = React.useState();
  const [images, setImages] = useState([]);
  const [imagesObjects, setImagesObjects]= useState([])
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  //Storing the map reference in state to access it later
  const onMapLoad = (map) => {
    setMapRef(map);
  };

  const handelImage = (e) => {
    const reader = new FileReader();

    setImagesObjects([...imagesObjects, e.target.files[0]])
    
    reader.onload = (e) => {
      setImages([...images, e.target.result]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Nav />
      <div className="w-full h-full overflow-auto text-right bg-[#FAFAFB]">
        <div className="w-full flex justify-center h-full items-center p-10 max-sm:p-3">
          <div className="w-[60%] shadow-lg py-10 rounded-lg bg-white max-sm:w-full max-sm:px-2">
            <div className="flex flex-col justify-start  items-center text-center w-full">
              <h1 className="font-extrabold text-[2rem] text-black">
                طلب إضافة مكان جديد
              </h1>
              <p className="text-md pt-3 w-[85%] text-black max-sm:w-full">
                الرجاء تعبئة الأستبيان بمعلومات صحيحة ودقيقة، سيتم مراجعة جميع
                المعلومات قبل أضافة المكان.
              </p>

              <div className="flex flex-col w-[85%] justify-center items-center pt-5 gap-5 max-sm:w-full ">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text-alt font-medium text-xl text-black">
                      اسم المكان
                    </span>
                  </div>
                  <Input
                    className={`w-full text-black  rounded-lg font-medium  border-none
            placeholder-gray-400 text-sm  text-right`}
                    type="text"
                    color="primary"
                    variant="bordered"
                    placeholder=" ادخل اسم المكان"
                  />
                </label>

                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-medium text-xl text-black ">
                      تصنيف المكان
                    </span>
                  </div>
                  <Select
                    placeholder="اختر التصنيف"
                    color="primary"
                    variant="bordered"
                    className="border-none font-medium text-black"
                    aria-label="placeType"
                  >
                    <SelectItem className="text-black" key="restaurant">
                      مطعم
                    </SelectItem>
                    <SelectItem className="text-black" key="Park">
                      منتزه
                    </SelectItem>
                    <SelectItem className="text-black" key="cafe">
                      مقهى
                    </SelectItem>
                    <SelectItem className="text-black" key="shopping">
                      تسوق
                    </SelectItem>
                    <SelectItem className="text-black" key="Other">
                      أخرى
                    </SelectItem>
                  </Select>
                </label>

                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text-alt font-medium text-xl text-black">
                      المنطقة{" "}
                    </span>
                  </div>
                  <Input
                    className={`w-full  rounded-lg font-medium  border-none
            placeholder-gray-400  text-black text-right`}
                    type="text"
                    color="primary"
                    variant="bordered"
                    placeholder=" ادخل اسم المنطقة"
                  />
                </label>

                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text-alt font-medium text-xl text-black">
                      المدينة{" "}
                    </span>
                  </div>
                  <Input
                    className={`w-full  rounded-lg font-medium  border-none
            placeholder-gray-400 text-black  text-right `}
                    type="text"
                    color="primary"
                    variant="bordered"
                    placeholder=" ادخل اسم المدينة"
                  />
                </label>

                <div className="flex flex-col w-full text-start gap-4 pt-3 px-2 max-sm:gap-2">
                  <h1 className="font-medium text-xl text-black">
                    الخدمات المقدمة
                  </h1>

                  <div className="w-full flex gap-44 px-3 max-sm:gap-5">
                    <div className=" flex flex-col gap-3">
                      <Checkbox
                        isSelected={isSelected}
                        onValueChange={setIsSelected}
                        className=" font-medium text-xl  text-black"
                      >
                        <span className="mr-1"> مواقف المقعدين</span>
                      </Checkbox>
                      <Checkbox
                        defaultSelected={false}
                        className=" font-medium text-xl text-black"
                      >
                        <span className="mr-1">المنحدرات</span>
                      </Checkbox>
                      <Checkbox
                        defaultSelected={false}
                        className=" font-medium text-xl text-black"
                      >
                        <span className="mr-1"> طاولات الطعام</span>
                      </Checkbox>
                    </div>

                    <div className=" flex flex-col gap-3">
                      <Checkbox
                        defaultSelected={false}
                        className=" font-medium text-xl text-black"
                      >
                        <span className="mr-1"> دورات المياه</span>
                      </Checkbox>
                      <Checkbox
                        defaultSelected={false}
                        className=" font-medium text-xl text-black"
                      >
                        <span className="mr-1"> المصاعد</span>
                      </Checkbox>
                      <Checkbox
                        defaultSelected={false}
                        className=" font-medium text-xl text-black"
                      >
                        <span className="mr-1"> ابواب اوتوماتيكة</span>
                      </Checkbox>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full text-start gap-3 pt-3 px-2">
                  <h1 className="font-medium text-xl text-black ">
                    اختر الموقع على الخريطة
                  </h1>
                  {!isLoaded ? (
                    <CircularProgress color="primary" />
                  ) : (
                    <>
                      <GoogleMap
                        zoom={16}
                        mapContainerClassName="requersFromMapContainer"
                        center={userPosition}
                        mapContainerStyle={{
                          width: "100%",
                          height: "300px",
                          position: "relative",
                        }}
                        onLoad={onMapLoad}
                      >
                        <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent">
                          <img
                            src={defaultMarker}
                            className="w-10 h-10"
                            alt="location"
                          />
                        </Button>
                      </GoogleMap>
                    </>
                  )}
                </div>

                <div className="flex flex-col w-full text-start gap-3 pt-3 px-2">
                  <h1 className="font-medium text-xl text-black">
                    إضافة صور للمكان
                  </h1>
                  <div className={`${images.length != 0 ? "border":""} border-[#005B41] w-full grid grid-cols-3 grid-rows-2 rounded-lg items-center justify-items-center relative`}>
                    <img
                      className="object-fill object-center rounded w-full"
                     
                      src={images[0]}
                    ></img>
                    <img
                      className="object-cover object-center rounded  w-full"
                     
                      src={images[1]}
                    ></img>
                    <img
                      className="object-cover object-center rounded  w-full"
                      
                      src={images[2]}
                    ></img>
                    <img
                      className="object-cover object-center rounded  w-full"
                     
                      src={images[3]}
                    ></img>
                    <img
                      className="object-cover object-center rounded  w-full"
                      
                      src={images[4]}
                    ></img>
                    <img
                      className="object-cover object-center rounded w-full"
                      
                      src={images[5]}
                    ></img>

                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      accept=".jpg, .jpeg, .png"
                      onChange={handelImage}
                    />
                    <label
                      htmlFor="file"
                      className={`bg-[#005B41] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded p-2 ${
                        images.length >= 6 ? "hidden" : ""
                      }`}
                    >
                      <AddIcon size={24} color="white" />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col w-full text-start pt-3 px-2 ">
                  <Checkbox
                    defaultSelected
                    className=" font-medium text-xl text-black"
                  >
                    أوافق على
                    <span className="text-[#005B41]"> الشروط والأحكام </span>
                    وسياسة
                    <span className="text-[#005B41]"> الخصوصية </span>
                  </Checkbox>
                </div>

                <Button
                  className=" flex  justify-center items-center bg-[#005B41] text-white font-bold text-xl w-[25%] mt-3 max-sm:text-base max-sm:w-[50%]"
                  endContent={<SendIcon size={24} />}
                  size="lg"
                >
                  ارسال
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
