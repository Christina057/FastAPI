import React from 'react';
import SignUp from './components/Signup';
import Login from './components/Login';
import AddFlight from './components/Addflight';
import BookTicket from './components/Bookticket';
import MyBookings from './components/Mybookings';
import AllBookings from './components/Allbookings';
import Search from './components/Search';

function App() {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '20px'
  };

  const gridStyle2 = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px'
  };

  return (
    <div className="App">
      <h1>Flight Booking System</h1>
      <div style={gridStyle}>
        <SignUp />
        <Login />
        <AddFlight />
      </div>
      <div style={gridStyle2}>
        <BookTicket />
        <MyBookings />
        <AllBookings />
        <Search />
      </div>
    </div>
  );
}

export default App;
