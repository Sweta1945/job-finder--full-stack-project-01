import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';

import React from 'react';
import HomePage from './components/HomePage';
import RecruiterPage from './components/RecruiterProfile';
import JobForm from './components/JobForm';
import JobDetail from './components/JobDetail';
import EditJob from './components/EditJob';

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          {/* Set the root URL route to render HomePage */}
          <Route exact path='/' element={<HomePage />} />

          {/* Define other routes */}
          <Route exact path='/homePage' element={<HomePage />} />
          <Route exact path='/register' element={<RegisterPage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/recruiterProfile' element={<RecruiterPage />} />
          <Route exact path='/jobForm' element={<JobForm />} />
          <Route exact path="/editJobForm/:jobId" element={<EditJob/>} />

          <Route exact path='/jobDetail/:jobId' element={<JobDetail />} />
          <Route exact path='/profile' element={<RecruiterPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
