import { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaEye, FaTrash, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  getAllServiceRequests,
  updateServiceRequestStatus,
  deleteServiceRequest,
} from '../../../services/serviceRequestService';
import Spinner from '../../../components/loaders/Spinner';
import { formatDate } from '../../../utils/helpers';

const ServiceRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await getAllServiceRequests();
      setRequests(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch service requests');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateServiceRequestStatus(id, status);
      toast.success('Status updated successfully');
      fetchRequests();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;

    try {
      await deleteServiceRequest(id);
      toast.success('Request deleted successfully');
      fetchRequests();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete request');
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const statusColors = {
    New: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Service Requests</h1>
          <p className="text-primary-300 mt-1">Manage customer service requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FaFilter className="text-primary-300" />
          <span className="text-sm font-medium text-primary">Filter by Status:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'New', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-surface text-primary-300 hover:bg-primary-700'
              }`}
            >
              {status === 'all' ? 'All' : status} (
              {status === 'all'
                ? requests.length
                : requests.filter((r) => r.status === status).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-card p-12 text-center">
          <h3 className="text-xl font-semibold text-primary mb-2">No Requests Found</h3>
          <p className="text-primary-300">No service requests match the selected filter</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-1">
                        {request.serviceType}
                      </h3>
                      <p className="text-sm text-primary-300">
                        {formatDate(request.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[request.status]
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-primary">
                      <strong>Name:</strong> {request.name}
                    </p>
                    <p className="text-primary flex items-center gap-2">
                      <FaPhone className="text-primary-300" />
                      {request.phone}
                    </p>
                    {request.email && (
                      <p className="text-primary flex items-center gap-2">
                        <FaEnvelope className="text-primary-300" />
                        {request.email}
                      </p>
                    )}
                    <p className="text-primary-300 mt-3">
                      <strong className="text-primary">Message:</strong> {request.message}
                    </p>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2">
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(request._id, e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="btn-secondary text-sm py-2 px-4 bg-red-500 hover:bg-red-600 text-white"
                  >
                    <FaTrash />
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

export default ServiceRequestList;
