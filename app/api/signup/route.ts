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

    // If Supabase is not configured, log and return success (for development)
    if (!supabase) {
      console.log('Test User Signup (Supabase not configured):', { email, xProfile });
      return NextResponse.json({ 
        success: true, 
        user: { 
          id: 'dev-' + Date.now(),
          email,
          xProfile: xProfile || null,
          timestamp: new Date().toISOString(),
        } 
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
      // If table doesn't exist, log and return success
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        console.error('test_users table does not exist. Please run the migration SQL.');
        console.log('Test User Signup (table missing):', { email, xProfile });
        return NextResponse.json({ 
          success: true, 
          user: { 
            id: 'temp-' + Date.now(),
            email,
            xProfile: xProfile || null,
            timestamp: new Date().toISOString(),
          } 
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

      console.error('Error saving user to Supabase:', error);
      return NextResponse.json({ error: 'Failed to save signup' }, { status: 500 });
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
