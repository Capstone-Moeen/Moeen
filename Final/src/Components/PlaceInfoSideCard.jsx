import React from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { DirectionsIcon } from "../Assets/Icons/DirectionsIcon";
import { Tabs, Tab } from "@nextui-org/react";
import ServicesGrid from "./ServicesGrid";
function PlaceInfoSideCard({ isOpen }) {
  const [selected, setSelected] = React.useState("details");

  return (
    <Card
      className={`${
        isOpen ? "translate-x-0" : "translate-x-[110%]"
      }    py-2 bg-[#FAFAFB] shadow-2xl absolute right-5 w-[32rem] flex flex-col justify-center items-center h-[83%] top-5 max-sm:right-2 `}
    >
      <CardHeader className="pb-0 pt-1 px-2 flex-col ">
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
            <h1 className="text-2xl  text-right text-gray-400 mt-2 ">4.5 Km</h1>
          </div>
          <Button
            className="bg-[#005B41] text-white text-small font-bold w-64"
            endContent={<DirectionsIcon size={52} />}
            size="lg"
          >
            توجيهات الوصول
          </Button>
        </div>

        <Tabs
          className="w-full block mt-5 "
          size="lg"
          aria-label="Tabs sizes"
          selectedKey={selected}
          onSelectionChange={setSelected}
          fullWidth="true"
        >
          <Tab
            key="details"
            title="تفاصيل"
            className={`text-lg font-bold  ${selected === "details" ? "" : ""}`}
          >
           <ServicesGrid></ServicesGrid>
          </Tab>
          <Tab key="ratings" title="التقييمات" className="text-lg font-bold" />
        </Tabs>
      </CardBody>
    </Card>
  );
}

export default PlaceInfoSideCard;
