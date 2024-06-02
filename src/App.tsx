import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { VideoUpload } from "./components";
import Main from "./sections/Main";
import Timeline from "./components/timeline/Timeline";

interface VideoFile {
  name: string;
  url: string;
  duration: number; // in seconds
}

const App: React.FC = () => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [timelineVideos, setTimelineVideos] = useState<VideoFile[]>([]);

  const handleFileUpload = async (file: File) => {
    const fileURL = URL.createObjectURL(file);
    const duration = await getVideoDuration(file); // Get the actual duration of the video
    
    const newVideo = { name: file.name, url: fileURL, duration };
    setVideos([...videos, newVideo]);
    setPreviewUrl(fileURL); // Automatically set the preview URL to the newly uploaded video
  };
  
  async function getVideoDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src); // Clean up
        resolve(Math.round(video.duration)); // Convert duration to seconds and round off
      };
      video.onerror = (error) => {
        reject(error);
      };
      video.src = URL.createObjectURL(file);
    });
  }

  const handlePreview = (url: string) => {
    setPreviewUrl(url); // Update the preview URL when a video from the list is selected
  };

  const handleDrop = (video: VideoFile) => {
    setTimelineVideos(prevTimelineVideos => {
      // Calculate the start time of the new video
      let totalDuration = 0;
      prevTimelineVideos.forEach(v => (totalDuration += v.duration));
      const startTime = totalDuration;
  
      // Add the new video to the timeline with its start time
      const newVideo = { ...video, startTime };
      return [...prevTimelineVideos, newVideo];
    });
  };

  const handleRemove = (videoName: string, index: number) => {
    const updatedTimelineVideos = timelineVideos.filter(
      (_, idx) => idx !== index
    );
    setTimelineVideos(updatedTimelineVideos);
  };

  const handlePlay = () => {
    // Call play function for each video in the timelineVideos array
    timelineVideos.forEach(video => playVideo(video.url));
  };

  const playVideo = (videoUrl: string) => {
    setPreviewUrl(videoUrl);
  };

  

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <VideoUpload onUpload={handleFileUpload} />
        <Main
          videos={videos}
          previewUrl={previewUrl}
          onPreview={handlePreview}
          onDrop={handleDrop}
          onPlay={handlePlay}
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
