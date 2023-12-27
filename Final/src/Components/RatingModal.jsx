import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import { Rating } from "@mui/material";

function RatingModal({ isModalOpen, handelOpenModal }) {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        placement="auto"
        size="xl"
        hideCloseButton={`true`}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-black text-3xl">
                كتابة تقييم
              </ModalHeader>
              <ModalBody className="flex justify-center items-center w-full">
                <textarea
                  className="textarea textarea-bordered bg-gray-100 text-xl w-full text-black"
                  placeholder="اكتب هنا ..."
                  rows={4}
                ></textarea>

                <Rating dir="ltr" size="large" defaultValue={1}></Rating>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  size="lg"
                  className=" text-2xl text-red-500 bg-gray-200"
                  onClick={handelOpenModal}
                >
                  إلغاء
                </Button>
                <Button
                  size="lg"
                  className=" text-2xl"
                  color="primary"
                  onClick={handelOpenModal}
                >
                  ارسال
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default RatingModal;
