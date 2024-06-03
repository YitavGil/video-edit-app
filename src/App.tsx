import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { VideoUpload } from "./components";
import Main from "./sections/Main";
import Timeline from "./components/timeline/Timeline";

interface VideoFile {
  name: string;
  url: string;
  duration: number;
}

const App: React.FC = () => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [timelineVideos, setTimelineVideos] = useState<VideoFile[]>([]);
  const [playing, setPlaying] = useState<boolean>(false); // Add playing state

  const handleFileUpload = async (file: File) => {
    const fileURL = URL.createObjectURL(file);
    const duration = await getVideoDuration(file);

    const newVideo = { name: file.name, url: fileURL, duration };
    setVideos([...videos, newVideo]);
    setPreviewUrls([fileURL]);
  };

  async function getVideoDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(Math.round(video.duration));
      };
      video.onerror = (error) => {
        reject(error);
      };
      video.src = URL.createObjectURL(file);
    });
  }

  const handlePreview = (url: string) => {
    setPreviewUrls([url]);
  };

  const handleDrop = (video: VideoFile) => {
    setTimelineVideos((prevTimelineVideos) => {
      let totalDuration = 0;
      prevTimelineVideos.forEach((v) => (totalDuration += v.duration));
      const startTime = totalDuration;

      const newVideo = { ...video, startTime };
      return [...prevTimelineVideos, newVideo];
    });
  };

  const handleRemove = (index: number) => {
    const updatedTimelineVideos = timelineVideos.filter(
      (_, idx) => idx !== index
    );
    setTimelineVideos(updatedTimelineVideos);
    setPlaying(false); // Stop playing when a video is removed
  };

  const handlePlay = () => {
    const videoArray = timelineVideos.map((video) => video.url);
    setPreviewUrls(videoArray);
    setPlaying(true); // Start playing when the Play button is pressed
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <VideoUpload onUpload={handleFileUpload} />
        <Main
          videos={videos}
          previewUrls={previewUrls}
          onPreview={handlePreview}
          onDrop={handleDrop}
          onPlay={handlePlay}
          playing={playing} // Pass playing state to Main
        />
        <Timeline
          videos={timelineVideos}
          onDrop={handleDrop}
          onRemove={handleRemove}
        />
      </div>
    </DndProvider>
  );
};

export default App;
