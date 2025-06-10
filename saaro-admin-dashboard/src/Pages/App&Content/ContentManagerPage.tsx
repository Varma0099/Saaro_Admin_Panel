import React, { useState } from 'react';
import {
  Home,
  Bell,
  FileText,
  Video,
  Upload,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Settings,
  Image,
  Link,
  AlignLeft,
  Calendar,
  Users,
  Send,
  Shield,
  BookOpen,
  Play,
  File,
  Globe,
  Star,
  MessageSquare,
  Search,
  Filter,
  MoreVertical,
  Check,
  X,
  Clock,
  Target,
  Zap
} from 'lucide-react';

// Define interfaces for type safety
interface ContentManagerPageProps {
  currentPath: string;
}

interface HomepageSection {
  id: number;
  title: string;
  type: string;
  content: string;
  image?: string;
  status: string;
  order: number;
  lastModified: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  status: string;
  recipients: string;
  sentAt?: string;
  scheduledFor?: string;
  clickRate?: string;
}

interface Article {
  id: number;
  title: string;
  type: string;
  category: string;
  status: string;
  author: string;
  publishedAt?: string;
  views?: number;
  featured?: boolean;
  duration?: string;
}

const ContentManagerPage = ({ currentPath }: ContentManagerPageProps) => {
  const [activeTab, setActiveTab] = useState('homepage');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample data for homepage sections
  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>([
    {
      id: 1,
      title: 'Hero Banner',
      type: 'banner',
      content: 'Your Health, Our Priority',
      image: '/api/placeholder/800/400',
      status: 'active',
      order: 1,
      lastModified: '2025-01-15'
    },
    {
      id: 2,
      title: 'Featured Services',
      type: 'services',
      content: 'Consultation, Surgery, Emergency Care',
      status: 'active',
      order: 2,
      lastModified: '2025-01-14'
    },
    {
      id: 3,
      title: 'Doctor Testimonials',
      type: 'testimonials',
      content: 'Reviews from our trusted doctors',
      status: 'draft',
      order: 3,
      lastModified: '2025-01-13'
    }
  ]);

  // Sample data for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New Feature Update',
      message: 'Video consultation now available for all users',
      type: 'feature',
      status: 'sent',
      recipients: 'all_users',
      sentAt: '2025-01-15T10:30:00Z',
      clickRate: '12.5%'
    },
    {
      id: 2,
      title: 'Maintenance Notice',
      message: 'Scheduled maintenance on Sunday 2-4 AM',
      type: 'maintenance',
      status: 'scheduled',
      recipients: 'all_users',
      scheduledFor: '2025-01-20T02:00:00Z'
    }
  ]);

  // Sample data for content articles
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: 'Understanding Telemedicine',
      type: 'blog',
      category: 'Health Tips',
      status: 'published',
      author: 'Dr. Sarah Johnson',
      publishedAt: '2025-01-10',
      views: 1250,
      featured: true
    },
    {
      id: 2,
      title: 'Privacy Policy Update',
      type: 'legal',
      category: 'Legal',
      status: 'published',
      author: 'Legal Team',
      publishedAt: '2025-01-08',
      views: 890
    },
    {
      id: 3,
      title: 'How to Book Appointments',
      type: 'video',
      category: 'Tutorial',
      status: 'draft',
      author: 'Support Team',
      duration: '3:45'
    }
  ]);

  const openModal = (type: string, item: HomepageSection | Notification | Article | null = null) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
  };

  const renderHomepageManager = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Homepage Sections</h2>
          <p className="text-slate-600 mt-1">manage your homepage content and layout</p>
        </div>
        <button
          onClick={() => openModal('homepage-section')}
          className="flex items-center space-x-2 bg-gradient-to-r from-[#49A097] to-[#49A097]/80 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          <span>Add Section</span>
        </button>
      </div>

      <div className="grid gap-4">
        {homepageSections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#49A097]/20 to-[#49A097]/10 rounded-lg flex items-center justify-center">
                  <Home className="h-6 w-6 text-[#49A097]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{section.title}</h3>
                  <p className="text-sm text-slate-500 capitalize">{section.type} • Order: {section.order}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  section.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {section.status}
                </span>
                <button className="p-2 text-slate-400 hover:text-[#49A097] rounded-lg hover:bg-slate-50">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-slate-600 mb-4">{section.content}</p>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Last modified: {section.lastModified}</span>
              <button className="flex items-center space-x-1 text-[#49A097] hover:text-[#49A097]/80">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationManager = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Push Notifications</h2>
          <p className="text-slate-600 mt-1">Send notifications to users and manage campaigns</p>
        </div>
        <button
          onClick={() => openModal('notification')}
          className="flex items-center space-x-2 bg-gradient-to-r from-[#49A097] to-[#49A097]/80 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
        >
          <Send className="h-4 w-4" />
          <span>Send Notification</span>
        </button>
      </div>

      <div className="grid gap-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  notification.type === 'feature' 
                    ? 'bg-blue-100' 
                    : notification.type === 'maintenance'
                    ? 'bg-orange-100'
                    : 'bg-green-100'
                }`}>
                  <Bell className={`h-6 w-6 ${
                    notification.type === 'feature' 
                      ? 'text-blue-600' 
                      : notification.type === 'maintenance'
                      ? 'text-orange-600'
                      : 'text-green-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{notification.title}</h3>
                  <p className="text-slate-600 mt-1">{notification.message}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{notification.recipients.replace('_', ' ')}</span>
                    </span>
                    {notification.clickRate && (
                      <span className="flex items-center space-x-1">
                        <Target className="h-4 w-4" />
                        <span>Click Rate: {notification.clickRate}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  notification.status === 'sent' 
                    ? 'bg-green-100 text-green-800' 
                    : notification.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {notification.status}
                </span>
                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              {notification.sentAt ? (
                <span>Sent: {new Date(notification.sentAt).toLocaleString()}</span>
              ) : notification.scheduledFor ? (
                <span className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Scheduled for: {new Date(notification.scheduledFor).toLocaleString()}</span>
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContentManager = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Content Library</h2>
          <p className="text-slate-600 mt-1">Manage blogs, videos, and legal documents</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none"
          >
            <option value="all">All Types</option>
            <option value="blog">Blogs</option>
            <option value="video">Videos</option>
            <option value="legal">Legal Docs</option>
          </select>
          <button
            onClick={() => openModal('content')}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#49A097] to-[#49A097]/80 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
            <span>Add Content</span>
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  article.type === 'blog' 
                    ? 'bg-blue-100' 
                    : article.type === 'video'
                    ? 'bg-purple-100'
                    : 'bg-green-100'
                }`}>
                  {article.type === 'blog' ? (
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  ) : article.type === 'video' ? (
                    <Play className="h-6 w-6 text-purple-600" />
                  ) : (
                    <File className="h-6 w-6 text-green-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-slate-800">{article.title}</h3>
                    {article.featured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-2">
                    <span className="px-2 py-1 bg-slate-100 rounded-full">{article.category}</span>
                    <span>by {article.author}</span>
                    {article.duration && <span>Duration: {article.duration}</span>}
                  </div>
                  {article.views && (
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views} views</span>
                      </span>
                      <span>Published: {article.publishedAt}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  article.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : article.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {article.status}
                </span>
                <button className="p-2 text-slate-400 hover:text-[#49A097] rounded-lg hover:bg-slate-50">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderModal = () => {
    if (!isModalOpen) return null;

    const getModalContent = () => {
      switch (modalType) {
        case 'homepage-section':
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Add Homepage Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none"
                    placeholder="Enter section title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Type</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none">
                    <option value="banner">Hero Banner</option>
                    <option value="services">Services</option>
                    <option value="testimonials">Testimonials</option>
                    <option value="features">Features</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none"
                  placeholder="Enter section content"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload Image</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-500">Drag and drop or click to upload</p>
                </div>
              </div>
            </div>
          );

        case 'notification':
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Send Push Notification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none"
                    placeholder="Notification title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none">
                    <option value="general">General</option>
                    <option value="feature">Feature Update</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none"
                  placeholder="Enter notification message"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Recipients</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none">
                    <option value="all_users">All Users</option>
                    <option value="doctors">Doctors Only</option>
                    <option value="patients">Patients Only</option>
                    <option value="custom">Custom Group</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Send Time</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none">
                    <option value="now">Send Now</option>
                    <option value="schedule">Schedule Later</option>
                  </select>
                </div>
              </div>
            </div>
          );

        case 'content':
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Add New Content</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Content Type</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none">
                    <option value="blog">Blog Article</option>
                    <option value="video">Video</option>
                    <option value="legal">Legal Document</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none"
                    placeholder="Enter category"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none"
                  placeholder="Enter content title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Content/Description</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] outline-none"
                  placeholder="Enter content or description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload File</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-500">Upload images, videos, or documents</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-slate-300 text-[#49A097] focus:ring-[#49A097]" />
                  <span className="text-sm text-slate-700">Featured Content</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-slate-300 text-[#49A097] focus:ring-[#49A097]" />
                  <span className="text-sm text-slate-700">Publish Immediately</span>
                </label>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {getModalContent()}
            <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-slate-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-[#49A097] to-[#49A097]/80 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-300">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'homepage':
        return renderHomepageManager();
      case 'notifications':
        return renderNotificationManager();
      case 'content':
        return renderContentManager();
      default:
        return renderHomepageManager();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          App & Content Manager
        </h1>
        <p className="text-slate-600 text-lg">
          Manage your app content, homepage sections, and user communications
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2">
        <nav className="flex space-x-2">
          {[
            { id: 'homepage', label: 'Homepage Sections', icon: Home },
            { id: 'notifications', label: 'Push Notifications', icon: Bell },
            { id: 'content', label: 'Content Library', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#49A097] to-[#49A097]/80 text-white shadow-md'
                  : 'text-slate-600 hover:text-[#49A097] hover:bg-slate-50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-8">
        {renderTabContent()}
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  );
};

export default ContentManagerPage;