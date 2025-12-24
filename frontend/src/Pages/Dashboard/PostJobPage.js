import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostJob from '../../features/jobs/components/PostJob';

const PostJobPage = () => {
    const navigate = useNavigate();

    const handleJobPosted = (jobData) => {
        // Navigate to the job detail page or my jobs
        if (jobData.jobId) {
            navigate(`/dashboard/jobs/${jobData.jobId}`);
        } else {
            navigate('/dashboard/my-jobs');
        }
    };

    const handleCancel = () => {
        navigate('/dashboard/home');
    };

    return (
        <div className="dashboard-page">
            <header className="page-header">
                <h1>Post a New Job</h1>
                <p>Fill out the form below to post a job and find the right workers.</p>
            </header>
            <PostJob onJobPosted={handleJobPosted} onCancel={handleCancel} />
        </div>
    );
};

export default PostJobPage;
