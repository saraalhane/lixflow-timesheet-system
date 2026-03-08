import { useState, useEffect } from 'react';
import api from '../../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        employees: 0,
        projects: 0,
        tasks: 0,
        timesheets: 0,
        leaves: 0,
        expenses: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/dashboard');
                setStats(response.data);
            } catch (error) {
                console.error('Erreur:', error);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Employés', value: stats.employees, color: 'bg-blue-500' },
        { title: 'Projets', value: stats.projects, color: 'bg-green-500' },
        { title: 'Tâches', value: stats.tasks, color: 'bg-yellow-500' },
        { title: 'Timesheets', value: stats.timesheets, color: 'bg-purple-500' },
        { title: 'Congés', value: stats.leaves, color: 'bg-orange-500' },
        { title: 'Dépenses', value: stats.expenses, color: 'bg-red-500' },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className={`${card.color} text-white rounded-lg p-6 shadow-lg`}>
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                        <p className="text-4xl font-bold mt-2">{card.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

