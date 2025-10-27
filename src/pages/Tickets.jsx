import { useEffect, useState } from 'react';
import { listTickets, createTicket, updateTicket, deleteTicket, validateTicket } from '../utils/storage';
import { isAuthenticated } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

function TicketForm({initial, onSave, onCancel}){
  const [data,setData]=useState(initial||{title:'',status:'open',description:''});
  const [errors,setErrors]=useState({});
  function change(k,v){ setData(d=>({...d,[k]:v})); }
  function submit(e){ e.preventDefault(); const errs = validateTicket(data); setErrors(errs); if(Object.keys(errs).length===0){ onSave(data);} }
  return (
    <form onSubmit={submit} className="card">
      <div className="form-row"><label>Title</label><input className="input" value={data.title} onChange={e=>change('title',e.target.value)} /><div className="error">{errors.title}</div></div>
      <div className="form-row"><label>Status</label>
        <select className="select" value={data.status} onChange={e=>change('status',e.target.value)}>
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </select>
        <div className="error">{errors.status}</div>
      </div>
      <div className="form-row"><label>Description</label><textarea className="textarea" value={data.description} onChange={e=>change('description',e.target.value)} rows={4} /></div>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button className="btn" type="submit">Save</button>
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default function Tickets(){
  const nav = useNavigate();
  useEffect(()=>{ if(!isAuthenticated()) nav('/auth/login'); },[]);
  const [tickets,setTickets]=useState([]);
  const [editing,setEditing]=useState(null);
  const [creating,setCreating]=useState(false);
  const [toast,setToast]=useState(null);

  function refresh(){ setTickets(listTickets()); }
  useEffect(()=>{ refresh(); },[]);

  async function handleCreate(data){ try{ createTicket(data); setToast('Ticket created'); setCreating(false); refresh(); }catch(e){ setToast('Failed to create ticket'); } }
  async function handleUpdate(data){ try{ updateTicket(editing.id,data); setToast('Ticket updated'); setEditing(null); refresh(); }catch(e){ setToast('Failed to update ticket'); } }
  async function handleDelete(id){ if(!confirm('Delete this ticket?')) return; try{ deleteTicket(id); setToast('Ticket deleted'); refresh(); }catch(e){ setToast('Failed to delete ticket'); } }

  return (
    <div>
      <h2>Tickets</h2>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <button className="btn" onClick={()=>setCreating(true)}>New Ticket</button>
      </div>
      {creating && <TicketForm onSave={handleCreate} onCancel={()=>setCreating(false)} />}
      {editing && <TicketForm initial={editing} onSave={handleUpdate} onCancel={()=>setEditing(null)} />}
      <div className="tickets-list" style={{marginTop:12}}>
        {tickets.length===0 && <div className="card">No tickets yet.</div>}
        {tickets.map(t=> (
          <div key={t.id} className="card ticket">
            <div style={{flex:1,textAlign:'left'}}>
              <div style={{fontWeight:700}}>{t.title}</div>
              <div style={{color:'var(--muted)'}}>{t.description}</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,alignItems:'flex-end'}}>
              <div className={`tag ${t.status}`}>{t.status}</div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn" onClick={()=>setEditing(t)}>Edit</button>
                <button className="btn" onClick={()=>handleDelete(t.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toast msg={toast} onClose={()=>setToast(null)} />
    </div>
  );
}
