import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, TrendingUp } from "lucide-react";
import { Product } from "@/types";

interface DashboardOverviewProps {
  products: Product[];
  setActiveTab: (tab: string) => void;
}

export const DashboardOverview = ({ 
  products = [],
  setActiveTab
}: DashboardOverviewProps) => (
  <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-white/70 backdrop-blur-sm max-w-4xl mx-auto">
    <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg">
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl font-bold text-white">Dashboard Overview</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="p-8">
      {/* Stats Card for Products - Professional Size */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-md">
          <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">Total Products</p>
                <p className="text-5xl font-bold text-gray-800 mb-2">{products.length}</p>
                <div className="flex items-center text-green-500 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>Active Inventory</span>
                </div>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-xl">
                <Package className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <Button 
              onClick={() => setActiveTab('products')} 
              className="group relative flex flex-col items-center justify-center p-6 h-28 w-full bg-white/60 border border-gray-200/60 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white transition-all duration-300 rounded-2xl hover:shadow-lg hover:-translate-y-1"
            >
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300 mb-3">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Add Product</span>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-all duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);