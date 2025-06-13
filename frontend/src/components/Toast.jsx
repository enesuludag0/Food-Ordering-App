import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const toastSuccess = (message, link, linkText, navigate) => {
  const toastId = toast.success(
    <div className="flex flex-col font-bold">
      <span className="text-tertiary text-lg">{message}</span>
      <span
        className="text-base cursor-pointer"
        style={{ color: "#53a75a" }}
        onClick={() => {
          toast.dismiss(toastId);
          navigate(link);
          setTimeout(() => window.scrollTo(0, 0), 0);
        }}
      >
        {linkText}
      </span>
    </div>,
    {
      position: "bottom-right",
      hideProgressBar: true,
      pauseOnHover: true,
      style: {
        backgroundColor: "#EBF9EC"
      }
    }
  );
};
