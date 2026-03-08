import { useState, useEffect } from 'react';
import api from '../../services/api';

const Leaves = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '',
        start_date: '',
        end_date: '',
    });

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const response = await api.get('/leaves');
            setLeaves(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/leaves', formData);
            fetchLeaves();
            setShowForm(false);
            setFormData({ user_id: '', start_date: '', end_date: '' });
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/leaves/${id}`, { status: newStatus });
            fetchLeaves();
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette demande?')) {
            try {
                await api.delete(`/leaves/${id}`);
                fetchLeaves();
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
    };

    const statusColors = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Approved': 'bg-green-100 text-green-800',
        'Refused': 'bg-red-100 text-red-800',
    };

    if (loading) return <div className="p-6">Chargement...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Congés</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {showForm ? 'Annuler' : '+ Demander'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="number"
                            placeholder="Utilisateur ID"
                            value={formData.user_id}
                            onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="date"
                            value={formData.start_date}
                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="date"
                            value={formData.end_date}
                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Enregistrer
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leaves.map((leave) => (
                    <div key={leave.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-lg font-bold">Congé #{leave.id}</span>
                            <span className={`px-2 py-1 rounded text-xs ${statusColors[leave.status]}`}>
                                {leave.status}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-2">Utilisateur: {leave.user_id}</p>
                        <p className="text-gray-600 mb-4">
                            Du {leave.start_date} au {leave.end_date}
                        </p>
                        <div className="flex justify-between items-center">
                            <select
                                value={leave.status}
                                onChange={(e) => handleStatusChange(leave.id, e.target.value)}
                                className="text-sm border rounded p-1"
                            >
                                <option value="Pending">En attente</option>
                                <option value="Approved">Approuvé</option>
                                <option value="Refused">Refusé</option>
                            </select>
                            <button
                                onClick={() => handleDelete(leave.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaves;

