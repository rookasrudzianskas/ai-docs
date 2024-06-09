import {createClient} from "@supabase/supabase-js";

const supabase = createClient(
  'https://andyuvesarogqjseorkh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZHl1dmVzYXJvZ3Fqc2VvcmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5MjE4NDIsImV4cCI6MjAzMzQ5Nzg0Mn0.OlyVZfdSg2dQauWDbzzAFtHXjK6RP8BDianU9UZRwgo'
)

export default supabase;
