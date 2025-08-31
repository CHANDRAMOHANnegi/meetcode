// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

// Global Prisma instance (singleton pattern)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database utility functions
export class DatabaseService {
  
  // Topics and Algorithms
  static async getAllTopics() {
    return await prisma.topic.findMany({
      include: {
        algorithms: {
          include: {
            personalNotes: true,
            images: true,
            problemLinks: true,
          }
        }
      }
    });
  }

  static async getTopicById(topicId: string) {
    return await prisma.topic.findUnique({
      where: { id: topicId },
      include: {
        algorithms: {
          include: {
            personalNotes: true,
            images: true,
            problemLinks: true,
          }
        }
      }
    });
  }

  static async getAlgorithmById(algorithmId: string) {
    return await prisma.algorithm.findUnique({
      where: { id: algorithmId },
      include: {
        personalNotes: true,
        images: true,
        problemLinks: true,
        topic: true,
      }
    });
  }

  // Personal Notes
  static async getPersonalNotes(algorithmId: string) {
    return await prisma.personalNote.findUnique({
      where: { algorithmId }
    });
  }

  static async createOrUpdatePersonalNotes(
    algorithmId: string, 
    noteData: {
      keyInsights: string[];
      personalTricks: string[];
      mistakesMade: string[];
      interviewTips: string[];
      generalNotes: string;
      masteryLevel: 'learning' | 'practicing' | 'confident' | 'interview-ready';
      difficultyRating: number;
    }
  ) {
    return await prisma.personalNote.upsert({
      where: { algorithmId },
      update: {
        ...noteData,
        lastReviewed: new Date(),
        updatedAt: new Date(),
      },
      create: {
        algorithmId,
        ...noteData,
        lastReviewed: new Date(),
      }
    });
  }

  static async deletePersonalNotes(algorithmId: string) {
    return await prisma.personalNote.delete({
      where: { algorithmId }
    });
  }

  // Images
  static async getAlgorithmImages(algorithmId: string) {
    return await prisma.algorithmImage.findMany({
      where: { algorithmId },
      orderBy: { uploadedAt: 'desc' }
    });
  }

  static async createAlgorithmImage(imageData: {
    title: string;
    description: string;
    category: 'diagram' | 'notes' | 'example' | 'cheatsheet';
    filename: string;
    url: string;
    algorithmId: string;
  }) {
    return await prisma.algorithmImage.create({
      data: imageData
    });
  }

  static async deleteAlgorithmImage(imageId: number) {
    return await prisma.algorithmImage.delete({
      where: { id: imageId }
    });
  }

  // Problem Links
  static async getAlgorithmProblems(algorithmId: string) {
    return await prisma.problemLink.findMany({
      where: { algorithmId },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async createProblemLink(problemData: {
    title: string;
    url: string;
    platform: 'leetcode' | 'hackerrank' | 'codeforces' | 'geeksforgeeks';
    difficulty: 'easy' | 'medium' | 'hard';
    description: string;
    algorithmId: string;
  }) {
    return await prisma.problemLink.create({
      data: problemData
    });
  }

  static async deleteProblemLink(problemId: number) {
    return await prisma.problemLink.delete({
      where: { id: problemId }
    });
  }

  // Seeding
  static async seedFromJson(topics: any[]) {
    for (const topicData of topics) {
      // Create topic
      const topic = await prisma.topic.upsert({
        where: { id: topicData.id },
        update: {
          title: topicData.title,
          description: topicData.description,
          difficulty: topicData.difficulty,
          estimatedTime: topicData.estimatedTime,
        },
        create: {
          id: topicData.id,
          title: topicData.title,
          description: topicData.description,
          difficulty: topicData.difficulty,
          estimatedTime: topicData.estimatedTime,
        }
      });

      // Create algorithms
      for (const algorithmData of topicData.subtopics) {
        const algorithm = await prisma.algorithm.upsert({
          where: { id: algorithmData.id },
          update: {
            title: algorithmData.title,
            difficulty: algorithmData.difficulty,
            timeComplexity: algorithmData.timeComplexity,
            spaceComplexity: algorithmData.spaceComplexity,
            category: algorithmData.category,
            problemsSolved: algorithmData.problemsSolved,
            articleContent: algorithmData.article,
          },
          create: {
            id: algorithmData.id,
            title: algorithmData.title,
            difficulty: algorithmData.difficulty,
            timeComplexity: algorithmData.timeComplexity,
            spaceComplexity: algorithmData.spaceComplexity,
            category: algorithmData.category,
            problemsSolved: algorithmData.problemsSolved,
            articleContent: algorithmData.article,
            topicId: topic.id,
          }
        });

        // Create images
        for (const imageData of algorithmData.images || []) {
          await prisma.algorithmImage.upsert({
            where: { 
              id: parseInt(imageData.id) || 0 // Handle string IDs from JSON
            },
            update: {
              title: imageData.title,
              description: imageData.description,
              category: imageData.category,
              url: imageData.url,
              filename: imageData.url.split('/').pop() || '',
            },
            create: {
              title: imageData.title,
              description: imageData.description,
              category: imageData.category,
              url: imageData.url,
              filename: imageData.url.split('/').pop() || '',
              algorithmId: algorithm.id,
            }
          });
        }

        // Create problem links
        for (const problemData of algorithmData.problemLinks || []) {
          await prisma.problemLink.create({
            data: {
              title: problemData.title,
              url: problemData.url,
              platform: problemData.platform,
              difficulty: problemData.difficulty,
              description: problemData.description,
              algorithmId: algorithm.id,
            }
          });
        }
      }
    }
  }

  // Utility methods
  static async getAlgorithmStats() {
    const totalAlgorithms = await prisma.algorithm.count();
    const totalNotes = await prisma.personalNote.count();
    const totalImages = await prisma.algorithmImage.count();
    const masteryLevels = await prisma.personalNote.groupBy({
      by: ['masteryLevel'],
      _count: { masteryLevel: true }
    });

    return {
      totalAlgorithms,
      totalNotes,
      totalImages,
      masteryLevels: masteryLevels.reduce((acc, item) => {
        acc[item.masteryLevel] = item._count.masteryLevel;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  static async searchAlgorithms(query: string) {
    return await prisma.algorithm.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
        ]
      },
      include: {
        personalNotes: true,
        images: true,
        problemLinks: true,
        topic: true,
      }
    });
  }
}

// Error handling utilities
export class DatabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export function handleDatabaseError(error: any): { success: false; error: string } {
  console.error('Database error:', error);
  
  if (error.code === 'P2002') {
    return { success: false, error: 'Duplicate entry found' };
  }
  
  if (error.code === 'P2025') {
    return { success: false, error: 'Record not found' };
  }
  
  return { 
    success: false, 
    error: error.message || 'Database operation failed' 
  };
}