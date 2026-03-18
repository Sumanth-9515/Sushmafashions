import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PlusCircle, Trash2, Edit, PackageX, Loader2, Upload, X, ImageIcon } from "lucide-react";
import Swal from "sweetalert2";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Interface matching your Backend Model
interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl?: string;
}

export const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
  });

  // --- 1. Fetch Data ---
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- 2. Image Preview Handler ---
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // --- 3. Delete Handler (With SweetAlert) ---
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`, { method: "DELETE" });
        if (response.ok) {
          Swal.fire("Deleted!", "Product has been removed.", "success");
          fetchProducts();
        }
      } catch (error) {
        Swal.fire("Error", "Failed to delete product.", "error");
      }
    }
  };

  // --- 4. Submit Handler (Add / Edit) ---
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Show Loading Alert
    Swal.fire({
      title: "Processing...",
      text: "Uploading to Cloudinary and saving data",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", String(formData.price));
    data.append("category", formData.category);
    data.append("stock", String(formData.stock));
    
    // Append image if selected
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    const url = isEditing 
      ? `${API_BASE_URL}/api/products/${currentId}` 
      : `${API_BASE_URL}/api/products`;
    
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, { method, body: data });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: isEditing ? "Updated!" : "Added!",
          text: `Product ${isEditing ? "updated" : "added"} successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });
        closeModal();
        fetchProducts();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please check your connection.", "error");
    }
  };

  // --- 5. Helper Functions ---
  const openModal = (product?: Product) => {
    if (product) {
      setFormData(product);
      setIsEditing(true);
      setCurrentId(product._id || null);
      setImagePreview(product.imageUrl || null);
    } else {
      setFormData({ name: "", price: 0, description: "", category: "", stock: 0 });
      setIsEditing(false);
      setCurrentId(null);
      setImagePreview(null);
      setSelectedFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl border shadow-sm gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Admin Inventory</h2>
          <p className="text-slate-500">Manage your boutique products and stock</p>
        </div>
        <Button onClick={() => openModal()} className="bg-slate-900 hover:bg-slate-800 h-12 px-6 rounded-xl">
          <PlusCircle className="w-5 h-5 mr-2" /> Add New Product
        </Button>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-slate-500 animate-pulse">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <PackageX className="mx-auto h-16 w-16 text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">No Products Found</h3>
          <Button variant="link" onClick={() => openModal()} className="text-blue-600">Click here to add your first product</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <Card key={p._id} className="group overflow-hidden border-slate-200 hover:shadow-xl transition-all duration-300 rounded-2xl">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img 
                  src={p.imageUrl} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" className="bg-white/90 text-slate-800 hover:bg-white" onClick={() => openModal(p)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" className="shadow-lg" onClick={() => handleDelete(p._id!)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {p.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-lg text-slate-800 truncate">{p.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-1 mb-3">{p.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-slate-900">₹{p.price}</span>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${p.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${p.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <span className="text-xs font-bold">Stock: {p.stock}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{isEditing ? "Edit Product" : "New Product"}</DialogTitle>
            <DialogDescription>Fill in the details to update your boutique inventory.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-5 mt-4">
            {/* Image Upload Area */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Product Image</label>
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:border-blue-400 transition-colors bg-slate-50/50">
                {imagePreview ? (
                  <div className="relative group">
                    <img src={imagePreview} className="h-40 w-full object-contain rounded-xl" />
                    <button 
                      type="button" 
                      onClick={() => {setSelectedFile(null); setImagePreview(null);}}
                      className="absolute top-1 right-1 bg-rose-500 text-white p-1 rounded-full shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center py-6 cursor-pointer">
                    <Upload className="w-10 h-10 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-500 font-medium">Click to upload image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} required={!isEditing} />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <input 
                placeholder="Product Name" 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-400">₹</span>
                  <input 
                    type="number" 
                    placeholder="Price" 
                    className="w-full h-12 pl-8 pr-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={formData.price || ""}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    required 
                  />
                </div>
                <input 
                  type="number" 
                  placeholder="Stock Quantity" 
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={formData.stock || ""}
                  onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                  required 
                />
              </div>

              <input 
                placeholder="Category (e.g. Sarees, Lehengas)" 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required 
              />

              <textarea 
                placeholder="Product Description..." 
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required 
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl" onClick={closeModal}>Cancel</Button>
              <Button type="submit" className="flex-[2] h-12 rounded-xl bg-blue-600 hover:bg-blue-700">
                {isEditing ? "Update Product" : "Save Product"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};