import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Rating } from "@mui/material";
import { db } from "../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import toastSuccess from "../utils/Toast";
import { AuthContext } from "../Context/AuthContext";

function RatingModal({ isModalOpen, handelOpenModal, placeId }) {
  const [comment, setComment] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const { currentUser } = useContext(AuthContext);
  const handelInput = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handelSubmit = async () => {
    if (!comment.comment || !comment.rating) {
      setError({
        comment: "يجب كتابة تعليق و تقييم",
        rating: "يجب كتابة تقييم",
      });
    } else {
      setIsLoading(true);
      await addDoc(collection(db, "comments"), {
        comment: comment.comment,
        rating: comment.rating,
        commentAuthor: currentUser.uid,
        placeId: placeId,
      }).then(() => {
        setIsLoading(false);
        handelOpenModal();
        toastSuccess("تم الارسال بنجاح");
        setComment({});
        setError({});
      });
    }
  };
  return (
    <>
     
      <Modal isOpen={isModalOpen} placement="auto" hideCloseButton={`true`}>
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
                  name="comment"
                  onChange={handelInput}
                ></textarea>
                <span className="text-red-500 text-sm">{error.comment}</span>
                <Rating
                  dir="ltr"
                  size="large"
                  defaultValue={1}
                  name="rating"
                  onChange={handelInput}
                ></Rating>
                <span className="text-red-500 text-sm">{error.rating}</span>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  size="lg"
                  variant="flat"
                  className=" text-white bg-[#005B41]
                  text-xl max-sm:text-base "
                  disabled={isLoading}
                  onClick={() => {
                    handelSubmit();
                  }}
                >
                  ارسال
                </Button>
                <Button
                  size="lg"
                  variant="flat"
                  color="danger"
                  className="text-red-500 
                  text-xl max-sm:text-base "
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

export default RatingModal;
