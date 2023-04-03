
import './App.css';
import Dashboard from './components/dashboardpage/Dashboard';
import LoginPage from './components/loginpage/LoginPage';
import RegisterPage from './components/registerpage/RegisterPage';

function App() {
  return (
    <div className="App">
    <Dashboard/>
    <RegisterPage/>
    <LoginPage/>
    </div>
  );
}

export default App;
