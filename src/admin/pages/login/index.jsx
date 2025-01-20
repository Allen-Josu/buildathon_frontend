import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/userStore';
import ToastNotification from '../../../modals/Toast';


const BASE_URL = import.meta.env.VITE_URL;

export default function AdminLogin() {
    const [data, setData] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [toastOpen, setToastOpen] = useState(false); // State for toast visibility
    const [toastMessage, setToastMessage] = useState(''); // State for toast message
    const navigate = useNavigate();
    const setAdmin = useAuthStore((state) => state.setAdmin);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${BASE_URL}/users/login?role=admin`, data);
            setAdmin(response.data.results);
            setToastMessage('Login successful!'); // Set toast message
            setToastOpen(true); // Show toast notification
            setTimeout(() => navigate(`/department`), 2000); // Navigate after 2 seconds, the duration of the toast
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Login failed. Please check your credentials and try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div
                style={{
                    backgroundColor: '#27272A',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                }}
            >
                <div
                    className="card shadow-lg"
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                        backgroundColor: '#ffffff',
                        borderRadius: '15px',
                        padding: '2rem',
                    }}
                >
                    <h2
                        className="text-center pb-4"
                        style={{
                            fontSize: '1.75rem',
                            fontWeight: 'bold',
                            color: '#6d28d9',
                        }}
                    >
                        Login
                    </h2>
                    {error && (
                        <div
                            className="alert alert-danger"
                            style={{
                                fontSize: '0.875rem',
                                marginBottom: '1rem',
                                borderRadius: '8px',
                                padding: '0.75rem',
                            }}
                        >
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="studentId"
                                className="form-label"
                                style={{ fontWeight: '500', color: '#333' }}
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                value={data.username}
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                                style={{
                                    backgroundColor: '#f9f9f9',
                                    border: '2px solid #6d28d9',
                                    borderRadius: '8px',
                                    padding: '0.75rem',
                                    fontSize: '1rem',
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="form-label"
                                style={{ fontWeight: '500', color: '#333' }}
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                autoComplete="current-password"
                                id="password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                style={{
                                    backgroundColor: '#f9f9f9',
                                    border: '2px solid #6d28d9',
                                    borderRadius: '8px',
                                    padding: '0.75rem',
                                    fontSize: '1rem',
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn w-100 mt-4"
                            style={{
                                backgroundColor: '#6d28d9',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Toast Notification Component */}
            <ToastNotification open={toastOpen} setOpen={setToastOpen} message={toastMessage} />
        </div>
    );
}
