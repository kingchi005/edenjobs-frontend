"use client";
// import { Avatar } from "@/components";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { Avatar } from "./avatar";
import { CameraIcon } from "lucide-react";

export default function ImageUploader({ images, setImages }) {
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper relative mt-2 flex h-[4rem] w-[4rem] items-center justify-center shadow-sm ">
            {imageList.length < 1 && (
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                type="button"
                {...dragProps}
                className="flex h-[4rem] w-[4rem] items-center justify-center"
              >
                <CameraIcon className="h-6 w-6 text-primary" />
              </button>
            )}
            &nbsp;
            {imageList.map((image, index) => (
              <div
                key={index}
                className="image-item absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
              >
                <Avatar imageUrl={image.dataURL} alt="" size="medium" />

                <button
                  onClick={() => onImageUpdate(index)}
                  type="button"
                  className="text-light absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-primary"
                >
                  <CameraIcon className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
