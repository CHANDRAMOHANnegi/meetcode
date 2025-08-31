

// src/app/api/notes/[algorithmId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, handleDatabaseError } from '@/lib/db';
import { CreatePersonalNoteRequest } from '@/lib/types';

export async function GET(
    request: NextRequest,
    { params }: { params: { algorithmId: string } }
) {
    try {
        const notes = await DatabaseService.getPersonalNotes(params.algorithmId);
        return NextResponse.json({ success: true, data: notes });
    } catch (error) {
        return NextResponse.json(handleDatabaseError(error), { status: 500 });
    }
}



export async function POST(
    request: NextRequest,
    { params }: { params: { algorithmId: string } }
) {
    try {
        const body: CreatePersonalNoteRequest = await request.json();

        // Validate required fields
        if (!body.masteryLevel || typeof body.difficultyRating !== 'number') {
            return NextResponse.json(
                { success: false, error: 'Invalid request data' },
                { status: 400 }
            );
        }

        const notes = await DatabaseService.createOrUpdatePersonalNotes(
            params.algorithmId,
            {
                keyInsights: body.keyInsights || [],
                personalTricks: body.personalTricks || [],
                mistakesMade: body.mistakesMade || [],
                interviewTips: body.interviewTips || [],
                generalNotes: body.generalNotes || '',
                masteryLevel: body.masteryLevel,
                difficultyRating: body.difficultyRating,
            }
        );

        return NextResponse.json({ success: true, data: notes });
    } catch (error) {
        return NextResponse.json(handleDatabaseError(error), { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { algorithmId: string } }
) {
    try {
        await DatabaseService.deletePersonalNotes(params.algorithmId);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(handleDatabaseError(error), { status: 500 });
    }
}