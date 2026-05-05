import './App.css';
import Footer from './components/common/footer';
import MainForm from './components/common/mainForm';
import Navbar from './components/navigation/navbar';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MainForm />
      <Footer />
    </div>
  );
};

export default App;
