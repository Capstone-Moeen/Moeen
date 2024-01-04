import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Rating } from "@mui/material";
import {  doc,  updateDoc } from "firebase/firestore";
import { db } from '../Config/firebase';

function RatingMoeenPopUp({ isOpen, openModal }) {
  const handelOpenModal = () => {
    openModal(!isOpen);
  };

  const [ratingMoeen, setRatingMoeen] = useState(null);

  const handelUpdatePlaceRating = async () => {
    try {
      const placeDocRef = doc(db, 'AcceptedPlaces', id);
      await updateDoc(placeDocRef, {
        ...ratingMoeen,
      });
      handelOpenModal(); // Close the modal after updating
    } catch (error) {
      console.error("Error updating document: ", error);
    }
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
               
                  <Rating
                    size="large"
                    value={4} 
                  />
               
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  size="lg"
                  variant="flat"
                  className="text-white bg-[#005B41] text-lg max-sm:text-base"
                  onClick={handelUpdatePlaceRating} // Update the rating on button click
                >
                  ارسال
                </Button>
                <Button
                  size="lg"
                  variant="flat"
                  color="danger"
                  className="text-red-500 text-lg max-sm:text-base"
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
