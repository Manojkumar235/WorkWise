import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { jobAPI } from '../../services/api';

const MyJobsPage = () => {
    const [myJobs, setMyJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchMyJobs = async () => {
            if (!user) return;
            try {
                let response;
                if (user.userType === 'HIRER' || user.userType === 'BOTH') {
                    // This endpoint needs to exist in your api.js and backend
                    response = await jobAPI.getMyPostedJobs();
                } else {
                    // This endpoint also needs to exist
                    response = await jobAPI.getAssignedToMeJobs();
                }
                setMyJobs(response.data);
            } catch (err) {
                setError('Failed to fetch your jobs. Please ensure you have added the correct functions to api.js.');
                console.error("Error fetching user's jobs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyJobs();
    }, [user]);

    if (loading) return <p>Loading your jobs...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="dashboard-page">
            <header className="page-header">
                <h1>My Jobs</h1>
                <p>Track the status of your posted and assigned jobs.</p>
            </header>
            <div className="my-jobs-list">
                {myJobs.length > 0 ? (
                    myJobs.map(job => (
                        <div key={job.id} className="job-card-simple">
                            <h4>{job.title}</h4>
                            <p>Status: {job.status}</p>
                        </div>
                    ))
                ) : (
                    <p>You have no jobs to display.</p>
                )}
            </div>
        </div>
    );
};

export default MyJobsPage;