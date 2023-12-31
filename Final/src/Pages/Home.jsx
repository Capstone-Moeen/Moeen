import React from 'react'
import Nav from '../Components/Nav'
import MapComponent from '../Components/MapComponent'
import EasyLayout from '../Components/EasyLayout'

function Home() {

  const LayoutMode = () => {
    const easyMode = localStorage.getItem('easy');
    return { easyMode };
  };

  const { easyMode } = LayoutMode();

  

  // const [easyMode, setEasyMode] = React.useState(localStorage.getItem('easy'));

  // React.useEffect(() => {
  //   setEasyMode(localStorage.getItem('easy'));
  // }, [localStorage.getItem('easy')]);

  // const [easyMode, setEasyMode] = React.useState(() => localStorage.getItem('easy'));

  // const [easyMode, setEasyMode] = React.useState(localStorage.getItem('easy') === 'true');

  // React.useEffect(() => {
  //   const handleStorageChange = () => {
  //     // Update the state when storage changes
  //     setEasyMode(localStorage.getItem('easy') === 'true');
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);
  

  return (
    <>
    {easyMode ? 
      <EasyLayout />
    :
      <div className='h-screen overflow-hidden'>
      <Nav></Nav>
      <MapComponent></MapComponent>
      </div>
    }
    
    </>
  )
}

export default Home