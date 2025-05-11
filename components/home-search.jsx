"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Camera, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const HomeSearchComponent = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [imageSearchActive, setImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const handleSearchSubmit = () => {};
  const handleAiImageSearch = () => {};

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setIsImageUploading(true);
      setSearchImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsImageUploading(false);
        toast.success("Image uploaded successfully");
      };

      reader.onerror = () => {
        setIsImageUploading(false);
        toast.error("Failed to upload the image");
      };

      reader.readAsDataURL(file);
    }
  };
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 1,
    });

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <div className="relative flex items-center ">
          <Input
            type="text"
            placeholder="Enter make,model or use Ai image search by clicking the camera icon on the right..."
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
            className="pl-10 pr-12 py-6 w-full rounded-full border-gray-300 bg-white/95 backdrop-blur-sm"
          />
          <div className="absolute right-[100px]">
            <Camera
              size={35}
              onClick={() => setImageSearchActive(!imageSearchActive)}
              className="cursor-pointer rounded-xl p-1.5"
              style={{
                background: imageSearchActive ? "black" : "",
                color: imageSearchActive ? "white" : "",
              }}
            />
          </div>
          <Button type="submit" className="absolute right-2 rounded-full">
            Search
          </Button>
        </div>
      </form>
      {imageSearchActive && (
        <div className="mt-4">
          <form onSubmit={handleAiImageSearch}>
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center">
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={imagePreview}
                    alt="Car image"
                    className="h-40 object-contain mb-4"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchImage(null);
                      setImagePreview("");
                      toast.info("Image removed");
                    }}
                    className="hover:bg-red-500"
                  >
                    Remove image
                  </Button>
                </div>
              ) : (
                <div {...getRootProps()} className="cursor-pointer">
                  <input {...getInputProps()} />
                  {/* {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )} */}
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />

                    <p className="text-white mb-2">
                      {isDragActive && !isDragReject
                        ? "Leave the file here to upload"
                        : "Drag & drop a car image or click to here select"}
                    </p>
                    {isDragReject && (
                      <p className="text-red-500 mb-2">Invalid image type</p>
                    )}
                    <p className="text-gray-400">
                      Supports:JPG,JPEG,PNG (max 5MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomeSearchComponent;
