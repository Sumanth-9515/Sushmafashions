import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mail, Phone, User, Trash2, 
  Clock, MessageSquare, ArrowLeft, RefreshCcw 
} from "lucide-react";

// Use environment variable for production, fallback to localhost for dev
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      // FIXED URL: Added /api/ prefix
      const response = await fetch(`${API_URL}/api/contacts`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      // FIXED URL: Added /api/ prefix
      const response = await fetch(`${API_URL}/api/contacts/${id}`, { 
        method: "DELETE" 
      });
      
      if (response.ok) {
        setInquiries(inquiries.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete from server");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-['Poppins']">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button 
              onClick={() => navigate("/admin")} 
              className="flex items-center text-gray-500 hover:text-gray-800 mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Customer Inquiries</h1>
            <p className="text-gray-500">View and manage customer messages</p>
          </div>
          <button 
            onClick={fetchInquiries}
            className="p-2 bg-white border rounded-full hover:bg-gray-100 transition-all shadow-sm"
          >
            <RefreshCcw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">No Inquiries Found</h3>
          </div>
        ) : (
          <div className="grid gap-6">
            {inquiries.map((item) => (
              <div 
                key={item._id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-200 transition-all overflow-hidden hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> 
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => deleteInquiry(item._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-xl text-sm">
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-4 h-4 mr-2 text-amber-600" /> {item.email}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-amber-600" /> {item.phone}
                    </div>
                    <div className="flex items-center text-gray-700 col-span-full font-medium">
                      <MessageSquare className="w-4 h-4 mr-2 text-amber-600" /> Subject: {item.subject}
                    </div>
                  </div>

                  <div className="text-gray-700 leading-relaxed border-t pt-4">
                    <p className="font-medium text-xs text-gray-400 uppercase mb-2">Message Body:</p>
                    <p className="whitespace-pre-wrap">{item.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;