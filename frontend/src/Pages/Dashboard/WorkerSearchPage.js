import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkerSearch from '../../components/Workers/WorkerSearch';

const WorkerSearchPage = () => {
    const navigate = useNavigate();
    const [selectedWorker, setSelectedWorker] = useState(null);

    const handleWorkerSelect = (worker) => {
        // Navigate to worker profile or show details
        // For now, we can show an alert or navigate to a profile page
        console.log("Selected Worker:", worker);
        // TODO: Create worker profile page or modal
        alert(`Viewing profile of ${worker.name}`);
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

