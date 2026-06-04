import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaGlobe, FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getAllBrands, deleteBrand } from '../../../services/brandService';
import { useData } from '../../../contexts/DataContext';
import Spinner from '../../../components/loaders/Spinner';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const { invalidateAndRefresh } = useData();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await getAllBrands({}, { _skipCache: true });
      setBrands(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch brands');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const id = confirmDelete;
    setConfirmDelete(null);
    try {
      await deleteBrand(id);
      toast.success('Brand deleted successfully');
      await invalidateAndRefresh(['brands', 'brandList'])
      setBrands(prev => prev.filter(b => b._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete brand');
    }
  };

  const filteredBrands = brands.filter((brand) => {
    if (filter === 'all') return true;
    if (filter === 'active') return brand.isActive;
    if (filter === 'inactive') return !brand.isActive;
    return true;
  });

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
                <h3 className="font-semibold text-primary">Delete Brand</h3>
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
          <h1 className="text-2xl font-bold text-primary">Brand Management</h1>
          <p className="text-primary-300 mt-1">Manage brand partners</p>
        </div>
        <Link
          to="/admin/brands/new"
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus /> Add New Brand
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
            All ({brands.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'active'
                ? 'bg-primary text-white'
                : 'bg-surface text-primary-300 hover:bg-primary-700'
            }`}
          >
            Active ({brands.filter((b) => b.isActive).length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'inactive'
                ? 'bg-primary text-white'
                : 'bg-surface text-primary-300 hover:bg-primary-700'
            }`}
          >
            Inactive ({brands.filter((b) => !b.isActive).length})
          </button>
        </div>
      </div>

      {/* Brands Grid */}
      {filteredBrands.length === 0 ? (
        <div className="bg-white rounded-lg shadow-card p-12 text-center">
          <FaGlobe className="w-16 h-16 text-primary-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">No Brands Found</h3>
          <p className="text-primary-300 mb-6">Start by adding your first brand</p>
          <Link to="/admin/brands/new" className="btn-primary inline-flex items-center gap-2">
            <FaPlus /> Add Brand
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
            >
              <div className="relative aspect-video bg-surface flex items-center justify-center p-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute top-2 right-2">
                  {brand.isActive ? (
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
                <h3 className="font-semibold text-primary mb-1 truncate">{brand.name}</h3>
                {brand.country && (
                  <p className="text-sm text-primary-300 mb-2">{brand.country}</p>
                )}
                {brand.description && (
                  <p className="text-sm text-primary-300 mb-3 line-clamp-2">
                    {brand.description}
                  </p>
                )}
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gold hover:underline mb-3 block truncate"
                  >
                    {brand.website}
                  </a>
                )}
                <div className="flex gap-2 mt-3">
                  <Link
                    to={`/admin/brands/edit/${brand._id}`}
                    className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => setConfirmDelete(brand._id)}
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

export default BrandList;
