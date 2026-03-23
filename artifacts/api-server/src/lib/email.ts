import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Lerank <onboarding@resend.dev>";

export async function sendVerificationEmail(to: string, code: string): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Verify your Lerank account",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #FAFAF8; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 28px; font-weight: 700; color: #1E3D28; margin: 0;">Lerank</h1>
            <p style="color: #6B7280; font-size: 14px; margin-top: 4px;">Email Verification</p>
          </div>
          <div style="background: white; border-radius: 12px; padding: 32px; text-align: center; border: 1px solid #E5E7EB;">
            <p style="color: #374151; font-size: 15px; margin: 0 0 24px;">Your verification code is:</p>
            <div style="background: #F3F4F6; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <span style="font-family: monospace; font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #1E3D28;">${code}</span>
            </div>
            <p style="color: #9CA3AF; font-size: 13px; margin: 0;">This code expires in 10 minutes.</p>
          </div>
          <p style="color: #9CA3AF; font-size: 12px; text-align: center; margin-top: 24px;">If you didn't create a Lerank account, you can safely ignore this email.</p>
        </div>
      `,
    });
    if (error) {
      console.error("Resend error (verification):", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to send verification email:", err);
    return false;
  }
}

export async function sendPasswordResetEmail(to: string, code: string): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Reset your Lerank password",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #FAFAF8; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 28px; font-weight: 700; color: #1E3D28; margin: 0;">Lerank</h1>
            <p style="color: #6B7280; font-size: 14px; margin-top: 4px;">Password Reset</p>
          </div>
          <div style="background: white; border-radius: 12px; padding: 32px; text-align: center; border: 1px solid #E5E7EB;">
            <p style="color: #374151; font-size: 15px; margin: 0 0 24px;">Your password reset code is:</p>
            <div style="background: #F3F4F6; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <span style="font-family: monospace; font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #1E3D28;">${code}</span>
            </div>
            <p style="color: #9CA3AF; font-size: 13px; margin: 0;">This code expires in 10 minutes.</p>
          </div>
          <p style="color: #9CA3AF; font-size: 12px; text-align: center; margin-top: 24px;">If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `,
    });
    if (error) {
      console.error("Resend error (reset):", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to send password reset email:", err);
    return false;
  }
}
