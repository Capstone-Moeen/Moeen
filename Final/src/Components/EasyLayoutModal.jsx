import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CircularProgress,
  Divider,
} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { DirectionsIcon } from "../Assets/Icons/DirectionsIcon";
import ServicesGrid from "./ServicesGrid";
import RatingRow from "./RatingRow";
import RatingModal from "./RatingModal";
import { Carousel } from "react-responsive-carousel";
import calculateDistance from "../utils/CalculateDistance";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HeartIcon } from "../Assets/Icons/HeartIcon";
import { AuthContext } from "../Context/AuthContext";
import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import toastSuccess from "../utils/Toast";
import { db } from "../Config/firebase";

function EasyLayoutModal({ isOpen, onOpenChange, placeData, userLocation }) {
  const [selected, setSelected] = React.useState("details");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [count, setCount] = useState(1);
  const { currentUser } = useContext(AuthContext);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    getUserLikes();
  }, [count]);

  const getUserLikes = async () => {
    try {
      const querySnapshot = await getDoc(doc(db, "users", currentUser.uid));
      const data = querySnapshot.data().favorites;
      setUserLikes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTofavorite = async (place) => {
    if (userLikes.includes(place.id)) {
      await updateDoc(doc(db, "users", currentUser.uid), {
        favorites: arrayRemove(place.id),
      }).then(() => {
        setCount(count + 1);
      });
    } else {
      try {
        await updateDoc(doc(db, "users", currentUser.uid), {
          favorites: arrayUnion(place.id),
        }).then(() => {
          console.log("added");
          toastSuccess("تمت العملية بنجاح");
          setCount(count + 1);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Rating Modal Handel
  const handelOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        scrollBehavior="inside"
        className="overflow-hidden relative"
      >
        <Modal
          className="overflow-y-auto overflow-x-hidden "
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="blur"
          motionProps={{
            variants: {
              enter: {
                y: 0,
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                x: 200,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent className="h-[90%] ">
            {(onClose) => (
              <>
                <button
                  className="absolute top-2 left-3 p-2 rounded-full bg-[rgba(0,0,0,0.6)]  text-white z-50 hover:bg-[rgba(0,0,0,0.8)]"
                  onClick={onClose}
                >
                  <svg
                    viewBox="-0.5 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M3 21.32L21 3.32001"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M3 3.32001L21 21.32"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
                <ModalBody className="gap-1 p-0 z-0 ">
                  <Carousel
                    className="slider rounded-2xl "
                    showThumbs={false}
                    autoPlay
                    dynamicHeight
                    infiniteLoop={true}
                    swipeable
                    interva={2000}
                  >
                    {placeData.Images.map((image, index) => (
                      <div key={index} className="">
                        <img
                          className="h-52 object-cover object-center "
                          src={image}
                        />
                      </div>
                    ))}
                  </Carousel>
                  <Button
                    isIconOnly
                    color="danger"
                    className="absolute top-40 left-2 z-50 "
                    aria-label="Like"
                    onClick={() => {
                      addTofavorite(placeData);
                    }}
                  >
                    <HeartIcon
                      filled={userLikes.includes(placeData.id) ? true : false}
                    />
                  </Button>
                  <div className="flex justify-between px-3 items-center">
                    <div className="flex flex-col">
                      <h1 className="text-right font-bold text-2xl  mt-2 max-sm:text-xl">
                        {placeData.placeName}
                      </h1>
                      <span className="text-[#70757a]">
                        {calculateDistance(
                          userLocation.lat,
                          userLocation.lng,
                          placeData.placeLocation.lat,
                          placeData.placeLocation.lng
                        )}
                        <span className="mr-1">كم</span>
                      </span>
                    </div>
                    <Button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${placeData.placeLocation.lat},${placeData.placeLocation.lng}`,
                          "_blank"
                        )
                      }
                      className="bg-[#005B41]  text-white font-semibold w-32  text-md max-sm:text-sm max-sm:w-32 max-sm:py-0"
                      endContent={<DirectionsIcon size={22} />}
                    >
                      الإتجاهات
                    </Button>
                  </div>
                  <Tabs
                    className="w-full block mt-3 px-3"
                    aria-label="Tabs sizes"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                    fullWidth="true"
                    color="success"
                  >
                    <Tab
                      key="details"
                      title="تفاصيل"
                      className={`text-lg font-bold transition-colors  ${
                        selected === "details" ? "text-green-900" : ""
                      } max-sm:text-sm`}
                    >
                      <ServicesGrid
                        services={placeData.services}
                      ></ServicesGrid>
                    </Tab>

                    <Tab
                      key="ratings"
                      title="التقييمات"
                      className="text-lg font-bold max-sm:text-sm"
                    >
                      <div className="w-full flex justify-around items-center mt-5">
                        <div className="flex flex-col justify-center items-center gap-3">
                          <h1 className="font-normal text-center">
                            تقييم معين
                          </h1>
                          <CircularProgress
                            classNames={{
                              svg: "w-28 h-28 drop-shadow-md max-sm:w-24 max-sm:h-24",
                              indicator: "stroke-primary",
                              track: "stroke-gray-300",
                              value:
                                "text-2xl font-semibold black max-sm:text-xl",
                            }}
                            strokeWidth={90}
                            showValueLabel={true}
                            valueLabel="5 / 4.0"
                            value={90}
                          />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-3">
                          <h1 className="font-normal text-center">
                            تقييمات الزوار
                          </h1>
                          <CircularProgress
                            classNames={{
                              svg: "w-28 h-28 drop-shadow-md max-sm:w-24 max-sm:h-24",
                              indicator: "stroke-primary",
                              track: "stroke-gray-300",
                              value:
                                "text-2xl font-semibold black max-sm:text-xl",
                            }}
                            strokeWidth={90}
                            showValueLabel={true}
                            valueLabel="5 / 4.5"
                            value={90}
                          />
                        </div>
                      </div>
                      <Divider className="mt-5" />
                      <div className="flex justify-between items-center mt-5 px-2">
                        <h1 className="font-bold text-xl max-sm:text-lg text-right">
                          التقييمات و الاراء
                        </h1>
                        <Button
                          className="text-md font-semibold max-sm:text-lg"
                          color="primary"
                          onClick={() => handelOpenModal()}
                        >
                          كتابة تقييم
                        </Button>
                      </div>
                      <Divider className="mt-5" />
                      <div className="flex flex-col justify-center items-center mt-5 p-2">
                        <RatingRow
                          name={"معن"}
                          body={
                            "المنتزه رائع وجميل مناسب جدا للعوائل ومجهز بكامل احتياجات ذوي الإعاقة مشكلته الوحيدة بعد دورات المياه عن المنتزه"
                          }
                        ></RatingRow>
                        <RatingRow
                          name={"أمواج"}
                          body={
                            "المنتزه جيد و مناسب لذوي الإعاقة و تتوفر به اهم الخدمات"
                          }
                        ></RatingRow>
                      </div>
                    </Tab>
                  </Tabs>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </Modal>
      <RatingModal
        handelOpenModal={handelOpenModal}
        isModalOpen={isModalOpen}
        placeId={placeData.id}
      ></RatingModal>
    </>
  );
}

export default EasyLayoutModal;
