import { useEffect, useState } from "react";
import { listTickets } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function Dashboard() {
    const nav = useNavigate();
    useEffect(() => {
        if (!isAuthenticated()) nav("/auth/login");
    }, []);
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        setTickets(listTickets());
    }, []);
    const totals = {
        total: tickets.length,
        open: tickets.filter((t) => t.status === "open").length,
        in_progress: tickets.filter((t) => t.status === "in_progress").length,
        closed: tickets.filter((t) => t.status === "closed").length,
    };

  return (
    <div>
        <h2>Dashboard</h2>
        <div className="grid" style={{ marginTop: 12 }}>
            <div className="card">
                <div className="stat">{totals.total}</div>
                <div className="muted">Total tickets</div>
            </div>
            <div className="card">
                <div className="stat">{totals.open}</div>
                <div className="muted">Open</div>
            </div>
            <div className="card">
                <div className="stat">{totals.in_progress}</div>
                <div className="muted">In Progress</div>
            </div>
            <div className="card">
                <div className="stat">{totals.closed}</div>
                <div className="muted">Resolved</div>
            </div>
        </div>
        <div style={{ marginTop: 20 }}>
            <button className="btn" onClick={() => nav("/tickets")}>
                Manage Tickets
            </button>
        </div>
    </div>
  );
}
