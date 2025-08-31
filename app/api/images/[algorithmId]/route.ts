

// src/app/api/images/[algorithmId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, handleDatabaseError } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { algorithmId: string } }
) {
  try {
    const images = await DatabaseService.getAlgorithmImages(params.algorithmId);
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    return NextResponse.json(handleDatabaseError(error), { status: 500 });
  }
}
