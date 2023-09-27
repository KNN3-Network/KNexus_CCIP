import React, { useEffect, useRef, useState } from "react";

import { Image } from "@chakra-ui/react";
import { Upload } from "antd";
import api from "api";
import { SyncLoader } from "react-spinners";

const { Dragger } = Upload;

interface IImgPrompt {
  imgChange(idx: string): void;
  control_img: string;
}

export const ImgPromptUpload = (props: IImgPrompt) => {
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const { control_img, imgChange } = props;

  const uploadFile = (file: any) => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    api
      .post("/api/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(
        (res: any) => {
          setUploadLoading(false);
          if (res && res.url) {
            imgChange(res.url);
          }
        },
        (err: any) => {
          setUploadLoading(false);
          console.log(err);
        },
      );
  };

  return (
    <>
      {control_img ? (
        <div className="relative w-[fit-content] max-w-[200px]">
          <Image src={control_img} />
          <Image
            className="right-3 top-3 absolute h-8 w-8 cursor-pointer hover:opacity-70"
            onClick={() => imgChange("")}
            src="/images/common/delete-img.png"
          />
        </div>
      ) : (
        <>
          {uploadLoading ? (
            <div className="w-full h-[196px] flex items-center justify-center">
              <SyncLoader color="#000" size={10} />
            </div>
          ) : (
            <Dragger
              className="creat-upload"
              maxCount={1}
              fileList={[]}
              customRequest={(e: any) => uploadFile(e.file)}
              accept=".jpg, .jpeg, .png"
            >
              <div className="h-[160px] flex items-center justify-center">
                <div>
                  <div className="mx-[auto] w-[fit-content]">
                    <Image src="/images/common/upload.png" />
                  </div>
                  <div className="font-eurostile">
                    <span className="text-[#2B6CB0] font-[600]">
                      Click to upload
                    </span>
                    <span> or drag and drop</span>
                  </div>
                  <div className="mb-4 font-eurostile">PNG, JPG up to 2MB</div>
                </div>
              </div>
            </Dragger>
          )}
        </>
      )}
    </>
  );
};
