// Types
export type AlgorithmImage = {
    id: string;
    title: string;
    description: string;
    category: 'diagram' | 'notes' | 'example' | 'cheatsheet';
    url: string;
}

export type ProblemLink = {
    title: string;
    url: string;
    platform: 'leetcode' | 'hackerrank' | 'codeforces' | 'geeksforgeeks';
    difficulty: 'easy' | 'medium' | 'hard';
    description: string;
}

export type PersonalNotes = {
    keyInsights: string[];
    personalTricks: string[];
    mistakesMade: string[];
    interviewTips: string[];
    generalNotes: string;
    masteryLevel: 'learning' | 'practicing' | 'confident' | 'interview-ready';
    difficultyRating: 1 | 2 | 3 | 4 | 5;
    lastReviewed: string;
}

export type Subtopic = {
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

export type Topic = {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedTime: string;
    subtopics: Subtopic[];
}