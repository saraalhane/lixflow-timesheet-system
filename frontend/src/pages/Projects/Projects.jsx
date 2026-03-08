import { useState, useEffect } from 'react';
import api from '../../services/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        team_id: '',
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects');
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects', formData);
            fetchProjects();
            setShowForm(false);
            setFormData({ name: '', description: '', team_id: '' });
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
            try {
                await api.delete(`/projects/${id}`);
                fetchProjects();
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
    };

    if (loading) return <div className="p-6">Chargement...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Projets</h1>
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
                            placeholder="Nom du projet"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Team ID"
                            value={formData.team_id}
                            onChange={(e) => setFormData({ ...formData, team_id: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
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
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                        <p className="text-gray-600 mb-4">{project.description || 'Aucune description'}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Équipe: {project.team_id}</span>
                            <button
                                onClick={() => handleDelete(project.id)}
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

export default Projects;

