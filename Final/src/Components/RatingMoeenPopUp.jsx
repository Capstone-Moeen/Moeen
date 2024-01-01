import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Rating } from "@mui/material";

function RatingMoeenPopUp({ isOpen, openModal }) {
  const handelOpenModal = () => {
    openModal(!isOpen);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="auto"
        size="xl"
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-black text-2xl">
                تقييم معين
              </ModalHeader>
              <ModalBody>
                <Rating  size="large" className="flex justify-center items-center m-5" defaultValue={0}></Rating>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  size="lg"
                  variant="flat"
                  className=" text-white bg-[#005B41]
                  text-lg max-sm:text-base "
                  onClick={handelOpenModal}
                >
                  ارسال
                </Button>
                <Button
                  size="lg"
                  variant="flat"
                  color='danger'
                  className="text-red-500 
                  text-lg max-sm:text-base "
                  onClick={handelOpenModal}
                >
                  إلغاء
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default RatingMoeenPopUp;
