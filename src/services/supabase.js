import {createClient} from '@supabase/supabase-js';

export const supabaseUrl = 'https://jqgwthdcwdrjifqngjym.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZ3d0aGRjd2RyamlmcW5nanltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDMwMDUsImV4cCI6MjA1NTg3OTAwNX0.tdcWpcB9NNpc5ZNFhU6uZZAGzKwbbxGC1N93gEqbvIw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;