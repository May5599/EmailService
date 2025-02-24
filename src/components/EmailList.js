import { useState, useEffect } from 'react';

export default function EmailList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div className="bg-gray-900 text-white shadow-lg p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Scheduled Emails</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="bg-gray-800 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-lg font-medium">Job ID: {job.id}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  job.status === 'completed'
                    ? 'bg-green-500 text-white'
                    : job.status === 'failed'
                    ? 'bg-red-500 text-white'
                    : 'bg-yellow-500 text-white'
                }`}
              >
                {job.status}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              <p>{`Scheduled for: ${job.scheduledTime}`}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
