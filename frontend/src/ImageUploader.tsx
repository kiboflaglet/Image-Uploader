import axios from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import UploadImage from "./assets/exit.svg";
import ShareIcon from "./assets/Link.svg";
import { cn } from "./utils/cn";
const MAX_SIZE = 2 * 1024 * 1024;
export const API = "http://localhost:3000/api";
export const ImagePreviewURL = 'http://localhost:5173/'

type FileType = {
  id: string;
  file: File;
  status: "uploaded" | "failed" | "loading";
  link?: string;
};
const ImageUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);

  const copyFileLink = (link: string) => {
    navigator.clipboard.writeText(link)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const files: FileType[] = acceptedFiles.map((item) => ({
      id: uuidv4(),
      file: item,
      status: "loading",
    }));
    setUploadedFiles((item) => [...item, ...files]);

    uploadFiles(files);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: MAX_SIZE,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
      "image/gif": [],
    },
  });

  const uploadFiles = (files: FileType[]) => {
    const promises = files.map((item) => {
      const formData = new FormData();
      formData.append("data", item.file);
      formData.append("id", item.id);
      formData.append("status", item.status);
      return axios
        .post(`${API}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          setUploadedFiles((prev) => {
            if (!res.data) return prev;

            return prev.map((item) =>
              item.id === res.data.id
                ? { ...item, status: res.data.status, link: ImagePreviewURL + res.data.link }
                : item
            );
          });
        })
        .catch(() => {
          setUploadedFiles((prev) => {
            return prev.map((file) =>
              file.id === item.id ? { ...file, status: "failed" } : file
            );
          });
        });
    });

    Promise.allSettled(promises).then((result) => console.log(result));
  };

  return (
    <div className=" flex justify-center items-center h-[calc(100vh-80px)] ">
      <div
        {...getRootProps({
          className:
            "relative dropzone w-90  sm:w-150  h-100  rounded-2xl p-2 shadow-[0px_0px_42px_-2px_rgba(0,_0,_0,_0.1)] bg-main-3",
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full border border-dashed border-main-1 rounded-xl p-2 flex flex-col justify-center items-center gap-6">
          <label htmlFor="file-input">
            <img src={UploadImage} />
          </label>
          <input
            id="file-input"
            hidden
            multiple
            type="file"
            {...getInputProps({ className: "dropzone display-none" })}
          />

          {/* {!isDragActive ? "Drop files here" : "Drag n Drop is active"} */}
          <div className="flex flex-col gap-2">
            <span className="font-bold">
              Drag & drop a file or{" "}
              <span className="text-blue-400">browse files</span>
            </span>
            <span>JPG, PNG or GIF - Max file size 2MB</span>
          </div>
          <div className="bottom-2 w-full h-1/3 absolute px-3 overflow-x-auto flex gap-4 [&>div]:rounded-3xl [&>div]:flex-shrink-0 fade-x-mask">
            {uploadedFiles.map((item) => (
              <div
                key={item.id}
                className=" h-full w-33 flex justify-center items-center  relative"
              >
                <img
                  src={URL.createObjectURL(item.file)}
                  className={cn(
                    item.status === "loading" && "blur-xs",
                    item.status === "failed" && "blur-xs"
                  )}
                />
                {item.status === "uploaded" && (
                  <div className="flex gap-2 absolute [&>img]:border [&>img]:rounded-xl [&>img]:p-2 [&>img]:bg-main-2 right-0 top-0 [&>img]:w-9 [&>img]:cursor-pointer">
                    <img 
                    onClick={() => {copyFileLink(item.link ?? "")}}
                    src={ShareIcon} />
                  </div>
                )}
                <div className="absolute text-shadow-xl">
                  {item.status === "loading" && "Loading"}

                  {item.status === "failed" && (
                    <span className="text-red-500 text-shadow-xl">Failed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
