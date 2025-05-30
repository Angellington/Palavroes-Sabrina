import './App.css'
import { Box } from '@mui/material';
import Actions from './components/actions'
import Historical from './components/historical'
import { useState } from 'react'

function App() {
  const [reloadKey, setReloadKey] = useState(0);

  const triggerReload = () => {
    setReloadKey(prev => prev + 1); // Muda o estado para forçar o Historical a recarregar
  };

  return (
    <Box 
      component={'section'} 
      sx={{ 
        padding: '20px', 
        backgroundColor: '#f0f0f0', 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '20px' 
      }}
    >
      <Actions onActionComplete={triggerReload} />
      <Historical key={reloadKey} />
    </Box>
  );
}

export default App;
