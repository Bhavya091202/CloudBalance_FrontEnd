import { toast } from "react-toastify";

export const copyToClipboard = (text, label = "Copied!") => {
  navigator.clipboard.writeText(text);
  toast.success(label);
};
