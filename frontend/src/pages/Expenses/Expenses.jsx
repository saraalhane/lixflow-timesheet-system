import { useState, useEffect } from 'react';
import api from '../../services/api';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        user_id: '',
    });

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await api.get('/expenses');
            setExpenses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/expenses', formData);
            fetchExpenses();
            setShowForm(false);
            setFormData({ amount: '', description: '', user_id: '' });
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/expenses/${id}`, { status: newStatus });
            fetchExpenses();
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense?')) {
            try {
                await api.delete(`/expenses/${id}`);
                fetchExpenses();
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

    const totalAmount = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

    if (loading) return <div className="p-6">Chargement...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Dépenses</h1>
                    <p className="text-gray-600 mt-1">Total: <span className="font-bold">{totalAmount} €</span></p>
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
                            placeholder="Montant (€)"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="border p-2 rounded"
                            required
                            step="0.01"
                        />
                        <input
                            type="number"
                            placeholder="Utilisateur ID"
                            value={formData.user_id}
                            onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
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
                {expenses.map((expense) => (
                    <div key={expense.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-2xl font-bold">{expense.amount} €</span>
                            <span className={`px-2 py-1 rounded text-xs ${statusColors[expense.status]}`}>
                                {expense.status}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-2">Utilisateur: {expense.user_id}</p>
                        <p className="text-gray-600 mb-4">{expense.description || 'Aucune description'}</p>
                        <div className="flex justify-between items-center">
                            <select
                                value={expense.status}
                                onChange={(e) => handleStatusChange(expense.id, e.target.value)}
                                className="text-sm border rounded p-1"
                            >
                                <option value="Pending">En attente</option>
                                <option value="Approved">Approuvé</option>
                                <option value="Refused">Refusé</option>
                            </select>
                            <button
                                onClick={() => handleDelete(expense.id)}
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

export default Expenses;

