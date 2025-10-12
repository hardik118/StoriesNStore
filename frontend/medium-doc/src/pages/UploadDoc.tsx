import { Button } from "../components/button";
import { InputAndLabel } from "../components/labelAndInput";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { GlobalNavbar } from "../components/NavBarGlobal";
import axios from "axios";
import { Msgbox } from "../components/Msgbox";
import { BACK_END_URL } from "../../congif";

export const UploadDoc = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const descRef = useRef<HTMLDivElement>(null);

  // Handle dropped files
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Auto hide message after 3 sec
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  // Handle form submit
  const handleSubmit = async () => {
    const description = descRef.current?.innerText || "";

    if (!title || files.length === 0) {
      setMsg("Please provide a title and at least one file.");
      return;
    }

    try {
      const file = files[0];
      const formData = new FormData();

      formData.append("title", title);
      formData.append("metaInfo", description);
      formData.append("tags", tags);
      formData.append("file", file); // send raw file

      const res = await axios.post(`${BACK_END_URL}/api/v1/blog/store/UploadDocToStore`, formData, {
        headers: {
           "Content-Type": "multipart/form-data",
             Authorization : `Bearer ${localStorage.getItem('token')}`


         },
      });

      setMsg(res.data.msg || "Upload successful!");

         setTitle("");
    setTags("");
    setFiles([]);
    if (descRef.current) descRef.current.innerText = "";

    } catch (err: any) {
      console.error("Upload failed:", err);
      setMsg(err.response?.data?.msg || "Upload failed. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="border-b">
        <GlobalNavbar />
      </div>

      <div className="h-full flex items-center justify-center">
        <div className="h-5/6 w-9/12 flex flex-row gap-2">
          {/* LEFT SIDE - Dropzone */}
          <div className="h-full w-1/2 bg-gray-100 rounded-xl flex items-center justify-center p-1">
            <div className="h-full w-full bg-white rounded-xl flex items-center justify-center">
              <div
                {...getRootProps()}
                className={`border-dashed border-2 p-6 rounded-lg text-center h-1/2 w-1/2 ${
                  isDragActive ? "bg-blue-100" : "bg-gray-50"
                }`}
              >
                <input {...getInputProps()} />
                {files.length > 0 ? (
                  <p className="text-sm text-blue-600">
                    {files[0].name} uploaded
                  </p>
                ) : isDragActive ? (
                  <div className="bg-blue-100 h-full w-full rounded-lg flex items-center justify-center">
                    <p className="text-md w-full text-gray-400">
                      Drop the files here...
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-col">
                    <p className="text-md">
                      Drag & drop your files here, or click to select files
                    </p>
                    <img
                      className="w-24 h-32 opacity-20"
                      src="UpLoadFile.svg"
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div className="h-full w-1/2 bg-gray-100 rounded-xl border-2 border-gray-200 flex flex-col">
            <InputAndLabel
              placeholder="Enter The Title"
              heading="Title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />

            <div className="p-2">
              <h1 className="text-lg pb-2">Give Info Regarding The doc</h1>
              <div
                ref={descRef}
                contentEditable="true"
                className="w-full max-h-24 p-2 bg-white border-white min-h-20 overflow-y-auto scrollbar-hide border shadow-lg rounded-lg break-words"
              ></div>
            </div>

            <InputAndLabel
              heading="Enter Some Tags"
              placeholder="Enter tag with space"
              value={tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTags(e.target.value)
              }
            />

            <div className="h-full p-4 flex items-center justify-center">
              <Button heading="Upload" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>

      {/* Show messages */}
      {msg && <Msgbox msg={msg} />}
    </div>
  );
};
