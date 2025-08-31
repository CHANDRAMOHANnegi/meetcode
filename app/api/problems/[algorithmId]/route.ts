
// src/app/api/problems/[algorithmId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, handleDatabaseError } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { algorithmId: string } }
) {
  try {
    const problems = await DatabaseService.getAlgorithmProblems(params.algorithmId);
    return NextResponse.json({ success: true, data: problems });
  } catch (error) {
    return NextResponse.json(handleDatabaseError(error), { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { algorithmId: string } }
) {
  try {
    const body = await request.json();
    
    const problemLink = await DatabaseService.createProblemLink({
      ...body,
      algorithmId: params.algorithmId,
    });

    return NextResponse.json({ success: true, data: problemLink });
  } catch (error) {
    return NextResponse.json(handleDatabaseError(error), { status: 500 });
  }
}