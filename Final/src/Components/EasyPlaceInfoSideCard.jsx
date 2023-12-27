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


function EasyPlaceInfoSideCard() {


  const [selected, setSelected] = React.useState("details");
  //Rating Modal State Controller
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  // Rating Modal Handel
  const handelOpenModal = ()=>{
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <Card
        className={`py-2 fixed bg-[#FAFAFB] shadow-2xl left-32 w-[32rem] flex flex-col justify-center items-center top-16 max-sm:right-2 overflow-y-visible `}
      >
        <CardHeader
          className={`pb-0  px-2 flex-col  ${
            selected === "details" ? "" : "pt-[1rem]"
          }`}
        >
          <Image
            width="100%"
            alt="NextUI hero Image with delay"
            className="object-fit"
            src="https://lh3.googleusercontent.com/p/AF1QipMYTWtnsrHICvloeWZUvdGLXVKQ5KUQMvpy7CL6=s0"
          />
        </CardHeader>

        <CardBody className="overflow-visible py-2  ">
          <div className="w-full flex items-center">
            <div className="w-full flex flex-col mt-5">
              <h1 className="text-3xl font-bold text-right">أسم المكان</h1>
              <span className="text-2xl text-right text-gray-400 mt-2">
                4.2 كم
              </span>
            </div>
            <Button
              className="bg-[#005B41] text-white font-semibold w-72 text-xl"
              endContent={<DirectionsIcon size={52} />}
              size="lg"
            >
              الإتجاهات
            </Button>
          </div>

          <Tabs
            className="w-full block mt-3 "
            size="lg"
            aria-label="Tabs sizes"
            selectedKey={selected}
            onSelectionChange={setSelected}
            fullWidth="true"
            color="success"
          >
            <Tab
              key="details"
              title="تفاصيل"
              className={`text-xl font-bold ${
                selected === "details" ? "text-green-900" : ""
              }`}
            >
              <ServicesGrid></ServicesGrid>
            </Tab>

            <Tab key="ratings" title="التقييمات" className="text-xl font-bold">
              <div className="w-full flex justify-around items-center mt-5">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="font-normal text-center">تقييم (غيرمعروف)</h1>
                  <CircularProgress
                    classNames={{
                      svg: "w-36 h-36 drop-shadow-md",
                      indicator: "stroke-primary",
                      track: "stroke-gray-300",
                      value: "text-3xl font-semibold black",
                    }}
                    strokeWidth={90}
                    showValueLabel={true}
                    value={90}
                    formatValue={(value) => `${value.toFixed(1)} / 5`}
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="font-normal text-center">تقييمات الزوار</h1>
                  <CircularProgress
                    classNames={{
                      svg: "w-36 h-36 drop-shadow-md",
                      indicator: "stroke-primary",
                      track: "stroke-gray-300",
                      value: "text-3xl font-semibold black",
                    }}
                    strokeWidth={90}
                    showValueLabel={true}
                    value={70}
                    formatValue={(value) => `${value.toFixed(1)} / 5`}
                  />
                </div>
              </div>
              <Divider className="mt-5" />
              <div className="flex justify-between items-center mt-5">
                <h1 className="font-bold text-2xl">التقييمات و الاراء </h1>
                <Button
                  className="text-xl font-semibold"
                  color="primary"
                  size="lg"
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

      <RatingModal handelOpenModal={handelOpenModal} isModalOpen={isModalOpen}></RatingModal>
    </>
  );
}

export default EasyPlaceInfoSideCard;
