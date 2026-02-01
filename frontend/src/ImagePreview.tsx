import { useMemo } from "react";
import { useParams } from "react-router";
import DownloadIcon from "./assets/download.svg";
import ShareIcon from "./assets/Link.svg";
import { API, ImagePreviewURL } from "./ImageUploader";
import axios from "axios";
import download from 'downloadjs'
const ImagePreview = () => {
  const { id } = useParams();

  const copyFileLink = () => {
    navigator.clipboard.writeText(ImagePreviewURL + id);
  };

  const link = useMemo(() => {
    return `${API}/uploads/${id}`;
  }, [id]);

  const downloadFile = () => {
    axios
      .get(`${API}/download/${id}`, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          console.log(
            "Download progress: " +
              Math.round(
                (progressEvent.loaded / (progressEvent.total ?? 1)) * 100
              ) +
              "%"
          );
        },
      })
      .then((res) => {
        const file = res.data as Blob
        download(file, id)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className=" flex justify-center items-center h-[calc(100vh-80px)] flex-col gap-4">
      <div className="relative dropzone w-150 h-100  rounded-2xl p-2 shadow-[0px_0px_42px_-2px_rgba(0,_0,_0,_0.1)] bg-main-3">
        <div className="w-full h-full border border-dashed border-main-1 rounded-xl p-2 flex flex-col justify-center items-center gap-6">
          <img src={link} alt="preview" />
        </div>
      </div>
      <div className="flex gap-2 items-center [&>button]:bg-blue-500 [&>button]:py-1 [&>button]:px-3 [&>button]:rounded-lg">
        <button
          onClick={() => {
            copyFileLink();
          }}
          className="flex gap-2 items-center"
        >
          <img src={ShareIcon} />
          <span>Share</span>
        </button>
        <button
          onClick={() => {
            downloadFile();
          }}
          className="flex gap-2 items-center"
        >
          <img src={DownloadIcon} />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
