"use client"
import React, { useState } from 'react';
import { ArrowLeft, Clock, Zap, BookOpen, Code, Target, Image, ExternalLink, Edit3, Save, X } from 'lucide-react';
import { Subtopic, Topic } from '@/types';
import { DifficultyBadge, PlatformBadge } from '../badge/badge';
import { PersonalNotesSection } from '../notes/personalization';


export const ArticlePage: React.FC<{ 
  topic: Topic; 
  subtopic: Subtopic; 
  onBack: () => void;
}> = ({ topic, subtopic, onBack }) => {
  const [activeSection, setActiveSection] = useState<'article' | 'images' | 'problems' | 'notes'>('article');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {topic.title}
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{subtopic.title}</h1>
            <DifficultyBadge difficulty={subtopic.difficulty} />
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {subtopic.timeComplexity}
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              {subtopic.spaceComplexity}
            </div>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              {subtopic.category}
            </span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'article', label: 'Article', icon: BookOpen },
              { id: 'images', label: `Images (${subtopic.images.length})`, icon: Image },
              { id: 'problems', label: `Problems (${subtopic.problemLinks.length})`, icon: ExternalLink },
              { id: 'notes', label: 'My Notes', icon: Edit3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id as any)}
                className={`flex items-center gap-2 py-3 px-1 text-sm font-medium border-b-2 ${
                  activeSection === id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        {activeSection === 'article' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-8 space-y-8">
              {/* Overview */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">{subtopic.article.overview}</p>
              </section>
              
              {/* Problems Solved */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Problems It Solves</h2>
                </div>
                <ul className="space-y-2">
                  {subtopic.problemsSolved.map((problem, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 mt-1">•</span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </section>
              
              {/* Algorithm */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-900">How It Works</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-gray-700 whitespace-pre-line font-mono text-sm">
                    {subtopic.article.algorithm}
                  </pre>
                </div>
              </section>
              
              {/* Implementation */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-orange-600" />
                  <h2 className="text-xl font-semibold text-gray-900">TypeScript Implementation</h2>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-gray-100 text-sm">
                    <code>{subtopic.article.implementation}</code>
                  </pre>
                </div>
              </section>
              
              {/* Common Mistakes */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Common Mistakes</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <ul className="space-y-2">
                    {subtopic.article.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-red-700">
                        <span className="text-red-500 mt-1">⚠</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </div>
        )}

        {activeSection === 'images' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Images & Diagrams</h2>
            {subtopic.images.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {subtopic.images.map((image) => (
                  <div key={image.id} className="border rounded-lg p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Image className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Image: {image.title}</p>
                        <p className="text-xs text-gray-400">{image.url}</p>
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900">{image.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {image.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Image className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No images uploaded yet</p>
                <p className="text-sm">Add your handwritten diagrams to /public/images/graph/</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'problems' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Practice Problems</h2>
            <div className="space-y-4">
              {subtopic.problemLinks.map((problem, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{problem.title}</h3>
                    <div className="flex gap-2">
                      <PlatformBadge platform={problem.platform} />
                      <DifficultyBadge difficulty={problem.difficulty} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{problem.description}</p>
                  <a
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Solve Problem
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'notes' && (
          <PersonalNotesSection algorithmId={subtopic.id} subtopic={subtopic} />
        )}
      </main>
    </div>
  );
};