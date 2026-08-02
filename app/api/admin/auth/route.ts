import { NextResponse } from 'next/server';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'thinkcode2026';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    if (!passcode) {
      return NextResponse.json(
        { success: false, error: 'Passcode diperlukan' },
        { status: 400 }
      );
    }

    if (passcode === ADMIN_PASSCODE) {
      // Simple auth token (base64 encoded timestamp + secret string)
      const token = Buffer.from(`thinkcode_admin_${Date.now()}_authenticated`).toString('base64');
      
      return NextResponse.json({
        success: true,
        token,
        message: 'Autentikasi berhasil'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Passcode salah' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
