import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Save,
  X,
  ArrowLeft,
  Building2,
  Users,
  DollarSign,
  MapPin,
  Stethoscope,
  Scissors,
  Link,
  AlertCircle,
  CheckCircle,
  Eye,
  Settings
} from 'lucide-react';

// Type definitions
interface Surgery {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

interface Specialty {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  surgeries: Surgery[];
}

interface Doctor {
  id: number;
  name: string;
  specialtyId: number;
  city: string;
}

interface Clinic {
  id: number;
  name: string;
  city: string;
}

interface PricingData {
  id: number;
  surgeryId: number;
  city: string;
  price: number;
  doctorIds: number[];
  clinicIds: number[];
}

interface FormData {
  name: string;
  description: string;
  isActive: boolean;
  city: string;
  price: string;
  doctorId: string;
  clinicId: string;
}

interface Filters {
  status: 'all' | 'active' | 'inactive';
  city: string;
}

interface SurgerySpecialtyPageProps {
  currentPath: string;
}

type ModalType = 'specialty' | 'surgery' | 'pricing' | 'link' | '';
type ViewType = 'specialties' | 'surgeries' | 'pricing';
type DeleteType = 'specialty' | 'surgery' | 'pricing';

// Surgery & Specialty Master Page Component
const SurgerySpecialtyPage: React.FC<SurgerySpecialtyPageProps> = ({ currentPath }) => {
  return <SurgerySpecialtyMaster currentPath={currentPath} />;
};

// Mock data - replace with actual API calls
const mockSpecialties: Specialty[] = [
  {
    id: 1,
    name: 'Cardiology',
    description: 'Heart and cardiovascular system',
    isActive: true,
    surgeries: [
      { id: 1, name: 'Angioplasty', description: 'Balloon angioplasty procedure', isActive: true },
      { id: 2, name: 'Bypass Surgery', description: 'Coronary artery bypass', isActive: true }
    ]
  },
  {
    id: 2,
    name: 'Orthopedics',
    description: 'Bone and joint surgery',
    isActive: true,
    surgeries: [
      { id: 3, name: 'Knee Replacement', description: 'Total knee replacement surgery', isActive: true },
      { id: 4, name: 'Hip Replacement', description: 'Total hip replacement surgery', isActive: true }
    ]
  },
  {
    id: 3,
    name: 'General Surgery',
    description: 'General surgical procedures',
    isActive: true,
    surgeries: [
      { id: 5, name: 'Appendectomy', description: 'Appendix removal surgery', isActive: true }
    ]
  }
];

const mockDoctors: Doctor[] = [
  { id: 1, name: 'Dr. John Smith', specialtyId: 1, city: 'Mumbai' },
  { id: 2, name: 'Dr. Sarah Johnson', specialtyId: 1, city: 'Delhi' },
  { id: 3, name: 'Dr. Mike Wilson', specialtyId: 2, city: 'Bangalore' }
];

const mockClinics: Clinic[] = [
  { id: 1, name: 'City Heart Hospital', city: 'Mumbai' },
  { id: 2, name: 'Metro Medical Center', city: 'Delhi' },
  { id: 3, name: 'Sunshine Clinic', city: 'Bangalore' }
];

const mockCities: string[] = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];

const SurgerySpecialtyMaster: React.FC<SurgerySpecialtyPageProps> = ({ currentPath }) => {
  const [view, setView] = useState<ViewType>('specialties');
  const [specialties, setSpecialties] = useState<Specialty[]>(mockSpecialties);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [selectedSurgery, setSelectedSurgery] = useState<Surgery | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>('');
  const [editingItem, setEditingItem] = useState<Specialty | Surgery | PricingData | null>(null);
  const [filters, setFilters] = useState<Filters>({ status: 'all', city: 'all' });

  // Form states
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    isActive: true,
    city: '',
    price: '',
    doctorId: '',
    clinicId: ''
  });

  const [pricingData, setPricingData] = useState<PricingData[]>([
    { id: 1, surgeryId: 1, city: 'Mumbai', price: 150000, doctorIds: [1], clinicIds: [1] },
    { id: 2, surgeryId: 1, city: 'Delhi', price: 180000, doctorIds: [2], clinicIds: [2] },
    { id: 3, surgeryId: 3, city: 'Bangalore', price: 250000, doctorIds: [3], clinicIds: [3] }
  ]);

  const openModal = (type: ModalType, item: Specialty | Surgery | PricingData | null = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      setFormData({
        name: 'name' in item ? item.name : '',
        description: 'description' in item ? item.description : '',
        isActive: 'isActive' in item ? item.isActive : true,
        city: 'city' in item ? item.city : '',
        price: 'price' in item ? item.price.toString() : '',
        doctorId: '',
        clinicId: ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        isActive: true,
        city: '',
        price: '',
        doctorId: '',
        clinicId: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      isActive: true,
      city: '',
      price: '',
      doctorId: '',
      clinicId: ''
    });
  };

  const handleSave = () => {
    if (modalType === 'specialty') {
      if (editingItem && 'surgeries' in editingItem) {
        // Update specialty
        setSpecialties(prev => prev.map(spec => 
          spec.id === editingItem.id 
            ? { ...spec, name: formData.name, description: formData.description, isActive: formData.isActive }
            : spec
        ));
      } else {
        // Add new specialty
        const newSpecialty: Specialty = {
          id: Date.now(),
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive,
          surgeries: []
        };
        setSpecialties(prev => [...prev, newSpecialty]);
      }
    } else if (modalType === 'surgery') {
      if (editingItem && 'name' in editingItem && !('surgeries' in editingItem) && selectedSpecialty) {
        // Update surgery
        setSpecialties(prev => prev.map(spec => 
          spec.id === selectedSpecialty.id
            ? {
                ...spec,
                surgeries: spec.surgeries.map(surgery =>
                  surgery.id === editingItem.id
                    ? { ...surgery, name: formData.name, description: formData.description, isActive: formData.isActive }
                    : surgery
                )
              }
            : spec
        ));
      } else if (selectedSpecialty) {
        // Add new surgery
        const newSurgery: Surgery = {
          id: Date.now(),
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive
        };
        setSpecialties(prev => prev.map(spec => 
          spec.id === selectedSpecialty.id
            ? { ...spec, surgeries: [...spec.surgeries, newSurgery] }
            : spec
        ));
      }
    } else if (modalType === 'pricing') {
      if (editingItem && 'surgeryId' in editingItem) {
        setPricingData(prev => prev.map(pricing =>
          pricing.id === editingItem.id
            ? { 
                ...pricing, 
                city: formData.city, 
                price: parseFloat(formData.price),
                doctorIds: formData.doctorId ? [parseInt(formData.doctorId)] : pricing.doctorIds,
                clinicIds: formData.clinicId ? [parseInt(formData.clinicId)] : pricing.clinicIds
              }
            : pricing
        ));
      } else if (selectedSurgery) {
        const newPricing: PricingData = {
          id: Date.now(),
          surgeryId: selectedSurgery.id,
          city: formData.city,
          price: parseFloat(formData.price),
          doctorIds: formData.doctorId ? [parseInt(formData.doctorId)] : [],
          clinicIds: formData.clinicId ? [parseInt(formData.clinicId)] : []
        };
        setPricingData(prev => [...prev, newPricing]);
      }
    }
    closeModal();
  };

  const handleDelete = (type: DeleteType, id: number) => {
    if (type === 'specialty') {
      setSpecialties(prev => prev.filter(spec => spec.id !== id));
    } else if (type === 'surgery' && selectedSpecialty) {
      setSpecialties(prev => prev.map(spec => 
        spec.id === selectedSpecialty.id
          ? { ...spec, surgeries: spec.surgeries.filter(surgery => surgery.id !== id) }
          : spec
      ));
    } else if (type === 'pricing') {
      setPricingData(prev => prev.filter(pricing => pricing.id !== id));
    }
  };

  const filteredSpecialties = specialties.filter(specialty =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.status === 'all' || 
     (filters.status === 'active' && specialty.isActive) ||
     (filters.status === 'inactive' && !specialty.isActive))
  );

  const renderSpecialtiesView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Specialties Management</h2>
          <p className="text-slate-600">Manage medical specialties and their associated surgeries</p>
        </div>
        <button
          onClick={() => openModal('specialty')}
          className="bg-[#49A097] hover:bg-[#3d8b82] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Specialty
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search specialties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
          />
        </div>
        <select
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as 'all' | 'active' | 'inactive' }))}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Specialties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecialties.map(specialty => (
          <div key={specialty.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#49A097]/10 rounded-lg">
                  <Stethoscope className="h-5 w-5 text-[#49A097]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{specialty.name}</h3>
                  <p className="text-sm text-slate-600">{specialty.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  specialty.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {specialty.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
              <span className="flex items-center gap-1">
                <Scissors className="h-4 w-4" />
                {specialty.surgeries.length} Surgeries
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedSpecialty(specialty);
                  setView('surgeries');
                }}
                className="flex-1 bg-[#49A097] hover:bg-[#3d8b82] text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="h-4 w-4" />
                View Surgeries
              </button>
              <button
                onClick={() => openModal('specialty', specialty)}
                className="p-2 text-slate-600 hover:text-[#49A097] hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete('specialty', specialty.id)}
                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSurgeriesView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setView('specialties')}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">
            {selectedSpecialty?.name} - Surgeries
          </h2>
          <p className="text-slate-600">Manage surgeries under {selectedSpecialty?.name}</p>
        </div>
        <button
          onClick={() => openModal('surgery')}
          className="bg-[#49A097] hover:bg-[#3d8b82] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Surgery
        </button>
      </div>

      {/* Surgeries List */}
      <div className="space-y-4">
        {selectedSpecialty?.surgeries.map((surgery: Surgery) => (
          <div key={surgery.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#49A097]/10 rounded-lg">
                  <Scissors className="h-6 w-6 text-[#49A097]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{surgery.name}</h3>
                  <p className="text-slate-600 mb-2">{surgery.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-2 py-1 rounded-full ${
                      surgery.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {surgery.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-slate-500">
                      {pricingData.filter(p => p.surgeryId === surgery.id).length} Cities Configured
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedSurgery(surgery);
                    setView('pricing');
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                >
                  <DollarSign className="h-4 w-4" />
                  Pricing
                </button>
                <button
                  onClick={() => openModal('surgery', surgery)}
                  className="p-2 text-slate-600 hover:text-[#49A097] hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete('surgery', surgery.id)}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPricingView = () => {
    const surgeryPricing = pricingData.filter(p => p.surgeryId === selectedSurgery?.id);
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setView('surgeries')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800">
              {selectedSurgery?.name} - City Pricing
            </h2>
            <p className="text-slate-600">Manage city-specific pricing and doctor/clinic links</p>
          </div>
          <button
            onClick={() => openModal('pricing')}
            className="bg-[#49A097] hover:bg-[#3d8b82] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add City Pricing
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surgeryPricing.map(pricing => (
            <div key={pricing.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{pricing.city}</h3>
                    <p className="text-2xl font-bold text-[#49A097]">₹{pricing.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal('pricing', pricing)}
                    className="p-2 text-slate-600 hover:text-[#49A097] hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete('pricing', pricing.id)}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="h-4 w-4" />
                  <span>{pricing.doctorIds.length} Doctors Linked</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Building2 className="h-4 w-4" />
                  <span>{pricing.clinicIds.length} Clinics Linked</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!showModal) return null;

    const getModalTitle = () => {
      switch (modalType) {
        case 'specialty': return editingItem ? 'Edit Specialty' : 'Add New Specialty';
        case 'surgery': return editingItem ? 'Edit Surgery' : 'Add New Surgery';
        case 'pricing': return editingItem ? 'Edit City Pricing' : 'Add City Pricing';
        default: return 'Modal';
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-slate-800">{getModalTitle()}</h3>
            <button
              onClick={closeModal}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            {(modalType === 'specialty' || modalType === 'surgery') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                    placeholder={modalType === 'specialty' ? 'Enter specialty name' : 'Enter surgery name'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                    placeholder="Enter description"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-[#49A097] border-slate-300 rounded focus:ring-[#49A097]"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                    Active
                  </label>
                </div>
              </>
            )}

            {modalType === 'pricing' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                  >
                    <option value="">Select City</option>
                    {mockCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Link Doctor (Optional)</label>
                  <select
                    value={formData.doctorId}
                    onChange={(e) => setFormData(prev => ({ ...prev, doctorId: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                  >
                    <option value="">Select Doctor</option>
                    {mockDoctors
                      .filter(doctor => formData.city === '' || doctor.city === formData.city)
                      .map(doctor => (
                        <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Link Clinic (Optional)</label>
                  <select
                    value={formData.clinicId}
                    onChange={(e) => setFormData(prev => ({ ...prev, clinicId: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                  >
                    <option value="">Select Clinic</option>
                    {mockClinics
                      .filter(clinic => formData.city === '' || clinic.city === formData.city)
                      .map(clinic => (
                        <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
                      ))}
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3 p-6 border-t">
            <button
              onClick={closeModal}
               className="flex-1 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-[#49A097] hover:bg-[#3d8b82] text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              {editingItem ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {view === 'specialties' && renderSpecialtiesView()}
        {view === 'surgeries' && renderSurgeriesView()}
        {view === 'pricing' && renderPricingView()}
        {renderModal()}
      </div>
    </div>
  );
};

export default SurgerySpecialtyPage;