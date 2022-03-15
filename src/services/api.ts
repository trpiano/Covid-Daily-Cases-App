import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xszdcajvmicbglfldisq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzemRjYWp2bWljYmdsZmxkaXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcyODY2NjQsImV4cCI6MTk2Mjg2MjY2NH0.voqjrfVofD8Ysjpz9fuSrRTiu8MNnOe3T1LVGER0Pn8"

export const api = createClient(supabaseUrl, supabaseKey)