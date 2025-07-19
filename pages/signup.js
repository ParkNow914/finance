import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Signup() {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/');
    });
  }, [router]);

  const handleSignup = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`
      }
    });
    if (error) alert(error.message);
    else {
      alert('Conta criada! Você será redirecionado para o login.');
      router.replace('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSignup} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4 text-center">Criar Conta</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="email" type="email" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Senha</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="password" type="password" required />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Cadastrar
          </button>
          <button type="button" onClick={() => router.replace('/login')} className="underline text-sm text-blue-600">Já tenho conta</button>
        </div>
      </form>
    </div>
  );
}
