// src/components/admin/VideosManager.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Video, ExternalLink, Play, X, Loader2 } from "lucide-react";
import { AdminForm } from "./AdminForm";
import { PortfolioVideo, CurrentFormState, FormDataType } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const VideosManager = () => {
  const [videos, setVideos] = useState<PortfolioVideo[]>([]);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentForm, setCurrentForm] = useState<CurrentFormState>({ 
    type: null, 
    data: { title: "", description: "", embedUrl: "" }, 
    isEditing: false 
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolio/videos`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setFetching(false);
    }
  };

  const openForm = (type: string, data: FormDataType = { title: "", description: "", embedUrl: "" }, isEditing = false) => {
    setCurrentForm({ type, data, isEditing });
  };

  const handleCancelForm = () => {
    setCurrentForm({ type: null, data: { title: "", description: "", embedUrl: "" }, isEditing: false });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { data, isEditing } = currentForm;

    // --- FIX 1: DATA CLEANUP ---
    // Create a clean payload. If POST, remove _id. If PUT, keep _id.
    const payload: any = {
      title: data.title,
      description: data.description,
      embedUrl: data.embedUrl,
    };

    const url = isEditing
      ? `${API_BASE_URL}/api/portfolio/videos/${data._id}`
      : `${API_BASE_URL}/api/portfolio/videos`;

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        if (isEditing) {
          setVideos(videos.map(v => v._id === result._id ? result : v));
        } else {
          setVideos([...videos, result]);
        }
        handleCancelForm();
        alert(isEditing ? "Video updated!" : "Video added!");
      } else {
        // --- FIX 2: BETTER ERROR LOGGING ---
        // result.message usually contains the validation error from the backend
        console.error("Backend Error:", result);
        alert(`Error: ${result.message || "Failed to save video. Please check required fields."}`);
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolio/videos/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setVideos(videos.filter(v => v._id !== id));
      } else {
        alert("Failed to delete video.");
      }
    } catch (error) {
      console.error("An error occurred while deleting:", error);
    }
  };

  // Helper to extract ID and show correct URLs
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const videoFields = [
    { name: 'title', label: 'Video Title', placeholder: 'Enter video title', required: true },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter video description', required: true },
    { name: 'embedUrl', label: 'YouTube URL', placeholder: 'Paste YouTube link here...', required: true },
  ];

  if (fetching) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-red-600" />
    </div>
  );

  return (
    <>
      {/* Modal Overlay */}
      {currentForm.type === 'portfolio/videos' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Video className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {currentForm.isEditing ? 'Edit Video' : 'Add New Video'}
                </h2>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCancelForm}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 overflow-y-auto">
              <AdminForm
                fields={videoFields}
                formData={currentForm.data}
                setFormData={(d) => setCurrentForm({ ...currentForm, data: d })}
                onFileChange={() => {}} 
                onSubmit={handleFormSubmit}
                onCancel={handleCancelForm}
                isEditing={currentForm.isEditing}
              />
              {submitting && (
                <div className="flex justify-center mt-4">
                  <Loader2 className="w-6 h-6 animate-spin text-red-600" />
                  <span className="ml-2 text-sm text-gray-500">Processing...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="bg-red-50/50 border-b border-red-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Video className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Manage Videos</CardTitle>
            </div>
            <Button
              onClick={() => openForm('portfolio/videos')}
              className="bg-red-600 hover:bg-red-700 text-white mt-4 sm:mt-0"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New Video
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mt-4">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Your Videos ({videos.length})</h3>

            {videos.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
                <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No videos found. Start by adding one.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map(video => (
                  <div key={video._id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group">
                    <div className="relative aspect-video bg-black">
                      {getYouTubeThumbnail(video.embedUrl) ? (
                        <img
                          src={getYouTubeThumbnail(video.embedUrl)!}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">No Preview</div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Play className="w-12 h-12 text-white fill-current" />
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 line-clamp-1 mb-1">{video.title}</h4>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{video.description}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <a 
                          href={video.embedUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-red-600 text-xs font-semibold flex items-center hover:underline"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" /> View Link
                        </a>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => openForm('portfolio/videos', video, true)}>Edit</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(video._id!)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};