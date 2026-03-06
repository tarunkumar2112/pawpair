# Email Implementation Guide

## ✅ What's Been Implemented

### 1. Email Service (`lib/email.ts`)
Complete email service with functions for:
- ✅ Confirmation emails (role-based)
- ✅ Welcome emails (role-based)
- ✅ Password reset emails
- ✅ Caregiver approval emails

### 2. API Routes
- ✅ `/api/send-confirmation-email` - Sends confirmation emails
- ✅ `/api/approve-caregiver` - Sends approval email to caregivers

### 3. Updated Components
- ✅ `sign-up-form.tsx` - Sends owner confirmation email
- ✅ `caregiver-sign-up-form.tsx` - Sends caregiver confirmation email

### 4. Updated Auth Flow
- ✅ `app/auth/confirm/route.ts` - Sends welcome email after verification

## 🔧 Environment Variables Required

Add these to your `.env.local` file:

```env
# Resend API Key (same one you configured in Supabase SMTP)
RESEND_API_KEY=re_your_resend_api_key_here

# Your application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change to production URL when deployed
```

## 📝 How It Works

### User Signup Flow:

1. **User fills signup form** (Owner or Caregiver)
2. **Supabase creates the account**
3. **Your custom email is sent immediately** with beautiful role-based template
4. **User clicks link in email** → verifies via Supabase
5. **Welcome email is automatically sent** after verification
6. **User sees success page** with role-specific message

### Email Types Sent:

#### For Dog Owners:
1. **Confirmation email** (`confirm-email-owner.html`) - Blue theme
2. **Welcome email** (`welcome-owner.html`) - After verification

#### For Caregivers:
1. **Confirmation email** (`confirm-email-caregiver.html`) - Brown theme
2. **Welcome email** (`welcome-caregiver.html`) - After verification
3. **Approval email** (`caregiver-approved.html`) - When admin approves (manual trigger)

## 🎯 Supabase Dashboard Settings

### Disable Supabase Email Templates (Recommended):

Since you're managing all emails in your code, you can:

**Option 1: Disable completely**
1. Go to Supabase Dashboard → Authentication → Email Templates
2. Make all templates blank or minimal
3. Your custom emails will be the only ones sent

**Option 2: Keep as fallback**
1. Keep Supabase templates enabled with basic content
2. Users get 2 emails (Supabase + yours)
3. Provides reliability if your email service fails

## 🔒 Security Notes

1. **RESEND_API_KEY** must be kept secret
2. Never commit `.env.local` to Git
3. Use environment variables in production (Vercel, etc.)
4. Rate limit the API routes if needed

## 📧 Sending Caregiver Approval Email

When you manually approve a caregiver in your database/admin panel:

```typescript
// Call this API route
await fetch('/api/approve-caregiver', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    caregiverId: 'user-id-here'
  })
});
```

Or create a database trigger:

```sql
CREATE OR REPLACE FUNCTION notify_caregiver_approval()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.approved = true AND OLD.approved = false THEN
    -- Call your API endpoint
    PERFORM net.http_post(
      url := 'YOUR_APP_URL/api/approve-caregiver',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := json_build_object('caregiverId', NEW.user_id)::text
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## 🎨 Customizing Email Templates

All templates are in `email-templates/` folder:

1. Edit the HTML files directly
2. Replace logo URL: `https://yourdomain.com/logo.png` with your actual logo
3. Update colors/styling as needed
4. Variables: `{{ .SiteURL }}` and `{{ .ConfirmationURL }}` are auto-replaced

## 🧪 Testing

### Test Confirmation Email:
1. Sign up with a test email
2. Check your inbox for the confirmation email
3. Click the link to verify

### Test Welcome Email:
1. After clicking confirmation link
2. Check for welcome email
3. Should arrive within seconds

### Test Approval Email:
```bash
curl -X POST http://localhost:3000/api/approve-caregiver \
  -H "Content-Type: application/json" \
  -d '{"caregiverId": "your-test-caregiver-id"}'
```

## 📊 Email Dashboard

All emails are sent through Resend. Monitor them at:
- https://resend.com/emails
- View delivery status, opens, clicks, etc.

## ⚠️ Important Notes

1. **Confirmation URLs**: Using placeholder token URLs. You may need to adjust based on Supabase's actual token generation
2. **Rate Limits**: Resend free tier = 100 emails/day (upgrade as needed)
3. **Sender Email**: Using `noreply@contact.mypawpair.com` (your verified domain)
4. **Templates Location**: All in `email-templates/` folder

## 🐛 Troubleshooting

### Emails not sending?
1. Check `RESEND_API_KEY` is set correctly
2. Verify sender domain is verified in Resend
3. Check console logs for errors

### Wrong template being sent?
1. Check user's role in user_metadata
2. Verify role is passed correctly in API calls

### Emails going to spam?
1. Verify domain in Resend dashboard
2. Set up SPF, DKIM, DMARC records
3. Warm up your sending domain

## 🚀 Deployment Checklist

- [ ] Add `RESEND_API_KEY` to production environment
- [ ] Update `NEXT_PUBLIC_APP_URL` to production URL
- [ ] Replace logo URLs in all templates with production logo URL
- [ ] Test email flow on production
- [ ] Monitor Resend dashboard for delivery issues
- [ ] Set up proper error logging

## 📞 Support

- Resend Docs: https://resend.com/docs
- Supabase Auth: https://supabase.com/docs/guides/auth
