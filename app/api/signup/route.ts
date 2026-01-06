import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, xProfile } = data;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Enhanced logging for debugging
    console.log('📧 Signup request received:', { 
      email, 
      hasXProfile: !!xProfile,
      supabaseConfigured: !!supabase,
      hasEnvUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasEnvKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    if (!supabase) {
      console.error('❌ Supabase not configured!');
      console.error('Environment check:', {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      });
      // Return error instead of fake success
      return NextResponse.json({ 
        error: 'Service temporarily unavailable. Please try again later.',
        debug: 'Supabase not configured'
      }, { status: 503 });
    }

    // Attempt insert with detailed error logging
    console.log('🔄 Attempting to insert into test_users...');
    const { data: user, error } = await supabase
      .from('test_users')
      .insert({ email, x_profile: xProfile || null })
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase insert error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      
      // Handle duplicate email gracefully
      if (error.code === '23505') {
        console.log('✅ Duplicate email (already on list)');
        return NextResponse.json({ 
          success: true, 
          message: 'You are already on the list!' 
        });
      }

      // Handle RLS policy errors
      if (error.code === '42501' || error.message?.includes('permission denied')) {
        console.error('❌ RLS Policy Error - anonymous user cannot insert');
        return NextResponse.json({ 
          error: 'Database configuration error. Please contact support.',
          debug: 'RLS policy issue'
        }, { status: 500 });
      }

      // Handle table not found
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.error('❌ Table does not exist: test_users');
        return NextResponse.json({ 
          error: 'Database table not found. Please contact support.',
          debug: 'Table missing'
        }, { status: 500 });
      }

      return NextResponse.json({ 
        error: error.message || 'Failed to save email',
        debug: error.code
      }, { status: 500 });
    }

    console.log('✅ Successfully saved email:', user?.email);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json({ 
      error: 'Something went wrong',
      debug: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
