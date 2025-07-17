import { useContext } from 'react';
import useSWR from 'swr';
import { UserContext } from './_app';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const session = useContext(UserContext);
  const router = useRouter();

  if (!session) {
    if (typeof window !== 'undefined') router.replace('/login');
    return null;
  }

  const { data, error } = useSWR('/api/sinais', fetcher, { refreshInterval: 10000 });

  if (error) return <div>Falha ao carregar</div>;
  if (!data) return <div>Carregando...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Sinais</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Ativo</th>
            <th className="py-2 px-4 border-b">Variação %</th>
            <th className="py-2 px-4 border-b">Quantidade</th>
            <th className="py-2 px-4 border-b">Ação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="text-center">
              <td className="py-2 px-4 border-b">{row.ticker}</td>
              <td className="py-2 px-4 border-b">{row.variacao.toFixed(2)}%</td>
              <td className="py-2 px-4 border-b">{row.quantidade}</td>
              <td className={`py-2 px-4 border-b font-bold ${row.acao === 'COMPRA' ? 'text-green-600' : 'text-red-600'}`}>{row.acao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
