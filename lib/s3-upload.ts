import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!
  }
});

export async function uploadToS3(
  file: File,
  path: string = 'uploads'
): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${path}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
    ACL: 'public-read'
  });

  await s3Client.send(command);

  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${
    process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'
  }.amazonaws.com/${fileName}`;
}
