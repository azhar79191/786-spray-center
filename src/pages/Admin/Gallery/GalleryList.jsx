import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaImage, FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getAllGalleryImages, deleteGalleryImage } from '../../../services/galleryService';
import { useData } from '../../../contexts/DataContext';
import Spinner from '../../../components/loaders/Spinner';

const GalleryList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const { refreshData } = useData();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await getAllGalleryImages({}, { _skipCache: true });
      setImages(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const id = confirmDelete;
    setConfirmDelete(null);
    try {
      await deleteGalleryImage(id);
      toast.success('Image deleted successfully');
      clearCacheByType('gallery');
      await refreshData('gallery');
      setImages(prev => prev.filter(img => img._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete image');
    }
  };

  const filteredImages = images.filter((img) => {
    if (filter === 'all') return true;
    if (filter === 'active') return img.isActive;
    if (filter === 'inactive') return !img.isActive;
    return img.category === filter;
  });

  const categories = ['Products', 'Store', 'Events', 'Team', 'Other'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {/* Inline Delete Confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Delete Image</h3>
                <p className="text-sm text-primary-300">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="btn-secondary text-sm py-2 px-4">Cancel</button>
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Gallery Management</h1>
          <p className="text-primary-300 mt-1">Manage gallery images</p>
        </div>
        <Link
          to="/admin/gallery/new"
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus /> Add New Image
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-card p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface text-primary-300 hover:bg-primary-700'
            }`}
          >
            All ({images.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'active'
                ? 'bg-primary text-white'
                : 'bg-surface text-primary-300 hover:bg-primary-700'
            }`}
          >
            Active ({images.filter((i) => i.isActive).length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'inactive'
                ? 'bg-primary text-white'
                : 'bg-surface text-primary-300 hover:bg-primary-700'
            }`}
          >
            Inactive ({images.filter((i) => !i.isActive).length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === cat
                  ? 'bg-primary text-white'
                  : 'bg-surface text-primary-300 hover:bg-primary-700'
              }`}
            >
              {cat} ({images.filter((i) => i.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-card p-12 text-center">
          <FaImage className="w-16 h-16 text-primary-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">No Images Found</h3>
          <p className="text-primary-300 mb-6">Start by adding your first gallery image</p>
          <Link to="/admin/gallery/new" className="btn-primary inline-flex items-center gap-2">
            <FaPlus /> Add Image
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image._id}
              className="bg-white rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
            >
              <div className="relative aspect-square">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {image.isActive ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <FaEye /> Active
                    </span>
                  ) : (
                    <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <FaEyeSlash /> Inactive
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary mb-1 truncate">{image.title}</h3>
                <p className="text-sm text-primary-300 mb-2">{image.category}</p>
                {image.description && (
                  <p className="text-sm text-primary-300 mb-3 line-clamp-2">
                    {image.description}
                  </p>
                )}
                <div className="flex gap-2">
                  <Link
                    to={`/admin/gallery/edit/${image._id}`}
                    className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => setConfirmDelete(image._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryList;
