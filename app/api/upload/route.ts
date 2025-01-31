import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Define allowed file types and max size
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/svg+xml',
  'image/webp',
  'application/pdf'
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req as any);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the file from the request
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const path = (formData.get('path') as string) || 'uploads';

    // Validate file presence
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not allowed' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename with sanitized path
    const sanitizedPath = path.replace(/[^a-zA-Z0-9-_/]/g, '');
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const fileName = `${sanitizedPath}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        userId: userId, // Track who uploaded the file
        originalName: file.name
      }
    });

    await s3Client.send(command);

    // Return the file URL
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({
      url: fileUrl,
      fileName: fileName,
      size: file.size,
      type: file.type
    });
  } catch (error: any) {
    console.error('Error uploading to S3:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// Increase payload size limit for the API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb'
    }
  }
};
