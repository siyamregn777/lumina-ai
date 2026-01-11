
import { createClient } from '@supabase/supabase-js';
import { config } from '../../config';

/**
 * Supabase Client Instance
 * Used for Authentication, Database, and Realtime subscriptions.
 */
export const supabase = createClient(
  config.supabase.url, 
  config.supabase.anonKey
);
