// src/lib/types.ts
export interface AlgorithmImage {
  id: number;
  title: string;
  description: string;
  category: 'diagram' | 'notes' | 'example' | 'cheatsheet';
  filename: string;
  url: string;
  algorithmId: string;
  uploadedAt: Date;
}

export interface ProblemLink {
  id: number;
  title: string;
  url: string;
  platform: 'leetcode' | 'hackerrank' | 'codeforces' | 'geeksforgeeks';
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  algorithmId: string;
  createdAt: Date;
}

export interface PersonalNote {
  id: number;
  keyInsights: string[];
  personalTricks: string[];
  mistakesMade: string[];
  interviewTips: string[];
  generalNotes: string;
  masteryLevel: 'learning' | 'practicing' | 'confident' | 'interview-ready';
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  lastReviewed: Date;
  algorithmId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Algorithm {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeComplexity: string;
  spaceComplexity: string;
  category: string;
  problemsSolved: string[];
  articleContent: {
    overview: string;
    algorithm: string;
    implementation: string;
    examples: string[];
    commonMistakes: string[];
  };
  topicId: string;
  personalNotes?: PersonalNote;
  images: AlgorithmImage[];
  problemLinks: ProblemLink[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  algorithms: Algorithm[];
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CreatePersonalNoteRequest {
  keyInsights: string[];
  personalTricks: string[];
  mistakesMade: string[];
  interviewTips: string[];
  generalNotes: string;
  masteryLevel: 'learning' | 'practicing' | 'confident' | 'interview-ready';
  difficultyRating: 1 | 2 | 3 | 4 | 5;
}

export interface UploadImageRequest {
  algorithmId: string;
  title: string;
  description: string;
  category: 'diagram' | 'notes' | 'example' | 'cheatsheet';
}

// Seed Data Types (from your JSON)
export interface SeedAlgorithm {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeComplexity: string;
  spaceComplexity: string;
  category: string;
  problemsSolved: string[];
  images: {
    id: string;
    title: string;
    description: string;
    category: 'diagram' | 'notes' | 'example' | 'cheatsheet';
    url: string;
  }[];
  problemLinks: {
    title: string;
    url: string;
    platform: 'leetcode' | 'hackerrank' | 'codeforces' | 'geeksforgeeks';
    difficulty: 'easy' | 'medium' | 'hard';
    description: string;
  }[];
  article: {
    overview: string;
    algorithm: string;
    implementation: string;
    examples: string[];
    commonMistakes: string[];
  };
}

export interface SeedTopic {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  subtopics: SeedAlgorithm[];
}