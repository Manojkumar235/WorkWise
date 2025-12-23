import React, { useState } from 'react';
import JobSearch from '../../components/Jobs/JobSearch';
import JobDetailModal from '../../components/Jobs/JobDetailModal';

const JobSearchPage = () => {
    const [selectedJobId, setSelectedJobId] = useState(null);

    const handleJobSelect = (job) => {
        setSelectedJobId(job.id);
    };

    const handleCloseModal = () => {
        setSelectedJobId(null);
    };

    const handleJobUpdated = () => {
        // Job was updated, could refresh the list if needed
        setSelectedJobId(null);
    };

    return (
        <div className="dashboard-page">
             <header className="page-header">
                <h1>Find Work Opportunities</h1>
                <p>Search and filter jobs based on your skills and location.</p>
            </header>
            <JobSearch onJobSelect={handleJobSelect} />
            {selectedJobId && (
                <JobDetailModal 
                    jobId={selectedJobId} 
                    onClose={handleCloseModal}
                    onJobUpdated={handleJobUpdated}
                />
            )}
        </div>
    );
};

export default JobSearchPage;