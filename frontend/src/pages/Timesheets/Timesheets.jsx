import { useState, useEffect } from 'react';
import api from '../../services/api';

const Timesheets = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '',
        task_id: '',
        hours: '',
        date: '',
    });

    useEffect(() => {
        fetchTimesheets();
    }, []);

    const fetchTimesheets = async () => {
        try {
            const response = await api.get('/timesheets');
            setTimesheets(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/timesheets', formData);
            fetchTimesheets();
            setShowForm(false);
            setFormData({ user_id: '', task_id: '', hours: '', date: '' });
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette entrée?')) {
            try {
                await api.delete(`/timesheets/${id}`);
                fetchTimesheets();
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
    };

    const totalHours = timesheets.reduce((sum, t) => sum + parseFloat(t.hours || 0), 0);

    if (loading) return <div className="p-6">Chargement...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Feuilles de temps</h1>
                    <p className="text-gray-600 mt-1">Total heures: <span className="font-bold">{totalHours}h</span></p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {showForm ? 'Annuler' : '+ Ajouter'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Utilisateur ID"
                            value={formData.user_id}
                            onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Tâche ID"
                            value={formData.task_id}
                            onChange={(e) => setFormData({ ...formData, task_id: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Heures"
                            value={formData.hours}
                            onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                            className="border p-2 rounded"
                            required
                            step="0.5"
                        />
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Enregistrer
                    </button>
                </form>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Utilisateur</th>
                            <th className="p-3 text-left">Tâche</th>
                            <th className="p-3 text-left">Heures</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timesheets.map((timesheet) => (
                            <tr key={timesheet.id} className="border-t">
                                <td className="p-3">{timesheet.id}</td>
                                <td className="p-3">{timesheet.user_id}</td>
                                <td className="p-3">{timesheet.task_id}</td>
                                <td className="p-3">{timesheet.hours}h</td>
                                <td className="p-3">{timesheet.date}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleDelete(timesheet.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Timesheets;

