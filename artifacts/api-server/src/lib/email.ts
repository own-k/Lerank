// Email simulation - logs codes to console since no email service is configured
// In production, replace with a real email provider (Resend, SendGrid, etc.)

export async function sendVerificationEmail(to: string, code: string): Promise<boolean> {
  console.log(`\n📧 [EMAIL SIMULATION] Verification email to ${to}`);
  console.log(`   Code: ${code}`);
  console.log(`   (No email service configured - code shown in API response as fallbackCode)\n`);
  return false; // returning false so fallbackCode is always included in response
}

export async function sendPasswordResetEmail(to: string, code: string): Promise<boolean> {
  console.log(`\n📧 [EMAIL SIMULATION] Password reset email to ${to}`);
  console.log(`   Code: ${code}`);
  console.log(`   (No email service configured - code shown in API response as fallbackCode)\n`);
  return false; // returning false so fallbackCode is always included in response
}
