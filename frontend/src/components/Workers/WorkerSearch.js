import React, { useState, useEffect } from 'react';
import { userAPI, skillAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const WorkerSearch = ({ onWorkerSelect }) => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    skill: '',
    city: '',
    state: '',
    category: '',
    minRating: '',
    isSeasonal: false,
    isAvailable: true
  });
  const [currentLocation, setCurrentLocation] = useState(null);

  const skillCategories = [
    'CONSTRUCTION', 'ELECTRICAL', 'PLUMBING', 'CARPENTRY', 'PAINTING',
    'FARMING', 'CROP_HARVESTING', 'LIVESTOCK', 'IRRIGATION',
    'CLEANING', 'COOKING', 'CHILDCARE', 'GARDENING',
    'RETAIL_ASSISTANCE', 'DELIVERY', 'PHOTOGRAPHY', 'DRIVING'
  ];

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await userAPI.getByType('WORKER');
      setWorkers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to fetch workers');
      console.error('Error fetching workers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError('');

    try {
      let filteredWorkers = [];

      if (searchFilters.skill) {
        const response = await userAPI.getWorkersBySkill(searchFilters.skill);
        filteredWorkers = Array.isArray(response.data) ? response.data : [];
      } else {
        const response = await userAPI.getByType('WORKER');
        filteredWorkers = Array.isArray(response.data) ? response.data : [];
      }

      // Apply additional filters
      if (searchFilters.city) {
        filteredWorkers = filteredWorkers.filter(w => 
          w.city && w.city.toLowerCase().includes(searchFilters.city.toLowerCase())
        );
      }

      if (searchFilters.state) {
        filteredWorkers = filteredWorkers.filter(w => 
          w.state && w.state.toLowerCase().includes(searchFilters.state.toLowerCase())
        );
      }

      if (searchFilters.minRating) {
        filteredWorkers = filteredWorkers.filter(w => 
          w.trustScore && w.trustScore >= parseFloat(searchFilters.minRating)
        );
      }

      if (searchFilters.isSeasonal) {
        filteredWorkers = filteredWorkers.filter(w => w.isSeasonalWorker === true);
      }

      if (searchFilters.isAvailable) {
        filteredWorkers = filteredWorkers.filter(w => 
          w.availabilityStatus !== false
        );
      }

      setWorkers(filteredWorkers);
    } catch (err) {
      setError('Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: value
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          searchNearbyWorkers(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location');
        }
      );
    }
  };

  const searchNearbyWorkers = async (lat, lng, radius = 10) => {
    setLoading(true);
    try {
      const response = await userAPI.getNearbyWorkers(lat, lng, radius);
      setWorkers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to search nearby workers');
    } finally {
      setLoading(false);
    }
  };

  const getRatingStars = (rating) => {
    if (!rating) return 'No rating';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return '⭐'.repeat(fullStars) + (hasHalfStar ? '½' : '') + ` ${rating.toFixed(1)}`;
  };

  return (
    <div className="worker-search-container">
      <div className="search-header">
        <h2>Find Workers</h2>
        <p>Discover skilled workers in your area</p>
      </div>

      {/* Search Filters */}
      <div className="search-filters">
        <div className="filter-row">
          <div className="filter-group">
            <input
              type="text"
              name="skill"
              value={searchFilters.skill}
              onChange={handleFilterChange}
              placeholder="Search by skill (e.g., farming, electrical)"
            />
          </div>

          <div className="filter-group">
            <input
              type="text"
              name="city"
              value={searchFilters.city}
              onChange={handleFilterChange}
              placeholder="City"
            />
          </div>

          <div className="filter-group">
            <input
              type="text"
              name="state"
              value={searchFilters.state}
              onChange={handleFilterChange}
              placeholder="State"
            />
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <input
              type="number"
              name="minRating"
              value={searchFilters.minRating}
              onChange={handleFilterChange}
              placeholder="Min Rating (0-5)"
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          <div className="filter-group checkbox-filters">
            <label>
              <input
                type="checkbox"
                name="isAvailable"
                checked={searchFilters.isAvailable}
                onChange={handleFilterChange}
              />
              Available Only
            </label>

            <label>
              <input
                type="checkbox"
                name="isSeasonal"
                checked={searchFilters.isSeasonal}
                onChange={handleFilterChange}
              />
              Seasonal Workers
            </label>
          </div>
        </div>

        <div className="filter-actions">
          <button onClick={handleSearch} className="btn-search">
            🔍 Search Workers
          </button>
          <button onClick={getCurrentLocation} className="btn-location">
            📍 Workers Near Me
          </button>
          <button onClick={fetchWorkers} className="btn-clear">
            Clear Filters
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Workers List */}
      <div className="workers-container">
        {loading ? (
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <p>Searching for workers...</p>
          </div>
        ) : workers.length === 0 ? (
          <div className="no-workers">
            <h3>No workers found</h3>
            <p>Try adjusting your search filters or check back later.</p>
          </div>
        ) : (
          <div className="workers-grid">
            {workers.map(worker => (
              <div key={worker.id} className="worker-card">
                <div className="worker-card-header">
                  <div className="worker-avatar">
                    <div className="avatar-placeholder-small">
                      {worker.userType === 'WORKER' ? '👷' : '🤝'}
                    </div>
                  </div>
                  <div className="worker-basic-info">
                    <h3 className="worker-name">{worker.name}</h3>
                    {worker.trustScore && (
                      <div className="worker-rating">
                        {getRatingStars(worker.trustScore)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="worker-card-body">
                  <div className="worker-info">
                    {worker.email && (
                      <div className="info-item">
                        <span className="icon">📧</span>
                        <span>{worker.email}</span>
                      </div>
                    )}

                    {worker.phoneNumber && (
                      <div className="info-item">
                        <span className="icon">📞</span>
                        <span>{worker.phoneNumber}</span>
                      </div>
                    )}

                    {worker.city && (
                      <div className="info-item">
                        <span className="icon">📍</span>
                        <span>{worker.city}, {worker.state}</span>
                      </div>
                    )}

                    {worker.bio && (
                      <div className="worker-bio">
                        <p>{worker.bio.length > 100
                          ? `${worker.bio.substring(0, 100)}...`
                          : worker.bio}
                        </p>
                      </div>
                    )}

                    {worker.availabilityStatus !== false && (
                      <div className="availability-badge available">
                        ✅ Available
                      </div>
                    )}

                    {worker.isSeasonalWorker && (
                      <div className="seasonal-badge">
                        🌾 Seasonal Worker
                      </div>
                    )}
                  </div>
                </div>

                <div className="worker-card-footer">
                  <button
                    onClick={() => onWorkerSelect && onWorkerSelect(worker)}
                    className="btn-view-profile"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results Summary */}
      {!loading && workers.length > 0 && (
        <div className="results-summary">
          <p>Showing {workers.length} worker{workers.length !== 1 ? 's' : ''}</p>
        </div>
      )}
    </div>
  );
};

export default WorkerSearch;

