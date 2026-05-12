import { useState } from 'react';
import { FaStar, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { submitTestimonial } from '../../services/testimonialService';

/**
 * Testimonial Form Component
 * Allows users to submit feedback and testimonials
 */
const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    message: '',
    productUsed: '',
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your feedback');
      return;
    }
    if (formData.message.trim().length < 10) {
      toast.error('Feedback must be at least 10 characters long');
      return;
    }

    try {
      setLoading(true);
      await submitTestimonial(formData);
      toast.success('Thank you for your feedback! It will be reviewed and published soon.');
      
      // Reset form
      setFormData({
        name: '',
        location: '',
        rating: 5,
        message: '',
        productUsed: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2">Share Your Experience</h3>
        <p className="text-primary-300">
          We'd love to hear about your experience with our products and services
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-primary-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Enter your name"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-primary mb-2">
            Location (Optional)
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-primary-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g., Karachi, Pakistan"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <FaStar
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || formData.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-primary-300 self-center">
              ({formData.rating} {formData.rating === 1 ? 'star' : 'stars'})
            </span>
          </div>
        </div>

        {/* Product Used */}
        <div>
          <label htmlFor="productUsed" className="block text-sm font-medium text-primary mb-2">
            Product/Service Used (Optional)
          </label>
          <input
            type="text"
            id="productUsed"
            name="productUsed"
            value={formData.productUsed}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-primary-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g., Pesticide, Fertilizer, Consultation"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
            Your Feedback <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-3 border border-primary-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            placeholder="Share your experience with us..."
          />
          <p className="text-xs text-primary-300 mt-1">
            Minimum 10 characters ({formData.message.length}/10)
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <FaPaperPlane />
              Submit Feedback
            </>
          )}
        </button>

        <p className="text-xs text-primary-300 text-center">
          Your feedback will be reviewed before being published on our website
        </p>
      </form>
    </div>
  );
};

export default TestimonialForm;
