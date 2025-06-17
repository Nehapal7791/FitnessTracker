import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarView from './pages/CalendarView';
import WorkoutDetails from './pages/WorkoutDetails';
import DietPlan from './pages/DietPlan';
import ProgressTracker from './pages/ProgressTracker';
import Profile from './pages/Profile';
import Layout from './components/layout/Layout';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <CalendarView />
          </Layout>
        } />
        <Route path="/workout/:id" element={
          <Layout>
            <WorkoutDetails />
          </Layout>
        } />
        <Route path="/diet" element={
          <Layout>
            <DietPlan />
          </Layout>
        } />
        <Route path="/progress" element={
          <Layout>
            <ProgressTracker />
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout>
            <Profile />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;