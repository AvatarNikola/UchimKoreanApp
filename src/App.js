import React, { useState, useEffect } from 'react';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Profile from './components/Profile/Profile';
import Stats from './components/Stats/Stats';
import Quiz from './components/Quiz/Quiz';
import Practice from './pages/Practice/Practice';
import Settings from './components/Settings/Settings';
import Lessons from './components/Lessons/Lessons';
import Vocabulary from './components/Vocabulary/Vocabulary';
import Flashcards from './components/Flashcards/Flashcards';
import DialogueSim from './components/DialogueSim/DialogueSim';
import AudioTraining from './components/AudioTraining/AudioTraining';
import { getUserProgress } from './utils/progressUtils';

function AppInner() {
  const [currentPage, setCurrentPage] = useState('home');
  const [progress, setProgress] = useState(getUserProgress());

  useEffect(() => {
    setProgress(getUserProgress());
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':       return <Home onPageChange={setCurrentPage} />;
      case 'lessons':    return <Lessons />;
      case 'practice':   return <Practice />;
      case 'quiz':       return <Quiz />;
      case 'vocabulary': return <Vocabulary />;
      case 'flashcards': return <Flashcards />;
      case 'dialogue':   return <DialogueSim />;
      case 'audio':      return <AudioTraining />;
      case 'profile':    return <Profile />;
      case 'stats':      return <Stats />;
      case 'settings':   return <Settings />;
      default:           return <Home onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="App-main">
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

export default App;