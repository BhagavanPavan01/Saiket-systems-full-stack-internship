import React from 'react';

const TicketList = ({ tickets, onEdit, onDelete, onStatusChange }) => {
    if (!tickets || tickets.length === 0) {
        return (
            <div className="no-users glass">
                <p>No tickets found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="tickets-grid">
            {tickets.map((ticket, index) => (
                <div key={ticket._id || `ticket-${index}`} className="ticket-card glass">
                    <div className="ticket-header">
                        <span className={`badge status-${ticket.status.replace(' ', '').toLowerCase()}`}>
                            {ticket.status}
                        </span>
                        <span className={`badge priority-${ticket.priority.toLowerCase()}`}>
                            {ticket.priority}
                        </span>
                    </div>

                    <h3 className="ticket-title">{ticket.title}</h3>
                    <p className="ticket-desc">{ticket.description}</p>

                    <div className="ticket-footer">
                        <span>Assigned: {ticket.assignedTo?.name || 'Unassigned'}</span>
                        <span>By: {ticket.createdBy?.name || 'Unknown'}</span>
                    </div>

                    <div className="ticket-actions">
                        <select
                            value={ticket.status}
                            onChange={(e) => onStatusChange(ticket._id, e.target.value)}
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <button className="btn btn-edit" onClick={() => onEdit(ticket)}>Edit</button>
                        <button className="btn btn-delete" onClick={() => onDelete(ticket._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TicketList;
