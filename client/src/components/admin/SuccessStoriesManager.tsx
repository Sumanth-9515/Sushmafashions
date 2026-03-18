import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { 
  Trash2, Plus, Save, Loader2, Upload, ImageIcon, 
  UserCircle, BookOpen, Pencil, Scissors
} from "lucide-react";
import axios from "axios";
import Cropper from "react-easy-crop";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface Story {
  _id?: string;
  image: string;
  heading: string;
  paragraph: string;
}

const SuccessStoriesManager = () => {
  const [founderImage, setFounderImage] = useState("");
  const [stories, setStories] = useState<Story[]>([]);
  const [trainingImages, setTrainingImages] = useState<string[]>([]); 
  
  const [activeTab, setActiveTab] = useState<"founder" | "stories" | "gallery">("founder");
  const [fetching, setFetching] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | number | null>(null);
  const [savingFounder, setSavingFounder] = useState(false);
  const [savingStories, setSavingStories] = useState(false);

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [currentStory, setCurrentStory] = useState<Story>({ image: "", heading: "", paragraph: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/about`);
      setFounderImage(res.data.founderImage || "");
      setStories(res.data.successStories || []);
      setTrainingImages(res.data.trainingImages || []); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(`${API_URL}/api/about/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.url;
    } catch (error) {
      return null;
    }
  };

  const onGalleryFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingId("gallery_add");
    const uploadedUrls: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await handleImageUpload(files[i]);
        if (url) uploadedUrls.push(url);
      }
      if (uploadedUrls.length > 0) {
        const updatedGallery = [...trainingImages, ...uploadedUrls];
        setTrainingImages(updatedGallery);
        await axios.put(`${API_URL}/api/about`, { founderImage, successStories: stories, trainingImages: updatedGallery });
      }
    } catch (err) {
      alert("Failed to save gallery.");
    } finally {
      setUploadingId(null);
      e.target.value = "";
    }
  };

  const removeGalleryImage = async (index: number) => {
    if (!window.confirm("Are you sure you want to delete this image from the gallery?")) return;
    const updatedGallery = trainingImages.filter((_, i) => i !== index);
    setTrainingImages(updatedGallery);
    try {
      await axios.put(`${API_URL}/api/about`, { founderImage, successStories: stories, trainingImages: updatedGallery });
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const onFounderFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirmCrop = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;
    setUploadingId("founder");
    setIsCropModalOpen(false);
    try {
      const croppedFile = await getCroppedImg(imageToCrop, croppedAreaPixels);
      if (croppedFile) {
        const url = await handleImageUpload(croppedFile);
        if (url) setFounderImage(url);
      }
    } catch (e) {
      alert("Error cropping image");
    } finally {
      setUploadingId(null);
      setImageToCrop(null);
    }
  };

  const handleSaveFounder = async () => {
    setSavingFounder(true);
    try {
      await axios.put(`${API_URL}/api/about`, { founderImage, successStories: stories, trainingImages });
      alert("Founder Profile Saved!");
    } catch (error) {
      alert("Failed to save.");
    } finally {
      setSavingFounder(false);
    }
  };

  const handleStorySubmit = async () => {
    if (!currentStory.image || !currentStory.heading || !currentStory.paragraph) {
      alert("Fill all fields.");
      return;
    }
    let updatedStories = [...stories];
    if (editIndex !== null) updatedStories[editIndex] = currentStory;
    else updatedStories = [...updatedStories, currentStory];
    setSavingStories(true);
    try {
      await axios.put(`${API_URL}/api/about`, { founderImage, successStories: updatedStories, trainingImages });
      setStories(updatedStories);
      setIsStoryModalOpen(false);
      alert("Story saved!");
    } catch (error) {
      alert("Error saving story.");
    } finally {
      setSavingStories(false);
    }
  };

  const removeStory = async (index: number) => {
    if (window.confirm("Are you sure you want to delete this success story?")) {
      const newStories = stories.filter((_, i) => i !== index);
      setStories(newStories);
      try {
        await axios.put(`${API_URL}/api/about`, { founderImage, successStories: newStories, trainingImages });
      } catch (error) {
        fetchData();
      }
    }
  };

  if (fetching) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-500 w-10 h-10" /></div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6 overflow-x-hidden">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 px-1">About Page Management</h1>

      {/* TABS - Fix: Full width and scrollable wrapper */}
      <div className="w-full bg-gray-100 p-1 rounded-xl border overflow-x-auto">
        <div className="flex min-w-max md:min-w-0 md:w-full gap-1">
          <button 
            onClick={() => setActiveTab("founder")} 
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "founder" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
          >
            <UserCircle className="w-4 h-4" /> Founder Profile
          </button>
          <button 
            onClick={() => setActiveTab("stories")} 
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "stories" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
          >
            <BookOpen className="w-4 h-4" /> Success Stories
          </button>
          <button 
            onClick={() => setActiveTab("gallery")} 
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "gallery" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
          >
            <Scissors className="w-4 h-4" /> Philosophy Gallery
          </button>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="w-full">
        {activeTab === "founder" && (
          <Card className="border-none shadow-lg bg-white overflow-hidden w-full">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <CardContent className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative">
                  <div className="w-40 h-40 md:w-64 md:h-64 rounded-full border-4 border-gray-50 shadow-xl overflow-hidden bg-gray-100 flex items-center justify-center relative group">
                    {uploadingId === "founder" ? <Loader2 className="w-8 h-8 animate-spin text-blue-500" /> : founderImage ? <img src={founderImage} className="w-full h-full object-cover" /> : <UserCircle className="w-16 h-16 text-gray-300" />}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity" onClick={() => document.getElementById('f-up')?.click()}>
                      <Upload className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <input id="f-up" type="file" accept="image/*" className="hidden" onChange={onFounderFileChange} />
                  <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => document.getElementById('f-up')?.click()}>Change Photo</Button>
                </div>
                <div className="flex-1 text-center md:text-left space-y-4 w-full">
                  <h3 className="text-xl font-semibold">Founder Profile Image</h3>
                  <p className="text-gray-500 text-sm">Update the main photo used in the founder section.</p>
                  <Button onClick={handleSaveFounder} disabled={savingFounder} className="bg-blue-600 w-full md:w-auto">
                    {savingFounder ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2" />} Save Founder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "stories" && (
          <div className="space-y-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl shadow-sm border gap-4">
              <h3 className="font-semibold">Success Stories ({stories.length})</h3>
              <Button onClick={() => {setEditIndex(null); setCurrentStory({image:"", heading:"", paragraph:""}); setIsStoryModalOpen(true);}} variant="outline" className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" /> Add Story
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stories.map((story, index) => (
                <Card key={index} className="group relative overflow-hidden shadow-sm">
                  <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button onClick={() => {setEditIndex(index); setCurrentStory(story); setIsStoryModalOpen(true);}} variant="secondary" size="icon" className="h-8 w-8 rounded-full"><Pencil className="w-3 h-3" /></Button>
                      <Button onClick={() => removeStory(index)} variant="destructive" size="icon" className="h-8 w-8 rounded-full"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                  <div className="aspect-video bg-gray-100"><img src={story.image} className="w-full h-full object-cover" /></div>
                  <CardContent className="p-4"><h4 className="font-bold truncate">{story.heading}</h4></CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="space-y-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl shadow-sm border gap-4">
              <h3 className="font-semibold">Gallery ({trainingImages.length})</h3>
              <Button onClick={() => document.getElementById('g-up')?.click()} variant="outline" className="w-full sm:w-auto" disabled={uploadingId === "gallery_add"}>
                {uploadingId === "gallery_add" ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />} Add Images
              </Button>
              <input id="g-up" type="file" hidden multiple accept="image/*" onChange={onGalleryFileChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trainingImages.map((img, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden border group bg-gray-50">
                  <img src={img} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button variant="destructive" size="icon" className="rounded-full" onClick={() => removeGalleryImage(index)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- MODALS --- */}
      <Dialog open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader><DialogTitle>Crop Image</DialogTitle></DialogHeader>
          <div className="relative w-full h-64 bg-gray-900 mt-2 overflow-hidden rounded-md">
            {imageToCrop && <Cropper image={imageToCrop} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />}
          </div>
          <DialogFooter className="mt-4 gap-2"><Button onClick={handleConfirmCrop} className="w-full">Crop & Upload</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isStoryModalOpen} onOpenChange={setIsStoryModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader><DialogTitle>{editIndex !== null ? "Edit Story" : "Add Story"}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border">
              {uploadingId === "story_modal" ? <Loader2 className="animate-spin" /> : currentStory.image ? <img src={currentStory.image} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-300 w-8 h-8" />}
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={() => document.getElementById('s-img')?.click()}>Select Image</Button>
            <input id="s-img" type="file" hidden accept="image/*" onChange={async (e)=>{
              const file = e.target.files?.[0];
              if(file){ setUploadingId("story_modal"); const url=await handleImageUpload(file); if(url) setCurrentStory({...currentStory, image:url}); setUploadingId(null);}
            }} />
            <Input value={currentStory.heading} onChange={(e) => setCurrentStory({ ...currentStory, heading: e.target.value })} placeholder="Heading" />
            <Textarea value={currentStory.paragraph} onChange={(e) => setCurrentStory({ ...currentStory, paragraph: e.target.value })} placeholder="Description" rows={3} />
          </div>
          <DialogFooter className="mt-4"><Button onClick={handleStorySubmit} className="w-full" disabled={savingStories}>Save Story</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// --- CROP HELPER ---
const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<File | null> => {
  const image = new Image(); image.src = imageSrc; image.crossOrigin = "anonymous";
  await new Promise((r) => (image.onload = r));
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width; canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
  return new Promise((r) => { canvas.toBlob((b) => { if (!b) return r(null); r(new File([b], "f.jpg", { type: "image/jpeg" })); }, "image/jpeg"); });
};

export default SuccessStoriesManager;