"use client"
import React, { useState } from "react";

const DownloadImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "downloaded_image.jpg";

      // Simulate a click to trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      setDownloaded(true);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleDownload} disabled={!imageUrl}>
        Download Image
      </button>
      {downloaded && <p>Image downloaded successfully!</p>}
    </div>
  );
};

export default DownloadImage;
