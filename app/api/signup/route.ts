import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, xProfile } = data;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!supabase) {
      console.warn('Supabase not configured. Simulating success.');
      return NextResponse.json({ success: true, user: { email } });
    }

    // Simple insert
    const { data: user, error } = await supabase
      .from('test_users')
      .insert({ email, x_profile: xProfile })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      
      // Handle duplicate email gracefully
      if (error.code === '23505') {
        return NextResponse.json({ 
          success: true, 
          message: 'You are already on the list!' 
        });
      }

      return NextResponse.json({ 
        error: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
