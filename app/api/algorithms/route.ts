// src/app/api/algorithms/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, handleDatabaseError } from '@/lib/db';

export async function GET() {
  try {
    const topics = await DatabaseService.getAllTopics();
    return NextResponse.json({ success: true, data: topics });
  } catch (error) {
    return NextResponse.json(handleDatabaseError(error), { status: 500 });
  }
}

