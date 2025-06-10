import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Users,
  Building2,
  DollarSign,
  Settings,
  Eye,
  MoreVertical,
  Globe,
  Map
} from 'lucide-react';

interface LocationManagerPageProps {
  currentPath: string;
}

interface City {
  id: string;
  name: string;
  state: string;
  country: string;
  status: 'active' | 'inactive';
  totalDoctors: number;
  totalHospitals: number;
  servicesCount: number;
  createdAt: string;
  population?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface Service {
  id: string;
  name: string;
  basePrice: number;
  cityPrice: number;
  isActive: boolean;
  category: string;
}

const LocationManagerPage: React.FC<LocationManagerPageProps> = ({ currentPath }) => {
  const [activeTab, setActiveTab] = useState('cities');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // Mock data for cities
  const [cities] = useState<City[]>([
    {
      id: '1',
      name: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      status: 'active',
      totalDoctors: 1250,
      totalHospitals: 85,
      servicesCount: 45,
      createdAt: '2024-01-15',
      population: '12.4M',
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: '2',
      name: 'Delhi',
      state: 'Delhi NCR',
      country: 'India',
      status: 'active',
      totalDoctors: 980,
      totalHospitals: 62,
      servicesCount: 42,
      createdAt: '2024-01-10',
      population: '32.9M',
      coordinates: { lat: 28.7041, lng: 77.1025 }
    },
    {
      id: '3',
      name: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      status: 'active',
      totalDoctors: 756,
      totalHospitals: 45,
      servicesCount: 38,
      createdAt: '2024-01-20',
      population: '12.3M',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: '4',
      name: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      status: 'inactive',
      totalDoctors: 0,
      totalHospitals: 0,
      servicesCount: 0,
      createdAt: '2024-02-01',
      population: '7.4M',
      coordinates: { lat: 18.5204, lng: 73.8567 }
    }
  ]);

  // Mock data for services
  const [services] = useState<Service[]>([
    {
      id: '1',
      name: 'General Consultation',
      basePrice: 500,
      cityPrice: 600,
      isActive: true,
      category: 'Consultation'
    },
    {
      id: '2',
      name: 'Cardiology Consultation',
      basePrice: 1200,
      cityPrice: 1500,
      isActive: true,
      category: 'Specialist'
    },
    {
      id: '3',
      name: 'Lab Tests - Basic',
      basePrice: 800,
      cityPrice: 950,
      isActive: true,
      category: 'Diagnostics'
    },
    {
      id: '4',
      name: 'MRI Scan',
      basePrice: 5000,
      cityPrice: 6500,
      isActive: false,
      category: 'Imaging'
    }
  ]);

  const openModal = (type: string, city?: City) => {
    setModalType(type);
    setSelectedCity(city || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setSelectedCity(null);
  };

  const renderCitiesTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Supported Cities</h2>
          <p className="text-slate-600">Manage cities where Saaro Health services are available</p>
        </div>
        <button
          onClick={() => openModal('add-city')}
          className="flex items-center px-4 py-2 bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New City
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
          />
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div
            key={city.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-[#49A097]/10 rounded-lg flex items-center justify-center mr-3">
                  <MapPin className="h-5 w-5 text-[#49A097]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{city.name}</h3>
                  <p className="text-sm text-slate-500">{city.state}, {city.country}</p>
                </div>
              </div>
              <div className="relative">
                <button className="p-1 hover:bg-slate-100 rounded">
                  <MoreVertical className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Status</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  city.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {city.status}
                </span>
              </div>
              
              {city.population && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Population</span>
                  <span className="text-sm font-medium text-slate-800">{city.population}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Doctors</span>
                <span className="text-sm font-medium text-slate-800">{city.totalDoctors}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Hospitals</span>
                <span className="text-sm font-medium text-slate-800">{city.totalHospitals}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Services</span>
                <span className="text-sm font-medium text-slate-800">{city.servicesCount}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openModal('edit-city', city)}
                className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => openModal('city-services', city)}
                className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 transition-colors"
              >
                <Settings className="h-4 w-4 mr-1" />
                Services
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServicesTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Service Pricing</h2>
          <p className="text-slate-600">Manage city-wise service pricing and availability</p>
        </div>
        <select className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent">
          <option value="">Select City</option>
          {cities.filter(city => city.status === 'active').map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Service</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Category</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Base Price</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">City Price</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{service.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">₹{service.basePrice}</td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-800">₹{service.cityPrice}</span>
                    <span className={`ml-2 text-xs ${
                      service.cityPrice > service.basePrice ? 'text-red-600' : 'text-green-600'
                    }`}>
                      ({service.cityPrice > service.basePrice ? '+' : ''}{((service.cityPrice - service.basePrice) / service.basePrice * 100).toFixed(0)}%)
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      service.isActive 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal('edit-service', selectedCity || undefined)}
                      className="text-[#49A097] hover:text-[#49A097]/80 font-medium text-sm"
                    >
                      Edit Pricing
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800">
              {modalType === 'add-city' && 'Add New City'}
              {modalType === 'edit-city' && 'Edit City'}
              {modalType === 'city-services' && `Manage Services - ${selectedCity?.name}`}
              {modalType === 'edit-service' && 'Edit Service Pricing'}
            </h3>
          </div>
          
          <div className="p-6">
            {(modalType === 'add-city' || modalType === 'edit-city') && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">City Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
                      placeholder="Enter city name"
                      defaultValue={selectedCity?.name || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
                      placeholder="Enter state"
                      defaultValue={selectedCity?.state || ''}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
                      placeholder="Enter country"
                      defaultValue={selectedCity?.country || 'India'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Population</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
                      placeholder="e.g., 12.4M"
                      defaultValue={selectedCity?.population || ''}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
                      placeholder="Enter latitude"
                      defaultValue={selectedCity?.coordinates?.lat || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
                      placeholder="Enter longitude"
                      defaultValue={selectedCity?.coordinates?.lng || ''}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
                    defaultValue={selectedCity?.status || 'active'}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            )}

            {modalType === 'city-services' && (
              <div className="space-y-4">
                <p className="text-slate-600">Configure which services are available in {selectedCity?.name} and set city-specific pricing.</p>
                
                <div className="border border-slate-200 rounded-lg">
                  {services.map((service, index) => (
                    <div key={service.id} className={`p-4 ${index !== services.length - 1 ? 'border-b border-slate-200' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`service-${service.id}`}
                            defaultChecked={service.isActive}
                            className="h-4 w-4 text-[#49A097] focus:ring-[#49A097] border-slate-300 rounded"
                          />
                          <div className="ml-3">
                            <label htmlFor={`service-${service.id}`} className="font-medium text-slate-800">
                              {service.name}
                            </label>
                            <p className="text-sm text-slate-500">{service.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-slate-500">Base: ₹{service.basePrice}</p>
                            <input
                              type="number"
                              className="w-24 px-2 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
                              defaultValue={service.cityPrice}
                              placeholder="City price"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 font-medium"
            >
              {modalType === 'add-city' ? 'Add City' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-gradient-to-br from-[#49A097] to-[#49A097]/80 rounded-xl flex items-center justify-center mr-4">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Location Management
              </h1>
              <p className="text-slate-600">Manage supported cities and region-specific services</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm border border-slate-200">
            <button
              onClick={() => setActiveTab('cities')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'cities'
                  ? 'bg-[#49A097] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Map className="h-4 w-4 inline mr-2" />
              Cities
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'services'
                  ? 'bg-[#49A097] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Service Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6">
        {activeTab === 'cities' && renderCitiesTab()}
        {activeTab === 'services' && renderServicesTab()}
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  );
};

export default LocationManagerPage;