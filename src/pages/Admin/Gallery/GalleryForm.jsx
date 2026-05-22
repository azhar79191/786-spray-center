import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaArrowLeft, FaImage } from 'react-icons/fa'
import { toast } from 'react-toastify'
import {
  createGalleryImage,
  updateGalleryImage,
  getGalleryImageById,
} from '../../../services/galleryService';
import { useData } from '../../../contexts/DataContext';
import { clearCacheByType } from '../../../utils/cacheUtils';
import Spinner from '../../../components/loaders/Spinner';

const GalleryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { refreshData } = useData();

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: 'Other',
    order: 0,
    isActive: true,
  });

  const categories = ['Products', 'Store', 'Events', 'Team', 'Other'];

  useEffect(() => {
    if (isEditMode) {
      fetchImage();
    }
  }, [id]);

  const fetchImage = async () => {
    try {
      setFetchLoading(true);
      const response = await getGalleryImageById(id);
      const imageData = response.data;
      setFormData({
        title: imageData.title || '',
        description: imageData.description || '',
        image: imageData.image || '',
        category: imageData.category || 'Other',
        order: imageData.order || 0,
        isActive: imageData.isActive !== undefined ? imageData.isActive : true,
      });
      setImagePreview(imageData.image || '');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch image');
      navigate('/admin/gallery');
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

  const handleImageChange = (e) => {
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
      toast.error('Image size should not exceed 5MB');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData((prev) => ({ ...prev, image: base64String }));
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!formData.image) {
      toast.error('Image is required');
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await updateGalleryImage(id, formData);
        toast.success('Image updated successfully');
      } else {
        await createGalleryImage(formData);
        toast.success('Image created successfully');
      }
      
      // Clear gallery caches
      clearCacheByType('gallery');
      await refreshData('gallery');
      
      navigate('/admin/gallery');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save image');
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
          onClick={() => navigate('/admin/gallery')}
          className="p-2 hover:bg-surface rounded-lg transition-colors"
        >
          <FaArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-primary">
            {isEditMode ? 'Edit Gallery Image' : 'Add New Gallery Image'}
          </h1>
          <p className="text-primary-300 mt-1">
            {isEditMode ? 'Update image details' : 'Upload a new image to gallery'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-card p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter image title"
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
                className="input-field"
                placeholder="Enter image description (optional)"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
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
                className="input-field"
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

          {/* Right Column - Image Upload */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Image <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-primary-200 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <label className="btn-secondary cursor-pointer inline-block">
                    <FaImage className="inline mr-2" />
                    Change Image
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <FaImage className="w-16 h-16 text-primary-300 mx-auto mb-4" />
                  <p className="text-primary-300 mb-2">Click to upload image</p>
                  <p className="text-xs text-primary-300">
                    JPEG, PNG, or WEBP (Max 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
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
            onClick={() => navigate('/admin/gallery')}
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
                {isEditMode ? 'Update Image' : 'Create Image'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryForm;
