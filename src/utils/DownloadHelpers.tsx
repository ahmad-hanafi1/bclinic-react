/* eslint-disable react-refresh/only-export-components */
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

interface DownloadFileProps {
  base64: string;
  fileName: string;
}

const DownloadFile: React.FC<DownloadFileProps> = ({ base64, fileName }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${base64}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <LoadingButton
      variant="contained"
      sx={{ color: "white" }}
      onClick={handleDownload}
    >
      Download
    </LoadingButton>
  );
};

export default DownloadFile;

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      // .split(",")[1] // Split to remove the data URL part
      // .replace(/=+$/, ""); // Remove the padding characters

      // Format the base64 string in chunks of 64 characters
      const chunkedString = base64String.match(/.{1,64}/g)?.join("\n") || "";
      resolve(chunkedString);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

export function fileToBase64withoutPadding(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(",")[1]; // Split to remove the data URL part
      // Remove the padding characters

      // Format the base64 string in chunks of 64 characters
      const chunkedString = base64String.match(/.{1,64}/g)?.join("\n") || "";
      resolve(chunkedString);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}
