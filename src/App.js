import { useCookies } from 'react-cookie';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './user/Dashboard';
import EditUser from './user/EditUser';
import Login from './user/Login';
import Registration from './user/Registration';

function App() {
  const [cookie] = useCookies();

  function RequireAuth({ children, redirectTo }) {
    return cookie.LOGIN_TOKEN ? children : <Navigate to={redirectTo} />;
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Registration />} />
          <Route path='login' element={<Login />} />
          <Route
            path='dashboard'
            element={
              <RequireAuth redirectTo='/login'>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path='edit'
            element={
              <RequireAuth redirectTo='/login'>
                <EditUser />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
