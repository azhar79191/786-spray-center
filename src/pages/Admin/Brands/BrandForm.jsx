import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  createBrand,
  updateBrand,
  getBrandById,
} from '../../../services/brandService';
import { useData } from '../../../contexts/DataContext';
import Spinner from '../../../components/loaders/Spinner';

const BrandForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { invalidateAndRefresh } = useData();

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [logoPreview, setLogoPreview] = useState('');
  const [logoChanged, setLogoChanged] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    website: '',
    country: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    if (isEditMode) {
      fetchBrand();
    }
  }, [id]);

  const fetchBrand = async () => {
    try {
      setFetchLoading(true);
      const response = await getBrandById(id);
      const brandData = response.data;
      setFormData({
        name: brandData.name || '',
        description: brandData.description || '',
        logo: brandData.logo || '',
        website: brandData.website || '',
        country: brandData.country || '',
        order: brandData.order || 0,
        isActive: brandData.isActive !== undefined ? brandData.isActive : true,
      });
      setLogoPreview(brandData.logo || '');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch brand');
      navigate('/admin/brands');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPEG, PNG, or WEBP)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Logo size should not exceed 5MB');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData((prev) => ({ ...prev, logo: base64String }));
      setLogoPreview(base64String);
      setLogoChanged(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Brand name is required');
      return;
    }

    if (!formData.logo && !isEditMode) {
      toast.error('Brand logo is required');
      return;
    }

    try {
      setLoading(true);

      // Only include logo in payload if it was changed (avoids sending huge base64 on every edit)
      const payload = { ...formData };
      if (isEditMode && !logoChanged) {
        delete payload.logo;
      }

      if (isEditMode) {
        await updateBrand(id, payload);
        toast.success('Brand updated successfully');
      } else {
        await createBrand(payload);
        toast.success('Brand created successfully');
      }
      
      await invalidateAndRefresh(['brands', 'brandList'])
      navigate('/admin/brands');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save brand');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/brands')}
          className="p-2 hover:bg-surface rounded-lg transition-colors"
        >
          <FaArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-primary">
            {isEditMode ? 'Edit Brand' : 'Add New Brand'}
          </h1>
          <p className="text-primary-300 mt-1">
            {isEditMode ? 'Update brand details' : 'Add a new brand partner'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-card p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Brand Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="Enter brand name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="Enter brand description (optional)"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Website URL
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="Enter country"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Display Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="0"
              />
              <p className="text-xs text-primary-300 mt-1">
                Lower numbers appear first
              </p>
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-primary focus:ring-gold rounded"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-primary">
                Active (visible on website)
              </label>
            </div>
          </div>

          {/* Right Column - Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Brand Logo <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-primary-200 rounded-lg p-6 text-center">
              {logoPreview ? (
                <div className="space-y-4">
                  <div className="bg-surface rounded-lg p-4 flex items-center justify-center" style={{ minHeight: '200px' }}>
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="max-w-full max-h-48 object-contain"
                    />
                  </div>
                  <label className="btn-secondary cursor-pointer inline-block">
                    <FaImage className="inline mr-2" />
                    Change Logo
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <FaImage className="w-16 h-16 text-primary-300 mx-auto mb-4" />
                  <p className="text-primary-300 mb-2">Click to upload logo</p>
                  <p className="text-xs text-primary-300">
                    JPEG, PNG, or WEBP (Max 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/admin/brands')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? (
              <>
                <Spinner size="sm" />
                Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                {isEditMode ? 'Update Brand' : 'Create Brand'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandForm;
