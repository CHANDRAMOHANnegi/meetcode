// src/app/api/algorithms/[algorithmId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, handleDatabaseError } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { algorithmId: string } }
) {
  try {
    const algorithm = await DatabaseService.getAlgorithmById(params.algorithmId);
    
    if (!algorithm) {
      return NextResponse.json(
        { success: false, error: 'Algorithm not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: algorithm });
  } catch (error) {
    return NextResponse.json(handleDatabaseError(error), { status: 500 });
  }
}
