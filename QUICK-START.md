# 🚀 Quick Start Guide

## Step 1: Add Environment Variable

Create/update `.env.local`:

```env
RESEND_API_KEY=re_your_resend_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 2: Update Logo URLs

In all 6 template files in `email-templates/`, replace:

```
https://yourdomain.com/logo.png
```

With your actual logo URL.

## Step 3: Test It!

### Test Owner Signup:
1. Go to `/auth/sign-up`
2. Sign up with test email
3. Check email for confirmation
4. Click link → Should see success page
5. Check email for welcome email

### Test Caregiver Signup:
1. Go to `/auth/caregiver-signup`
2. Sign up with test email
3. Check email for confirmation
4. Click link → Should see "pending approval" message
5. Check email for welcome email

### Test Caregiver Approval:
```bash
curl -X POST http://localhost:3000/api/approve-caregiver \
  -H "Content-Type: application/json" \
  -d '{"caregiverId": "user-id-here"}'
```

## That's It! 🎉

Everything is ready. Just:
1. Add your RESEND_API_KEY
2. Update logo URLs
3. Test and deploy!

## Email Templates

All managed in `email-templates/` folder:
- `confirm-email-owner.html` - Owner confirmation
- `confirm-email-caregiver.html` - Caregiver confirmation
- `welcome-owner.html` - Owner welcome
- `welcome-caregiver.html` - Caregiver welcome
- `caregiver-approved.html` - Caregiver approval
- `reset-password.html` - Password reset

## Need Help?

Check these docs:
- `EMAIL-IMPLEMENTATION.md` - Complete guide
- `IMPLEMENTATION-COMPLETE.md` - What's been done
- `email-templates/README.md` - Template docs
