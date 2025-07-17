import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  // Protege endpoint - verifica token JWT no header 'Authorization: Bearer <token>'
  const { user, error: authError } = await supabase.auth.getUser(req.headers['authorization']?.split(' ')[1] || '');
  if (authError || !user) return res.status(401).json({ error: 'Not authorized' });

  const { data, error } = await supabase.from('sinais').select('*').order('created_at', { ascending: false }).limit(50);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}
