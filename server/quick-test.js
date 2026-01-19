import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env.development') });

console.log('=== QUICK SUPABASE TEST ===');
console.log('Project ID: ficnnzmabzerzdzyzvfy');
console.log('Expected URL: https://ficnnzmabzerzdzyzvfy.supabase.co');
console.log('Configured URL:', process.env.SUPABASE_URL);
console.log('URL Match:', process.env.SUPABASE_URL === 'https://ficnnzmabzerzdzyzvfy.supabase.co');

const supabase = createClient(
  'https://ficnnzmabzerzdzyzvfy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);

async function test() {
  try {
    console.log('\nTesting connection...');
    
    // Simple ping
    const { data, error } = await supabase
      .from('users')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      console.error('❌ Error:', error.message);
      
      // Try without table
      const { data: health, error: healthError } = await supabase.rpc('health');
      if (healthError) {
        console.error('❌ RPC health check failed:', healthError.message);
      } else {
        console.log('✅ RPC health check passed');
      }
    } else {
      console.log('✅ Connection successful!');
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

test();