-- SUPER SIMPLE FIX: Disable RLS
-- Run this in Supabase SQL Editor
-- This will allow ANYONE with the API key (which is public) to write to this table.
-- Since it's just a test signup list, this is the easiest way to make it work immediately.

ALTER TABLE test_users DISABLE ROW LEVEL SECURITY;

