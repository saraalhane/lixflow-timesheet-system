import { useState, useEffect } from 'react';
import api from '../../services/api';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role_id: '',
        manager_id: '',
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await api.get('/employees');
            setEmployees(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/employees', formData);
            fetchEmployees();
            setShowForm(false);
            setFormData({ name: '', email: '', password: '', role_id: '', manager_id: '' });
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet employé?')) {
            try {
                await api.delete(`/employees/${id}`);
                fetchEmployees();
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
    };

    if (loading) return <div className="p-6">Chargement...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Employés</h1>
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
                            placeholder="Nom"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Role ID"
                            value={formData.role_id}
                            onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
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
                            <th className="p-3 text-left">Nom</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id} className="border-t">
                                <td className="p-3">{employee.id}</td>
                                <td className="p-3">{employee.name}</td>
                                <td className="p-3">{employee.email}</td>
                                <td className="p-3">{employee.role?.name || 'N/A'}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleDelete(employee.id)}
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

export default Employees;

