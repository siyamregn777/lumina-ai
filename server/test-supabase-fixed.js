import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env.development') });

console.log('=== SUPABASE CONNECTION TEST ===');
console.log('URL:', process.env.SUPABASE_URL);
console.log('Service Key exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function testConnection() {
  try {
    console.log('\n1. Testing basic connection...');
    
    // Correct way to get count
    const { count, error: countError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('❌ Count query error:', countError.message);
      
      // Check if table exists
      console.log('\n2. Checking if "users" table exists...');
      const { data: tables, error: tablesError } = await supabase
        .rpc('get_tables'); // This might not exist either
      
      if (tablesError) {
        console.log('Table check failed, trying direct query...');
        
        // Try a simple select
        const { data, error } = await supabase
          .from('users')
          .select('id')
          .limit(1);
        
        if (error) {
          console.error('❌ Simple select error:', error.message);
          console.error('Hint:', error.hint);
          console.error('Details:', error.details);
          
          // Check database schema
          console.log('\n3. Checking database schema...');
          await checkDatabaseSchema();
        } else {
          console.log('✅ Simple select successful! Found:', data);
        }
      } else {
        console.log('Tables found:', tables);
      }
    } else {
      console.log(`✅ Connection successful! Found ${count} users in database`);
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    console.error('Stack:', error.stack);
  }
}

async function checkDatabaseSchema() {
  console.log('\n=== CHECKING DATABASE ===');
  
  // Try to create users table if it doesn't exist
  console.log('Creating users table if needed...');
  
  // First, check if we can run SQL
  try {
    // This is a simple test query
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(0); // Just to test
    
    if (error && error.message.includes('relation "users" does not exist')) {
      console.log('⚠️ "users" table does not exist. You need to create it.');
      console.log('\nTo create the table, run this in Supabase SQL Editor:');
      console.log(`
        CREATE TABLE IF NOT EXISTS public.users (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT NOT NULL,
          full_name TEXT,
          role TEXT DEFAULT 'USER',
          subscription TEXT DEFAULT 'STARTER',
          subscription_status TEXT DEFAULT 'active',
          stripe_customer_id TEXT,
          stripe_subscription_id TEXT,
          current_period_end TIMESTAMPTZ,
          email_confirmed BOOLEAN DEFAULT false,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        -- Enable Row Level Security
        ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
        
        -- Create policies
        CREATE POLICY "Users can view own data" 
          ON public.users FOR SELECT 
          USING (auth.uid() = id);
          
        CREATE POLICY "Users can insert own data" 
          ON public.users FOR INSERT 
          WITH CHECK (auth.uid() = id);
          
        CREATE POLICY "Users can update own data" 
          ON public.users FOR UPDATE 
          USING (auth.uid() = id);
      `);
    }
  } catch (error) {
    console.error('Schema check error:', error.message);
  }
}

testConnection();