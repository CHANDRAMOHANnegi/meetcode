
// src/app/api/images/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { DatabaseService, handleDatabaseError } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const algorithmId = formData.get('algorithmId') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;

    if (!file || !algorithmId || !title) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const filename = `${algorithmId}-${timestamp}.${fileExtension}`;
    
    // Save file to public/images/uploads/
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadPath = join(process.cwd(), 'public', 'images', 'uploads', filename);
    await writeFile(uploadPath, buffer);

    // Save metadata to database
    const imageRecord = await DatabaseService.createAlgorithmImage({
      title,
      description,
      category: category as any,
      filename,
      url: `/images/uploads/${filename}`,
      algorithmId,
    });

    return NextResponse.json({ success: true, data: imageRecord });
  } catch (error) {
    return NextResponse.json(handleDatabaseError(error), { status: 500 });
  }
}