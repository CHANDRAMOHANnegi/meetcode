import { PersonalNotes } from "@/types";

// Utility functions for personal notes
export const getPersonalNotes = (algorithmId: string): PersonalNotes => {
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

export const savePersonalNotes = (algorithmId: string, notes: PersonalNotes) => {
    localStorage.setItem(`notes-${algorithmId}`, JSON.stringify(notes));
};
