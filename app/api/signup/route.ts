import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, xProfile } = data;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if Supabase is configured
    if (!supabase) {
      console.error('Supabase not configured. Missing environment variables.');
      // Still return success for better UX, but log the issue
      return NextResponse.json({ 
        success: true, 
        user: { 
          id: 'dev-' + Date.now(),
          email,
          xProfile: xProfile || null,
          timestamp: new Date().toISOString(),
        },
        message: 'Signup received (database not configured)'
      });
    }

    // Insert into Supabase test_users table
    const { data: newUser, error } = await supabase
      .from('test_users')
      .insert({
        email,
        x_profile: xProfile || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });

      // If table doesn't exist
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        console.error('test_users table does not exist. Please run the migration SQL.');
        return NextResponse.json({ 
          success: true, 
          user: { 
            id: 'temp-' + Date.now(),
            email,
            xProfile: xProfile || null,
            timestamp: new Date().toISOString(),
          },
          message: 'Signup received (table not found - check database)'
        });
      }
      
      // Handle duplicate email (user already signed up)
      if (error.code === '23505') {
        return NextResponse.json({ 
          success: true, 
          message: 'You\'re already on the list!',
          user: { email }
        });
      }

      // RLS policy error
      if (error.code === '42501' || error.message.includes('permission denied')) {
        console.error('RLS policy error. Check that the INSERT policy allows anon users.');
        return NextResponse.json({ 
          error: 'Database permission error. Please check RLS policies.' 
        }, { status: 500 });
      }

      return NextResponse.json({ 
        error: `Database error: ${error.message}` 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        id: newUser.id,
        email: newUser.email,
        xProfile: newUser.x_profile,
        timestamp: newUser.created_at,
      }
    });
  } catch (error) {
    console.error('Error in signup API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: `Server error: ${errorMessage}` 
    }, { status: 500 });
  }
}
