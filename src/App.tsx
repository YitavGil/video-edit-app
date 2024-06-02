import React, { useState, useEffect } from "react";
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

  const handleFileUpload = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    // Assume all videos are 5 seconds for this example
    const newVideo = { name: file.name, url: fileURL, duration: 5 };
    setVideos([...videos, newVideo]);
    setPreviewUrl(fileURL); // Automatically set the preview URL to the newly uploaded video
  };

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
    let index = 0;
    const videoPlayer = document.createElement('video');
  
    const playNextVideo = () => {
      if (index < timelineVideos.length) {
        const video = timelineVideos[index];
        videoPlayer.src = video.url;
        videoPlayer.play();
        videoPlayer.onended = playNextVideo;
        index++;
      }
    };
  
    playNextVideo();
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
          onPlay={handlePlay} // Pass the handlePlay function to the Main component
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
