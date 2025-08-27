import { Routes, Route } from 'react-router-dom';
import Home from './components/HomePage';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Users from './components/Users';
import UserTodos from './components/UserTodos';
import UserForm from "./components/UserForm";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user-todos/:userId" element={<UserTodos />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
