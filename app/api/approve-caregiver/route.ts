import { NextRequest, NextResponse } from 'next/server';
import { sendCaregiverApprovalEmail } from '@/lib/email';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { caregiverId } = await request.json();

    if (!caregiverId) {
      return NextResponse.json(
        { error: 'Caregiver ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: user, error: userError } = await supabase.auth.admin.getUserById(
      caregiverId
    );

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Caregiver not found' },
        { status: 404 }
      );
    }

    const email = user.user.email;
    const name = user.user.user_metadata?.full_name || 'User';

    if (!email) {
      return NextResponse.json(
        { error: 'Caregiver email not found' },
        { status: 400 }
      );
    }

    await sendCaregiverApprovalEmail(email, name);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in approve-caregiver API:', error);
    return NextResponse.json(
      { error: 'Failed to send approval email' },
      { status: 500 }
    );
  }
}
