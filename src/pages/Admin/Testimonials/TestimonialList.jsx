import { useState, useEffect } from 'react';
import { FaStar, FaCheck, FaTimes, FaTrash, FaFilter, FaAward, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  getAllTestimonials,
  approveTestimonial,
  deleteTestimonial,
} from '../../../services/testimonialService';
import { useData } from '../../../contexts/DataContext';
import Spinner from '../../../components/loaders/Spinner';
import { formatDate } from '../../../utils/helpers';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const { invalidateAndRefresh } = useData();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await getAllTestimonials({}, { _skipCache: true });
      setTestimonials(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, isApproved) => {
    if (!id) {
      toast.error('Invalid testimonial ID');
      return;
    }

    try {
      await approveTestimonial(id, { isApproved });
      toast.success(`Testimonial ${isApproved ? 'approved' : 'rejected'} successfully`);
      await invalidateAndRefresh(['testimonials'])
      fetchTestimonials();
    } catch (error) {
      console.error('Approve error:', error);
      toast.error(error.response?.data?.message || 'Failed to update testimonial');
    }
  };

  const handleFeature = async (id, isFeatured) => {
    if (!id) {
      toast.error('Invalid testimonial ID');
      return;
    }

    try {
      await approveTestimonial(id, { isApproved: true, isFeatured });
      toast.success(`Testimonial ${isFeatured ? 'featured' : 'unfeatured'} successfully`);
      await invalidateAndRefresh(['testimonials'])
      fetchTestimonials();
    } catch (error) {
      console.error('Feature error:', error);
      toast.error(error.response?.data?.message || 'Failed to update testimonial');
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const id = confirmDelete;
    setConfirmDelete(null);
    try {
      await deleteTestimonial(id);
      toast.success('Testimonial deleted successfully');
      await invalidateAndRefresh(['testimonials'])
      fetchTestimonials();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete testimonial');
    }
  };

  const filteredTestimonials = testimonials.filter((test) => {
    if (filter === 'all') return true;
    if (filter === 'approved') return test.isApproved;
    if (filter === 'pending') return !test.isApproved;
    if (filter === 'featured') return test.isFeatured;
    return true;
  });

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Delete Testimonial</h3>
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
          <h1 className="text-2xl font-bold text-primary">Testimonials & Feedback</h1>
          <p className="text-primary-300 mt-1">Manage customer testimonials and reviews</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FaFilter className="text-primary-300" />
          <span className="text-sm font-medium text-primary">Filter:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'pending', label: 'Pending Approval' },
            { key: 'approved', label: 'Approved' },
            { key: 'featured', label: 'Featured' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === item.key
                  ? 'bg-primary text-white'
                  : 'bg-surface text-primary-300 hover:bg-primary-700'
              }`}
            >
              {item.label} (
              {item.key === 'all'
                ? testimonials.length
                : item.key === 'pending'
                ? testimonials.filter((t) => !t.isApproved).length
                : item.key === 'approved'
                ? testimonials.filter((t) => t.isApproved).length
                : testimonials.filter((t) => t.isFeatured).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials List */}
      {filteredTestimonials.length === 0 ? (
        <div className="bg-white rounded-lg shadow-card p-12 text-center">
          <h3 className="text-xl font-semibold text-primary mb-2">No Testimonials Found</h3>
          <p className="text-primary-300">No testimonials match the selected filter</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTestimonials.map((testimonial) => {
            // Ensure testimonial has required fields
            if (!testimonial || !testimonial._id) {
              console.warn('Invalid testimonial object:', testimonial);
              return null;
            }

            return (
            <div
              key={testimonial._id}
              className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow relative"
            >
              {testimonial.isFeatured && (
                <div className="absolute top-4 right-4">
                  <FaAward className="w-6 h-6 text-gold" title="Featured" />
                </div>
              )}

              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{testimonial.name}</h3>
                    {testimonial.location && (
                      <p className="text-sm text-primary-300">{testimonial.location}</p>
                    )}
                  </div>
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-sm text-primary-300 mb-3">
                  {formatDate(testimonial.createdAt)}
                </p>
              </div>

              <p className="text-primary mb-4 italic">"{testimonial.message}"</p>

              {testimonial.productUsed && (
                <p className="text-sm text-primary-300 mb-4">
                  <strong>Product Used:</strong> {testimonial.productUsed}
                </p>
              )}

              <div className="flex items-center gap-2 pt-4 border-t">
                {!testimonial.isApproved ? (
                  <>
                    <button
                      onClick={() => handleApprove(testimonial._id, true)}
                      className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2"
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      onClick={() => setConfirmDelete(testimonial._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <FaTimes /> Reject
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleFeature(testimonial._id, !testimonial.isFeatured)}
                      className={`flex-1 text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        testimonial.isFeatured
                          ? 'bg-gray-500 hover:bg-gray-600 text-white'
                          : 'bg-gold hover:bg-gold/80 text-primary'
                      }`}
                    >
                      <FaAward /> {testimonial.isFeatured ? 'Unfeature' : 'Feature'}
                    </button>
                    <button
                      onClick={() => handleApprove(testimonial._id, false)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <FaTimes /> Unapprove
                    </button>
                    <button
                      onClick={() => setConfirmDelete(testimonial._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TestimonialList;
