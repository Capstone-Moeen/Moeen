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
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { AuthContext } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

function RatingModal({
  isModalOpen,
  handelOpenModal,
  placeId,
  handelCommentPost,
  comments,
}) {
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
      })
        .then(async () => {
          await updateDoc(doc(db, "AcceptedPlaces", placeId), {
            avgRating: calcAvg(),
          }).then(() => {
            toast.success("تم الارسال بنجاح");
            setIsLoading(false);
            setTimeout(() => {
              handelOpenModal();
            }, 1500);
            setComment({});
            setError({});
            handelCommentPost();
          });
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("حدث خطأ");
          console.log(error);
        });
    }
  };
 

  const calcAvg = () => {
    if (!comments) {
      return 0;
    } else {
      let sum = 0;
      comments.forEach((comment) => {
        sum += parseInt(comment.rating);
      });
      return sum / comments.length;
    }
   
  };

  return (
    <>
      {isModalOpen ? <ToastContainer /> : null}

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
