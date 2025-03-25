import React, { useState } from 'react';
import { Upload, Image, Plus, Trash2, Edit } from 'lucide-react';

const Advertisement = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Summer Plant Sale',
      description: 'Get 30% off on all indoor plants this season!',
      image: '/api/placeholder/1200/400',
      startDate: '2024-06-01',
      endDate: '2024-07-31',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Gardening Tools Discount',
      description: 'Premium gardening tools at unbeatable prices',
      image: '/api/placeholder/1200/400',
      startDate: '2024-05-15',
      endDate: '2024-06-15',
      status: 'Upcoming'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState({
    title: '',
    description: '',
    image: null,
    startDate: '',
    endDate: ''
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentBanner(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBanner = () => {
    if (currentBanner.id) {
      // Edit existing banner
      setBanners(prev => 
        prev.map(banner => 
          banner.id === currentBanner.id 
            ? { ...currentBanner, status: 'Active' } 
            : banner
        )
      );
    } else {
      // Add new banner
      setBanners(prev => [
        ...prev, 
        { 
          ...currentBanner, 
          id: prev.length + 1,
          status: 'Active'
        }
      ]);
    }
    setIsModalOpen(false);
    setCurrentBanner({ title: '', description: '', image: null, startDate: '', endDate: '' });
  };

  const handleDeleteBanner = (id) => {
    setBanners(prev => prev.filter(banner => banner.id !== id));
  };

  const handleEditBanner = (banner) => {
    setCurrentBanner(banner);
    setIsModalOpen(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-4 md:p-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-emerald-900/10 border border-emerald-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Banner Advertisements
            </h2>
            <button 
              onClick={() => {
                setCurrentBanner({ title: '', description: '', image: null, startDate: '', endDate: '' });
                setIsModalOpen(true);
              }}
              className="bg-white text-emerald-600 px-4 py-2 rounded-full hover:bg-emerald-50 transition-colors flex items-center"
            >
              <Plus className="mr-2" size={20} />
              Create Banner
            </button>
          </div>

          {/* Banner List */}
          <div className="p-6 space-y-6">
            {banners.map((banner) => (
              <div 
                key={banner.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-1/3">
                  <img 
                    src={banner.image} 
                    alt={banner.title} 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6 flex-grow flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-800 mb-2">
                      {banner.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{banner.description}</p>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>Start: {banner.startDate}</span>
                      <span>End: {banner.endDate}</span>
                      <span 
                        className={`font-semibold ${
                          banner.status === 'Active' 
                            ? 'text-green-600' 
                            : banner.status === 'Upcoming' 
                            ? 'text-blue-600' 
                            : 'text-red-600'
                        }`}
                      >
                        {banner.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditBanner(banner)}
                      className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-full"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Creation/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">
              {currentBanner.id ? 'Edit Banner' : 'Create New Banner'}
            </h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Banner Title"
                value={currentBanner.title}
                onChange={(e) => setCurrentBanner(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <textarea 
                placeholder="Banner Description"
                value={currentBanner.description}
                onChange={(e) => setCurrentBanner(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={3}
              />
              <div className="flex space-x-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input 
                    type="date" 
                    value={currentBanner.startDate}
                    onChange={(e) => setCurrentBanner(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input 
                    type="date" 
                    value={currentBanner.endDate}
                    onChange={(e) => setCurrentBanner(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {currentBanner.image ? (
                  <img 
                    src={currentBanner.image} 
                    alt="Banner" 
                    className="max-h-48 mx-auto object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="text-gray-400 mb-2" size={32} />
                    <p className="text-gray-500">Upload Banner Image</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="banner-upload"
                />
                <label 
                  htmlFor="banner-upload" 
                  className="mt-4 inline-block bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 cursor-pointer"
                >
                  {currentBanner.image ? 'Change Image' : 'Upload Image'}
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveBanner}
                className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600"
              >
                Save Banner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Advertisement;