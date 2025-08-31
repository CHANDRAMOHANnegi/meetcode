"use client"
import React, { useState } from 'react';
import { ArrowLeft, Clock, Zap, BookOpen, Code, Target, Image, ExternalLink, Edit3, Save, X } from 'lucide-react';
import { Subtopic, Topic } from '@/types';
import { algorithmData } from '@/data/algo.data';
import { HomePage } from '@/components/home/home';
import { TopicPage } from '@/components/topic/topic';
import { ArticlePage } from '@/components/article-page/article-page';

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'topic' | 'article'>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
  
  const handleTopicSelect = (topicId: string) => {
    const topic = algorithmData.topics.find(t => t.id === topicId);
    if (topic) {
      setSelectedTopic(topic);
      setCurrentView('topic');
    }
  };
  
  const handleSubtopicSelect = (subtopicId: string) => {
    if (selectedTopic) {
      const subtopic = selectedTopic.subtopics.find(s => s.id === subtopicId);
      if (subtopic) {
        setSelectedSubtopic(subtopic);
        setCurrentView('article');
      }
    }
  };
  
  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedTopic(null);
    setSelectedSubtopic(null);
  };
  
  const handleBackToTopic = () => {
    setCurrentView('topic');
    setSelectedSubtopic(null);
  };
  
  if (currentView === 'home') {
    return <HomePage onTopicSelect={handleTopicSelect} />;
  }
  
  if (currentView === 'topic' && selectedTopic) {
    return (
      <TopicPage 
        topic={selectedTopic} 
        onBack={handleBackToHome}
        onSubtopicSelect={handleSubtopicSelect}
      />
    );
  }
  
  if (currentView === 'article' && selectedTopic && selectedSubtopic) {
    return (
      <ArticlePage 
        topic={selectedTopic}
        subtopic={selectedSubtopic}
        onBack={handleBackToTopic}
      />
    );
  }
  
  return null;
};

export default App;