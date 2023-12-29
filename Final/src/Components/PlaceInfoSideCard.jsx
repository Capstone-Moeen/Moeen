import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
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
import { CloseIcon } from "../Assets/Icons/CloseIcon";
import { CloseIconWhite } from "../Assets/Icons/CloseIconWhite";

function PlaceInfoSideCard({ isOpen }) {
  const [selected, setSelected] = React.useState("details");
  //Rating Modal State Controller
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Rating Modal Handel
  const handelOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Card
        className={`${
          isOpen ? "translate-x-0" : "translate-x-[110%]"
        }     bg-[#FAFAFB] shadow-2xl absolute  right-5 w-[22rem] flex flex-col justify-center items-center h-[85%] top-5 max-sm:right-2 overflow-hidden max-sm:w-[95%]`}
      >
        <Card
          className={`${
            isOpen ? "translate-x-0" : "translate-x-[110%]"
          }     bg-[#FAFAFB] shadow-2xl rounded  w-full flex flex-col justify-center items-center h-full relative  overflow-y-auto`}
        >
          <div className="w-full">
            <Image
              width="100%"
              className={`object-fit ${
                selected === "details" ? "" : "pt-[24rem]"
              }  rounded-none`}
              src="https://lh3.googleusercontent.com/p/AF1QipMYTWtnsrHICvloeWZUvdGLXVKQ5KUQMvpy7CL6=s0"
            />
            <button className="fixed top-2 left-2 hidden text-white z-50 rounded-[50%] w-8 h-8 bg-[rgba(0,0,0,0.6)] max-sm:block ">
              <CloseIconWhite size={18} className="mr-2 " />
            </button>
          </div>
          <CardBody className="overflow-visible py-2  ">
            <div className="w-full flex items-center">
              <div className="w-full flex flex-col mt-5">
                <h1 className="text-2xl font-bold text-right max-sm:text-xl">
                  أسم المكان
                </h1>
                <span className="text-xl text-right text-gray-400 mt-2 max-sm:text-lg">
                  4.2 كم
                </span>
              </div>
              <Button
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
                <ServicesGrid></ServicesGrid>
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
                      valueLabel="5 / 4.0"
                      value={90}
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
                      valueLabel="5 / 4.5"
                      value={90}
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
          </CardBody>
        </Card>
      </Card>
      <RatingModal
        handelOpenModal={handelOpenModal}
        isModalOpen={isModalOpen}
      ></RatingModal>
    </>
  );
}

export default PlaceInfoSideCard;
