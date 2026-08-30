import React, { useState, useEffect } from 'react';

const TicketForm = ({ ticket, users, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Open',
        priority: 'Medium',
        assignedTo: ''
    });

    useEffect(() => {
        if (ticket) {
            setFormData({
                title: ticket.title || '',
                description: ticket.description || '',
                status: ticket.status || 'Open',
                priority: ticket.priority || 'Medium',
                assignedTo: ticket.assignedTo?._id || ''
            });
        }
    }, [ticket]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="user-form glass" style={{ marginBottom: '32px', padding: '32px', borderRadius: '24px' }}>
            <h2 style={{ marginBottom: '24px', fontSize: '22px' }}>{ticket ? 'Edit Ticket' : 'Create New Ticket'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Ticket Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Fix login bug on mobile"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the issue..."
                        required
                    />
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Priority</label>
                        <select name="priority" value={formData.priority} onChange={handleChange} className="search-bar" style={{ width: '100%', padding: '14px', background: 'rgba(15, 23, 42, 0.6)', color: 'white', border: '1px solid var(--surface-border)', borderRadius: '12px' }}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="search-bar" style={{ width: '100%', padding: '14px', background: 'rgba(15, 23, 42, 0.6)', color: 'white', border: '1px solid var(--surface-border)', borderRadius: '12px' }}>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Assign To</label>
                        <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="search-bar" style={{ width: '100%', padding: '14px', background: 'rgba(15, 23, 42, 0.6)', color: 'white', border: '1px solid var(--surface-border)', borderRadius: '12px' }}>
                            <option value="">Unassigned</option>
                            {users.map(u => (
                                <option key={u._id} value={u._id}>{u.name} ({u.profession})</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-actions" style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                        {ticket ? 'Update Ticket' : 'Save Ticket'}
                    </button>
                    <button type="button" className="btn btn-logout" onClick={onCancel} style={{ flex: 1 }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TicketForm;
