import "./App.css";
import React, { useState } from "react";
import { VideoUpload } from "./components";
import Main from "./sections/Main";

interface VideoFile {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    const newVideo = { name: file.name, url: fileURL };
    setVideos([...videos, newVideo]);
    setPreviewUrl(fileURL);  // Set the preview URL to the newly uploaded video
  };

  return (
    <div>
      <VideoUpload onUpload={handleFileUpload} />
      <Main videos={videos} previewUrl={previewUrl} />
    </div>
  );
};

export default App;
