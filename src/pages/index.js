import {useEffect} from 'react';
import {useHistory} from '@docusaurus/router';

export default function Home() {
  const history = useHistory();
  
  useEffect(() => {
    // Redirect to Learning Dashboard on page load
    window.location.href = '/learning_dashboard.html';
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#050508',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{textAlign: 'center'}}>
        <div style={{fontSize: '2rem', marginBottom: '1rem'}}>🚀</div>
        <p>Redirecting to Learning Command Center...</p>
      </div>
    </div>
  );
}
