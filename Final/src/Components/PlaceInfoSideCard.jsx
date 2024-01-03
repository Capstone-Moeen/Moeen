import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  CircularProgress,
  Divider,
} from "@nextui-org/react";
import { DirectionsIcon } from "../Assets/Icons/DirectionsIcon";
import { Tabs, Tab } from "@nextui-org/react";
import ServicesGrid from "./ServicesGrid";
import "simplebar-react/dist/simplebar.min.css";
import RatingRow from "./RatingRow";
import RatingModal from "./RatingModal";
import { CloseIconWhite } from "../Assets/Icons/CloseIconWhite";
import calculateDistance from "../utils/CalculateDistance";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HeartIcon } from "../Assets/Icons/HeartIcon";
import { AuthContext } from "../Context/AuthContext";
import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
  collection,
  arrayRemove,
  getDocs,
} from "firebase/firestore";
import toastSuccess from "../utils/Toast";
import { db } from "../Config/firebase";
function PlaceInfoSideCard({
  isOpen,
  placeData,
  userLocation,
  handelMobileColse,
  renderMap,
}) {
  const [selected, setSelected] = React.useState("details");
  // Rating Modal State Controller
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [userLikes, setUserLikes] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [count, setCount] = useState(1);
  const [comments, setComments] = useState([]);

  // Rating Modal Handel
  const handelOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    getUserLikes();
    getComments()
  }, [count]);

 const getComments = async()=>{
   const querySnapshot = await getDocs(collection(db, "comments"));
   const comments = querySnapshot.docs.map((doc)=>({...doc.data(),id:doc.id}))
   const commetnsByPlace = comments.filter((comment)=>comment.placeId === placeData.id)
   setComments(commetnsByPlace)
 }

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
        renderMap();
        setCount(count + 1);
      });
    } else {
      try {
        await updateDoc(doc(db, "users", currentUser.uid), {
          favorites: arrayUnion(place.id),
        }).then(() => {
          renderMap();
          toastSuccess("تمت العملية بنجاح");
          setCount(count + 1);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Card
        className={`${
          isOpen ? "translate-x-0" : "translate-x-[110%]"
        }     bg-[#FAFAFB] shadow-2xl absolute  right-5 w-[22rem] flex flex-col justify-center items-center h-[85%] top-2 max-sm:right-2 overflow-hidden max-sm:w-[95%]`}
      >
        <Card
          className={`${
            isOpen ? "translate-x-0" : "translate-x-[110%]"
          }     bg-[#FAFAFB] shadow-2xl rounded  w-full flex flex-col justify-center items-center h-full relative overflow-y-visible  `}
        >
          <div className="w-full">
            <Carousel
              className="slider rounded-2xl "
              showThumbs={false}
              autoPlay
              dynamicHeight
              infiniteLoop={true}
              swipeable
              interva={2000}
              showArrows={false}
            >
              {placeData.Images.map((image, index) => {
                return (
                  <div key={index} className="">
                    <img
                      className="h-40 object-cover object-center "
                      src={image}
                    />
                  </div>
                );
              })}
            </Carousel>
            <Button
              onClick={handelMobileColse}
              className="fixed top-2 -left-5 hidden text-white z-50 rounded-[50%] w-8 h-8 bg-transparent max-sm:block "
            >
              <CloseIconWhite size={18} className="mr-2 " />
            </Button>
            <Button
              onClick={() => {
                addTofavorite(placeData);
              }}
              isIconOnly
              color="danger"
              className="absolute top-28 left-2 z-50"
              aria-label="Like"
            >
              <HeartIcon
                filled={userLikes.includes(placeData.id) ? true : false}
              />
            </Button>
          </div>

          <CardBody className=" py-2  ">
            <div className="w-full flex items-center">
              <div className="w-full flex flex-col mt-1">
                <h1 className="text-2xl font-bold text-right max-sm:text-xl">
                  {placeData.placeName}
                </h1>
                <span className="text-lg text-right text-gray-400 mt-2 max-sm:text-lg">
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
                onPress={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${placeData.placeLocation.lat},${placeData.placeLocation.lng}`,
                    "_blank"
                  )
                }
                className="bg-[#005B41]  text-white font-semibold w-52 text-md max-sm:text-sm max-sm:w-52 max-sm:py-0"
                endContent={<DirectionsIcon size={22} />}
              >
                الإتجاهات
              </Button>
            </div>

            <Tabs
              className="w-full block mt-3 "
              aria-label="Tabs sizes"
              selectedKey={selected}
              onSelectionChange={setSelected}
              fullWidth="true"
              color="success"
            >
              <Tab
                key="details"
                title="تفاصيل"
                className={`text-lg font-bold ${
                  selected === "details" ? "text-green-900" : ""
                } max-sm:text-sm`}
              >
                <ServicesGrid services={placeData.services}></ServicesGrid>
              </Tab>

              <Tab
                key="ratings"
                title="التقييمات"
                className="text-lg font-bold max-sm:text-sm"
              >
                <div className="w-full flex justify-around items-center mt-5">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="font-normal text-center">تقييم معين</h1>
                    <CircularProgress
                      classNames={{
                        svg: "w-28 h-28 drop-shadow-md max-sm:w-24 max-sm:h-24",
                        indicator: "stroke-primary",
                        track: "stroke-gray-300",
                        value: "text-2xl font-semibold black max-sm:text-xl",
                      }}
                      strokeWidth={90}
                      showValueLabel={true}
                      valueLabel={
                        placeData.RatingMoeen
                          ? `5 / ${placeData.RatingMoeen}`
                          : "5 / 0.0"
                      }
                      value={
                        Math.floor(placeData.RatingMoeen) === 0
                          ? 0
                          : Math.floor(placeData.RatingMoeen) === 1
                          ? 20
                          : Math.floor(placeData.RatingMoeen) === 2
                          ? 40
                          : Math.floor(placeData.RatingMoeen) == 3
                          ? 60
                          : Math.floor(placeData.RatingMoeen) == 4
                          ? 80
                          : 100
                      }
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="font-normal text-center">تقييمات الزوار</h1>
                    <CircularProgress
                      classNames={{
                        svg: "w-28 h-28 drop-shadow-md max-sm:w-24 max-sm:h-24",
                        indicator: "stroke-primary",
                        track: "stroke-gray-300",
                        value: "text-2xl font-semibold black max-sm:text-xl",
                      }}
                      strokeWidth={90}
                      showValueLabel={true}
                      valueLabel={
                        placeData.avgRating
                          ? `5 / ${placeData.avgRating.toFixed(1)}`
                          : "5 / 0.0"
                      }
                      value={
                        Math.floor(placeData.avgRating) === 0 || !placeData.avgRating
                          ? 0
                          : Math.floor(placeData.avgRating) === 1
                          ? 20
                          : Math.floor(placeData.avgRating) === 2
                          ? 40
                          : Math.floor(placeData.avgRating) == 3
                          ? 60
                          : Math.floor(placeData.avgRating) == 4
                          ? 80
                          : 100
                      }
                    />
                  </div>
                </div>
                <Divider className="mt-5" />
                <div className="flex justify-between items-center mt-5">
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
                <div className="flex flex-col justify-center items-center mt-5">
                 {
                  comments.map((comment,index)=>{
                    return <RatingRow key={index} author={comment.commentAuthor} rating={comment.rating} body={comment.comment}/>
                  })
                 }
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </Card>
      <RatingModal
        handelOpenModal={handelOpenModal}
        isModalOpen={isModalOpen}
        placeId={placeData.id}
      ></RatingModal>
    </>
  );
}

export default PlaceInfoSideCard;
