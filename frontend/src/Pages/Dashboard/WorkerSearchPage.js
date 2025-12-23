import React from 'react';
import { useToast } from '../../context/ToastContext';
import WorkerSearch from '../../features/workers/components/WorkerSearch';

const WorkerSearchPage = () => {
    const toast = useToast();

    const handleWorkerSelect = (worker) => {
        // TODO: Navigate to worker profile when implemented
        toast.info(`Worker profile for ${worker.name} - Coming soon!`);
    };

    return (
        <div className="dashboard-page">
            <header className="page-header">
                <h1>Find Workers</h1>
                <p>Search and filter workers based on skills, location, and ratings.</p>
            </header>
            <WorkerSearch onWorkerSelect={handleWorkerSelect} />
        </div>
    );
};

export default WorkerSearchPage;

