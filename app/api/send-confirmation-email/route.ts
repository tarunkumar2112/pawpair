import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, role, name, confirmationUrl } = await request.json();

    // Validate required fields
    if (!email || !role || !confirmationUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate role
    if (role !== 'owner' && role !== 'caregiver') {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Send the confirmation email
    await sendConfirmationEmail(email, role, name || 'User', confirmationUrl);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in send-confirmation-email API:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
}
