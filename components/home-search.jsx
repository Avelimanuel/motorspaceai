"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Camera, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const HomeSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageSearchActive, setImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const router = useRouter();
  const handleTextSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter search term first");
      return;
    }
    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`)
  };
  const handleAiImageSearch = async (e) => {
    e.preventDefault();
    if (!searchImage) {
      toast.error("Please upload an image first");
      return;
    }
  };

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
      <form onSubmit={handleTextSearchSubmit}>
        <div className="flex flex-col sm:flex-row items-center gap-3 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto w-full">
          {/* Input field */}
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Make, model or tap camera icon to use AI search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-12 py-4 sm:py-5 md:py-6 w-full rounded-full border border-gray-300 bg-white/95 backdrop-blur-sm text-sm sm:text-base md:text-lg placeholder:text-gray-400"
            />

            {/* Camera icon inside input on the left */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Camera
                size={22}
                onClick={() => setImageSearchActive(!imageSearchActive)}
                className="cursor-pointer rounded-full p-1 bg-gray-100 hover:bg-black hover:text-white transition"
                style={{
                  background: imageSearchActive ? "black" : "",
                  color: imageSearchActive ? "white" : "",
                }}
              />
            </div>
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="w-full sm:w-auto rounded-full px-6 py-3"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Image Upload Area */}
      {imageSearchActive && (
        <div className="mt-4 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
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
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-white mb-2">
                      {isDragActive && !isDragReject
                        ? "Leave the file here to upload"
                        : "Drag & drop a car image or click to select"}
                    </p>
                    {isDragReject && (
                      <p className="text-red-500 mb-2">Invalid image type</p>
                    )}
                    <p className="text-gray-400">
                      Supports: JPG, JPEG, PNG (max 5MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
            {imagePreview && (
              <Button
                type="submit"
                className="w-full mt-3"
                disabled={isImageUploading}
              >
                {isImageUploading ? "Uploading..." : "Search with this image"}
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default HomeSearchComponent;
