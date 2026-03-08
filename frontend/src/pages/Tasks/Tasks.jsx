import { useState, useEffect } from 'react';
import api from '../../services/api';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        project_id: '',
        user_id: '',
        status: 'To Do',
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tasks', formData);
            fetchTasks();
            setShowForm(false);
            setFormData({ title: '', description: '', project_id: '', user_id: '', status: 'To Do' });
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/tasks/${id}`, { status: newStatus });
            fetchTasks();
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche?')) {
            try {
                await api.delete(`/tasks/${id}`);
                fetchTasks();
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
    };

    const statusColors = {
        'To Do': 'bg-gray-100 text-gray-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Done': 'bg-green-100 text-green-800',
    };

    if (loading) return <div className="p-6">Chargement...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Tâches</h1>
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
                            type="text"
                            placeholder="Titre"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Projet ID"
                            value={formData.project_id}
                            onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Utilisateur ID"
                            value={formData.user_id}
                            onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="border p-2 rounded"
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="border p-2 rounded col-span-2"
                            rows="3"
                        />
                    </div>
                    <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Enregistrer
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">{task.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs ${statusColors[task.status]}`}>
                                {task.status}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4">{task.description || 'Aucune description'}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Projet: {task.project_id}</span>
                            <div className="space-x-2">
                                <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    className="text-sm border rounded p-1"
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;

