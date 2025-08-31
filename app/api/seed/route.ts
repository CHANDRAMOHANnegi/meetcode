

// src/app/api/seed/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, handleDatabaseError } from '@/lib/db';
import seedData from '@/data/algorithms.json';

export async function POST() {
  try {
    await DatabaseService.seedFromJson(seedData.topics);
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully' 
    });
  } catch (error) {
    return NextResponse.json(handleDatabaseError(error), { status: 500 });
  }
}
