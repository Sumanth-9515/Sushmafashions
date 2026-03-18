import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Trash2, Plus, Save, Loader2, Upload, ImageIcon, Pencil } from "lucide-react";
import axios from "axios";
import Cropper from "react-easy-crop"; // ✅ Install this: npm install react-easy-crop

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface TeamMember {
  _id?: string;
  name: string;
  image: string;
  address: string; // Used as Role/Designation
  content: string; // Quote
  description: string; // Footer text
}

const TeamManager = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | number | null>(null);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TeamMember>({
    name: "",
    image: "",
    address: "",
    content: "",
    description: ""
  });

  // --- NEW: CROP STATES ---
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/team`);
      setTeam(res.data);
    } catch (error) {
      console.error("Error fetching team", error);
    } finally {
      setFetching(false);
    }
  };

  // --- NEW: CROP HANDLERS ---
  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

    setUploadingId("form");
    setIsCropModalOpen(false);

    try {
      // 1. Process image on canvas
      const croppedFile = await getCroppedImg(imageToCrop, croppedAreaPixels);
      if (croppedFile) {
        // 2. Upload the cropped file using existing logic
        await handleImageUpload(croppedFile);
      }
    } catch (e) {
      console.error(e);
      alert("Error cropping image");
    } finally {
      setUploadingId(null);
      setImageToCrop(null);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploadingId("form");
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post(`${API_URL}/api/team/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData(prev => ({ ...prev, image: res.data.url }));
    } catch (error) {
      alert("Image upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.image) return alert("Name and Image are required");
    setLoading(true);

    try {
      if (isEditing && currentId) {
        const res = await axios.put(`${API_URL}/api/team/${currentId}`, formData);
        setTeam(team.map(t => t._id === currentId ? res.data : t));
        alert("Member updated!");
      } else {
        const res = await axios.post(`${API_URL}/api/team`, formData);
        setTeam([res.data, ...team]);
        alert("Member added!");
      }
      resetForm();
    } catch (error) {
      alert("Error saving member");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/api/team/${id}`);
      setTeam(team.filter(t => t._id !== id));
    } catch (error) {
      alert("Error deleting");
    }
  };

  const handleEdit = (member: TeamMember) => {
    setFormData(member);
    setCurrentId(member._id || null);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({ name: "", image: "", address: "", content: "", description: "" });
    setIsEditing(false);
    setCurrentId(null);
  };

  if (fetching) return <div className="p-8"><Loader2 className="animate-spin" /> Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Creative Team Manager</h2>
          <p className="text-gray-500">Add or edit team members displayed on the home page.</p>
        </div>
      </div>

      {/* --- FORM SECTION --- */}
      <Card className="bg-gray-50 border-dashed border-2 border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit Member" : "Add New Member"}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Image Upload */}
            <div className="md:col-span-3 flex flex-col items-center space-y-3">
              <div className="w-full aspect-square bg-white rounded-lg border flex items-center justify-center overflow-hidden relative">
                {uploadingId === "form" ? (
                  <Loader2 className="animate-spin text-blue-500" />
                ) : formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-gray-300 w-12 h-12" />
                )}
              </div>
              <div className="w-full">
                <Input 
                  type="file" 
                  accept="image/*" 
                  id="team-upload" 
                  className="hidden" 
                  onChange={onFileChange} // ✅ Updated to trigger crop
                />
                <Button variant="outline" className="w-full" onClick={() => document.getElementById('team-upload')?.click()}>
                  <Upload className="w-4 h-4 mr-2" /> {formData.image ? "Change" : "Upload"}
                </Button>
              </div>
            </div>

            {/* Text Fields */}
            <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  placeholder="e.g. Kishor Kumar"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Address / Role</label>
                <Input 
                  value={formData.address} 
                  onChange={e => setFormData({...formData, address: e.target.value})} 
                  placeholder="e.g. Fashion Director, Vogue"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Content / Quote</label>
                <Textarea 
                  value={formData.content} 
                  onChange={e => setFormData({...formData, content: e.target.value})} 
                  placeholder="e.g. The attention to detail is unparalleled..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Description / Stats</label>
                <Input 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  placeholder="e.g. Client for 5+ years"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            {isEditing && (
              <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            )}
            <Button onClick={handleSubmit} disabled={loading || uploadingId !== null} className="bg-blue-600">
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {isEditing ? "Update Member" : "Add Member"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* --- LIST SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <Card key={member._id} className="group relative hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center space-y-4">
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" onClick={() => handleEdit(member)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(member._id!)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <img 
                src={member.image} 
                alt={member.name} 
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-blue-100" 
              />
              <div>
                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className="text-blue-600 text-sm font-medium">{member.address}</p>
              </div>
              <p className="text-gray-500 text-sm italic">"{member.content}"</p>
              <div className="pt-3 border-t">
                <span className="text-xs font-bold text-gray-400 uppercase">{member.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- NEW: CROP MODAL --- */}
      <Dialog open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crop Member Image</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-64 bg-gray-900 mt-4 rounded-md overflow-hidden">
            {imageToCrop && (
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1} // Square aspect ratio for team members
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
          <div className="mt-4 space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase">Zoom</label>
            <input 
              type="range" 
              value={zoom} 
              min={1} 
              max={3} 
              step={0.1} 
              onChange={(e) => setZoom(Number(e.target.value))} 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCropModalOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmCrop} className="bg-blue-600">Crop & Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// --- HELPER FUNCTION FOR IMAGE PROCESSING ---
const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<File | null> => {
  const image = new Image();
  image.src = imageSrc;
  image.crossOrigin = "anonymous";
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve(null);
      const file = new File([blob], "member_cropped.jpg", { type: "image/jpeg" });
      resolve(file);
    }, "image/jpeg");
  });
};

export default TeamManager;