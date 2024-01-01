import React from "react";
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
import "react-responsive-carousel/lib/styles/carousel.min.css";

function EasyLayoutModal({ isOpen, onOpenChange }) {
  const [selected, setSelected] = React.useState("details");

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        scrollBehavior="inside"
        className="overflow-hidden relative"
        closeButton={<DirectionsIcon></DirectionsIcon>}
      >
        <Modal
          className="overflow-y-auto overflow-x-hidden "
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="blur"
          closeButton={<DirectionsIcon></DirectionsIcon>}
        >
          <ModalContent className="h-[90%] ">
            {(onClose) => (
              <>
                <Button
                  className="absolute top-1 -left-3 p-0 w-1  rounded-full  text-white  bg-transparent z-50"
                  onPress={onClose}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g id="Edit / Close_Circle">
                        {" "}
                        <path
                          id="Vector"
                          d="M9 9L11.9999 11.9999M11.9999 11.9999L14.9999 14.9999M11.9999 11.9999L9 14.9999M11.9999 11.9999L14.9999 9M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                          stroke="#ffffff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </Button>
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
                    <div className="">
                      <img
                        className="h-52 object-cover object-center "
                        src="https://lh3.googleusercontent.com/p/AF1QipMcPwzVhV5G5eXkXuAZhXGnGWxAbmBHAqq5cKFU=s0"
                      />
                    </div>
                    <div className="">
                      <img
                        className="h-52 object-cover object-center "
                        src="https://lh3.googleusercontent.com/p/AF1QipMcPwzVhV5G5eXkXuAZhXGnGWxAbmBHAqq5cKFU=s0"
                      />
                    </div>
                    <div className="">
                      <img
                        className="h-52 object-cover object-center "
                        src="https://lh3.googleusercontent.com/p/AF1QipMcPwzVhV5G5eXkXuAZhXGnGWxAbmBHAqq5cKFU=s0"
                      />
                    </div>
                  </Carousel>
                  <div className="flex justify-between px-3 items-center">
                    <div className="flex flex-col">
                  <h1 className="text-right font-bold text-xl  mt-2">
                    سنتريا مول
                  </h1>
                  <span className="text-[#70757a]">4.5 كم </span>
                  </div>
                  <Button
                className="bg-[#005B41]  text-white font-semibold w-32  text-md max-sm:text-sm max-sm:w-52 max-sm:py-0"
                endContent={<DirectionsIcon size={22} />}
              >
                الإتجاهات
              </Button>
                  </div>
                  <Tabs
                    className="w-full block mt-3 px-5"
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
                      {/* <ServicesGrid></ServicesGrid> */}
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
    </>
  );
}

export default EasyLayoutModal;
