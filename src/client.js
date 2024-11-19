import { createClient } from '@supabase/supabase-js'

const URL = 'https://lelmddkiwhnnachqjckj.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbG1kZGtpd2hubmFjaHFqY2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5ODY4NzMsImV4cCI6MjA0NzU2Mjg3M30.fEQ-cIyv7Fn_tBIi2Ykb1VT282Em98N13YCnLO_5I0g';

export const supabase = createClient(URL, API_KEY);