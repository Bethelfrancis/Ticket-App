import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { login, signup, isAuthenticated } from '../utils/auth';
import Toast from '../components/Toast';

export default function Auth(){
  const { mode } = useParams();
  const m = mode === 'signup' ? 'signup' : 'login';
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState(null);
  const [toast,setToast]=useState(null);
  const nav = useNavigate();

  if(isAuthenticated()){ nav('/dashboard'); }

  async function submit(e){
    e.preventDefault(); setError(null);
    if(!email) return setError('Email is required');
    if(!password) return setError('Password is required');
    try{
      if(m==='login') await login({email,password}); else await signup({email,password});
      setToast('Authenticated — redirecting...');
      setTimeout(()=>nav('/dashboard'),500);
    }catch(err){ setError(err.message || 'Failed to authenticate'); }
  }

  return (
    <div className="card" style={{maxWidth:520, margin:'24px auto'}}>
      <h2>{m==='login' ? 'Login' : 'Create account'}</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} aria-label="email" />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} aria-label="password" />
        </div>
        {error && <div className="error" role="alert">{error}</div>}
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button type="submit" className="btn">{m==='login' ? 'Login' : 'Sign up'}</button>
        </div>
      </form>
      <Toast msg={toast} onClose={()=>setToast(null)} />
    </div>
  );
}
