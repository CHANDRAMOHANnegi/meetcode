
// src/app/api/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, handleDatabaseError } from '@/lib/db';

export async function GET() {
  try {
    const stats = await DatabaseService.getAlgorithmStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json(handleDatabaseError(error), { status: 500 });
  }
}