import Header from '@/components/Header';
import Board from '@/components/Board';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        <Board />
      </main>
    </div>
  );
}
