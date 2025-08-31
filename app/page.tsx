"use client"
import React, { useState } from 'react';
import { ArrowLeft, Clock, Zap, BookOpen, Code, Target, Image, ExternalLink, Edit3, Save, X } from 'lucide-react';

// Types
interface AlgorithmImage {
  id: string;
  title: string;
  description: string;
  category: 'diagram' | 'notes' | 'example' | 'cheatsheet';
  url: string;
}

interface ProblemLink {
  title: string;
  url: string;
  platform: 'leetcode' | 'hackerrank' | 'codeforces' | 'geeksforgeeks';
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
}

interface PersonalNotes {
  keyInsights: string[];
  personalTricks: string[];
  mistakesMade: string[];
  interviewTips: string[];
  generalNotes: string;
  masteryLevel: 'learning' | 'practicing' | 'confident' | 'interview-ready';
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  lastReviewed: string;
}

interface Subtopic {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeComplexity: string;
  spaceComplexity: string;
  category: string;
  problemsSolved: string[];
  images: AlgorithmImage[];
  problemLinks: ProblemLink[];
  article: {
    overview: string;
    algorithm: string;
    implementation: string;
    examples: string[];
    commonMistakes: string[];
  };
}

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  subtopics: Subtopic[];
}

// Enhanced Data with Images and Problem Links
const algorithmData: { topics: Topic[] } = {
  topics: [
    {
      id: "graph",
      title: "Graph Algorithms",
      description: "Master graph traversal, shortest paths, and connectivity algorithms",
      difficulty: "medium",
      estimatedTime: "2-3 weeks",
      subtopics: [
        {
          id: "dfs",
          title: "Depth-First Search",
          difficulty: "easy",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          category: "Traversal",
          problemsSolved: [
            "Find connected components",
            "Detect cycles in graphs",
            "Path finding in mazes",
            "Topological sorting"
          ],
          images: [
            {
              id: "dfs-1",
              title: "DFS Tree Traversal",
              description: "Hand-drawn example of DFS on a binary tree",
              category: "diagram",
              url: "/images/graph/dfs-diagram.jpg"
            },
            {
              id: "dfs-2",
              title: "DFS vs BFS Notes",
              description: "My comparison notes between DFS and BFS",
              category: "notes",
              url: "/images/graph/dfs-comparison-notes.jpg"
            }
          ],
          problemLinks: [
            {
              title: "Number of Islands",
              url: "https://leetcode.com/problems/number-of-islands/",
              platform: "leetcode",
              difficulty: "medium",
              description: "Classic DFS problem for finding connected components"
            },
            {
              title: "Path Sum",
              url: "https://leetcode.com/problems/path-sum/",
              platform: "leetcode", 
              difficulty: "easy",
              description: "Tree DFS to find if path with target sum exists"
            },
            {
              title: "Course Schedule",
              url: "https://leetcode.com/problems/course-schedule/",
              platform: "leetcode",
              difficulty: "medium",
              description: "Cycle detection using DFS"
            }
          ],
          article: {
            overview: "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (either explicitly or through recursion) to keep track of vertices to visit next.",
            algorithm: "1. Start at a source vertex and mark it as visited\n2. For each unvisited neighbor, recursively apply DFS\n3. Backtrack when no unvisited neighbors remain\n4. Continue until all reachable vertices are visited",
            implementation: `function dfs(graph: number[][], start: number): number[] {\n  const visited = new Set<number>();\n  const result: number[] = [];\n  \n  function dfsHelper(vertex: number) {\n    visited.add(vertex);\n    result.push(vertex);\n    \n    for (const neighbor of graph[vertex]) {\n      if (!visited.has(neighbor)) {\n        dfsHelper(neighbor);\n      }\n    }\n  }\n  \n  dfsHelper(start);\n  return result;\n}`,
            examples: [
              "Finding all nodes in a connected component",
              "Checking if a path exists between two nodes"
            ],
            commonMistakes: [
              "Forgetting to mark vertices as visited",
              "Not handling disconnected components"
            ]
          }
        },
        {
          id: "bfs",
          title: "Breadth-First Search",
          difficulty: "easy",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          category: "Traversal",
          problemsSolved: [
            "Find shortest path in unweighted graphs",
            "Level-order traversal",
            "Find minimum steps to reach target"
          ],
          images: [
            {
              id: "bfs-1",
              title: "BFS Queue Visualization",
              description: "Step-by-step BFS execution with queue operations",
              category: "diagram",
              url: "/images/graph/bfs-queue-diagram.jpg"
            }
          ],
          problemLinks: [
            {
              title: "Binary Tree Level Order Traversal",
              url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
              platform: "leetcode",
              difficulty: "medium",
              description: "Classic BFS application for level-order traversal"
            },
            {
              title: "Rotting Oranges",
              url: "https://leetcode.com/problems/rotting-oranges/",
              platform: "leetcode",
              difficulty: "medium", 
              description: "Multi-source BFS problem"
            }
          ],
          article: {
            overview: "Breadth-First Search (BFS) explores vertices level by level, visiting all neighbors of a vertex before moving to vertices at the next level. It uses a queue to maintain the order of exploration.",
            algorithm: "1. Start at source vertex, add to queue and mark as visited\n2. While queue is not empty:\n   - Dequeue a vertex\n   - For each unvisited neighbor, mark as visited and enqueue\n3. Continue until queue is empty",
            implementation: `function bfs(graph: number[][], start: number): number[] {\n  const visited = new Set<number>();\n  const queue: number[] = [start];\n  const result: number[] = [];\n  \n  visited.add(start);\n  \n  while (queue.length > 0) {\n    const vertex = queue.shift()!;\n    result.push(vertex);\n    \n    for (const neighbor of graph[vertex]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  \n  return result;\n}`,
            examples: [
              "Finding shortest path in unweighted graph",
              "Level-order tree traversal"
            ],
            commonMistakes: [
              "Using stack instead of queue",
              "Not marking vertices as visited when enqueueing"
            ]
          }
        }
      ]
    }
  ]
};

// Utility functions for personal notes
const getPersonalNotes = (algorithmId: string): PersonalNotes => {
  const stored = localStorage.getItem(`notes-${algorithmId}`);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    keyInsights: [],
    personalTricks: [],
    mistakesMade: [],
    interviewTips: [],
    generalNotes: '',
    masteryLevel: 'learning',
    difficultyRating: 3,
    lastReviewed: new Date().toISOString().split('T')[0]
  };
};

const savePersonalNotes = (algorithmId: string, notes: PersonalNotes) => {
  localStorage.setItem(`notes-${algorithmId}`, JSON.stringify(notes));
};

// Components
const DifficultyBadge: React.FC<{ difficulty: string }> = ({ difficulty }) => {
  const colors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[difficulty as keyof typeof colors]}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
};

const PlatformBadge: React.FC<{ platform: string }> = ({ platform }) => {
  const colors = {
    leetcode: 'bg-orange-100 text-orange-800',
    hackerrank: 'bg-green-100 text-green-800',
    codeforces: 'bg-blue-100 text-blue-800',
    geeksforgeeks: 'bg-purple-100 text-purple-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[platform as keyof typeof colors]}`}>
      {platform}
    </span>
  );
};

const PersonalNotesSection: React.FC<{ 
  algorithmId: string;
  subtopic: Subtopic;
}> = ({ algorithmId, subtopic }) => {
  const [notes, setNotes] = useState<PersonalNotes>(() => getPersonalNotes(algorithmId));
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'structured' | 'general'>('structured');

  const handleSave = () => {
    savePersonalNotes(algorithmId, { ...notes, lastReviewed: new Date().toISOString().split('T')[0] });
    setIsEditing(false);
  };

  const addToList = (field: keyof Pick<PersonalNotes, 'keyInsights' | 'personalTricks' | 'mistakesMade' | 'interviewTips'>, value: string) => {
    if (value.trim()) {
      setNotes(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const removeFromList = (field: keyof Pick<PersonalNotes, 'keyInsights' | 'personalTricks' | 'mistakesMade' | 'interviewTips'>, index: number) => {
    setNotes(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-blue-600" />
          My Personal Notes
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Last reviewed: {notes.lastReviewed}</span>
          {isEditing ? (
            <div className="flex gap-2">
              <button onClick={handleSave} className="text-green-600 hover:text-green-700">
                <Save className="w-4 h-4" />
              </button>
              <button onClick={() => setIsEditing(false)} className="text-gray-600 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-700">
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mastery Level */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Mastery Level:</label>
        <select
          value={notes.masteryLevel}
          onChange={(e) => setNotes(prev => ({ ...prev, masteryLevel: e.target.value as any }))}
          disabled={!isEditing}
          className="border rounded px-3 py-1 text-sm disabled:bg-gray-100"
        >
          <option value="learning">🌱 Learning</option>
          <option value="practicing">🔄 Practicing</option>
          <option value="confident">✅ Confident</option>
          <option value="interview-ready">🎯 Interview Ready</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b">
        <button
          onClick={() => setActiveTab('structured')}
          className={`pb-2 px-1 text-sm font-medium ${activeTab === 'structured' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          Structured Notes
        </button>
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-2 px-1 text-sm font-medium ${activeTab === 'general' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          General Notes
        </button>
      </div>

      {activeTab === 'structured' ? (
        <div className="space-y-4">
          {/* Key Insights */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">💡 Key Insights</h4>
            <div className="space-y-2">
              {notes.keyInsights.map((insight, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded border">
                  <span className="flex-1 text-sm">{insight}</span>
                  {isEditing && (
                    <button onClick={() => removeFromList('keyInsights', idx)} className="text-red-500 hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <input
                  type="text"
                  placeholder="Add new insight..."
                  className="w-full p-2 border rounded text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToList('keyInsights', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* Personal Tricks */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">🎯 Personal Tricks</h4>
            <div className="space-y-2">
              {notes.personalTricks.map((trick, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded border">
                  <span className="flex-1 text-sm">{trick}</span>
                  {isEditing && (
                    <button onClick={() => removeFromList('personalTricks', idx)} className="text-red-500 hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <input
                  type="text"
                  placeholder="Add personal trick..."
                  className="w-full p-2 border rounded text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToList('personalTricks', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* Mistakes Made */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">⚠️ Mistakes I Made</h4>
            <div className="space-y-2">
              {notes.mistakesMade.map((mistake, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded border">
                  <span className="flex-1 text-sm">{mistake}</span>
                  {isEditing && (
                    <button onClick={() => removeFromList('mistakesMade', idx)} className="text-red-500 hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <input
                  type="text"
                  placeholder="Add mistake you made..."
                  className="w-full p-2 border rounded text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToList('mistakesMade', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <textarea
            value={notes.generalNotes}
            onChange={(e) => setNotes(prev => ({ ...prev, generalNotes: e.target.value }))}
            disabled={!isEditing}
            placeholder="Write your general thoughts, observations, and notes here..."
            className="w-full h-32 p-3 border rounded resize-none disabled:bg-gray-100 text-sm"
          />
        </div>
      )}
    </div>
  );
};

const HomePage: React.FC<{ onTopicSelect: (topicId: string) => void }> = ({ onTopicSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">LeetCode Learning Hub</h1>
          <p className="text-gray-600 mt-1">Master algorithms and data structures</p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-6">
          {algorithmData.topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onTopicSelect(topic.id)}
              className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h2>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {topic.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {topic.subtopics.length} algorithms
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  <DifficultyBadge difficulty={topic.difficulty} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const TopicPage: React.FC<{ 
  topic: Topic; 
  onBack: () => void; 
  onSubtopicSelect: (subtopicId: string) => void;
}> = ({ topic, onBack, onSubtopicSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Topics
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
          <p className="text-gray-600 mt-1">{topic.description}</p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {topic.subtopics.map((subtopic) => (
            <div
              key={subtopic.id}
              onClick={() => onSubtopicSelect(subtopic.id)}
              className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{subtopic.title}</h3>
                <DifficultyBadge difficulty={subtopic.difficulty} />
              </div>
              
              <div className="space-y-3">
                <div className="text-sm text-gray-500">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {subtopic.category}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-3 h-3" />
                    {subtopic.timeComplexity}
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Zap className="w-3 h-3" />
                    {subtopic.spaceComplexity}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Image className="w-3 h-3" />
                    {subtopic.images.length} images
                  </div>
                  <div className="flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    {subtopic.problemLinks.length} problems
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const ArticlePage: React.FC<{ 
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