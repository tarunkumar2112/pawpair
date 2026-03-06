import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Load an email template from the email-templates directory
 */
function loadTemplate(templateName: string): string {
  const templatePath = path.join(process.cwd(), 'email-templates', templateName);
  return fs.readFileSync(templatePath, 'utf-8');
}

/**
 * Replace variables in email template
 */
function replaceVariables(html: string, variables: Record<string, string>): string {
  let result = html;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{ \\.${key} \\}\\}`, 'g');
    result = result.replace(regex, value);
  });
  return result;
}

/**
 * Send email confirmation to user based on their role
 */
export async function sendConfirmationEmail(
  email: string,
  role: 'owner' | 'caregiver',
  name: string,
  confirmationUrl: string
) {
  const template = role === 'owner' 
    ? 'confirm-email-owner.html' 
    : 'confirm-email-caregiver.html';
  
  const html = loadTemplate(template);
  const htmlWithVariables = replaceVariables(html, {
    ConfirmationURL: confirmationUrl,
    SiteURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  });

  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@contact.mypawpair.com',
      to: email,
      subject: role === 'owner' 
        ? 'Confirm Your Email - PawPair' 
        : 'Confirm Your Email - PawPair Caregiver',
      html: htmlWithVariables,
    });

    if (error) {
      console.error('Error sending confirmation email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    throw error;
  }
}

/**
 * Send welcome email after user confirms their email
 */
export async function sendWelcomeEmail(
  email: string,
  role: 'owner' | 'caregiver',
  name: string
) {
  const template = role === 'owner' 
    ? 'welcome-owner.html' 
    : 'welcome-caregiver.html';
  
  const html = loadTemplate(template);
  const htmlWithVariables = replaceVariables(html, {
    SiteURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  });

  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@contact.mypawpair.com',
      to: email,
      subject: role === 'owner' 
        ? 'Welcome to PawPair!' 
        : 'Welcome to PawPair Caregiver Network!',
      html: htmlWithVariables,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
) {
  const html = loadTemplate('reset-password.html');
  const htmlWithVariables = replaceVariables(html, {
    ConfirmationURL: resetUrl,
    SiteURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  });

  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@contact.mypawpair.com',
      to: email,
      subject: 'Reset Your Password - PawPair',
      html: htmlWithVariables,
    });

    if (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw error;
  }
}

/**
 * Send caregiver approval email
 */
export async function sendCaregiverApprovalEmail(
  email: string,
  name: string
) {
  const html = loadTemplate('caregiver-approved.html');
  const htmlWithVariables = replaceVariables(html, {
    SiteURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  });

  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@contact.mypawpair.com',
      to: email,
      subject: 'Congratulations! Your Caregiver Application is Approved',
      html: htmlWithVariables,
    });

    if (error) {
      console.error('Error sending approval email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send approval email:', error);
    throw error;
  }
}

/**
 * Helper function to get confirmation URL from Supabase token
 */
export function getConfirmationUrl(tokenHash: string, type: string = 'signup'): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/auth/confirm?token_hash=${tokenHash}&type=${type}`;
}
