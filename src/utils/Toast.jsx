import { ToastContainer, toast } from "react-toastify";

export default function toastSuccess({ msg }) {
  toast.success(msg, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
