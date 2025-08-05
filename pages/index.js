import { useContext } from 'react';
import useSWR from 'swr';
import { UserContext } from './_app';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';

const fetcherWithToken = async (url, token) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default function Dashboard() {
  const session = useContext(UserContext);
  const router = useRouter();

  if (!session) {
    if (typeof window !== 'undefined') router.replace('/login');
    return <div className="min-h-screen flex items-center justify-center">Redirecionando...</div>;
  }

  const { data, error, isLoading } = useSWR(
    session ? ['/api/sinais', session.access_token] : null,
    ([url, token]) => fetcherWithToken(url, token),
    { 
      refreshInterval: 10000,
      errorRetryCount: 3,
      errorRetryInterval: 5000
    }
  );

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Carregando dados...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-600 text-lg">Erro ao carregar dados: {error.message}</div>
    </div>
  );

  if (!data || !Array.isArray(data)) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Nenhum sinal disponível</div>
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard de Sinais</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sair
        </button>
      </div>
      
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhum sinal encontrado
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 border-b border-gray-300 text-left font-semibold">Ativo</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left font-semibold">Variação %</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left font-semibold">Quantidade</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left font-semibold">Ação</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-200">{row.ticker}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <span className={row.variacao >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {row.variacao.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">{row.quantidade}</td>
                  <td className={`py-3 px-4 border-b border-gray-200 font-bold ${row.acao === 'COMPRA' ? 'text-green-600' : 'text-red-600'}`}>
                    {row.acao}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
