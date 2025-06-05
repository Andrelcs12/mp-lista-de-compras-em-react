import { useState } from "react";
import trashIcon from './assets/trash.svg';
interface ItemLista {
  item: string;
  unid: string;
  checked?: boolean;
}

function App() {
  const [item, setItem] = useState('');
  const [unid, setUnid] = useState('');
  const [lista, setLista] = useState<ItemLista[]>([]);

  const handleSubmit = () => {
    if (!item || !unid) return;
    const novoItem: ItemLista = { item, unid, checked: false };
    setLista([...lista, novoItem]);
    setItem('');
    setUnid('');
  };

  const handleToggleCheck = (index: number) => {
    const novaLista = [...lista];
    novaLista[index].checked = !novaLista[index].checked;
    setLista(novaLista);
  };

  const handleDeleteItem = (index: number) => {
    const novaLista = lista.filter((_, i) => i !== index);
    setLista(novaLista);
  };

  const pendentes = lista.filter(item => !item.checked);
  const comprados = lista.filter(item => item.checked);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white w-[1000px] h-[800px] rounded-2xl p-8 px-16 shadow-lg overflow-y-auto">
        <h1 className="text-center font-extrabold text-4xl text-blue-700">Lista de Compras</h1>
        <p className="text-center border-b-2 border-zinc-500 pb-2 text-zinc-600">Facilite sua ida ao supermercado</p>

        <div className="flex mt-8 items-center justify-center gap-4">
          <div>
            <h1 className="font-medium">Item</h1>
            <input type="text" value={item} onChange={(e) => setItem(e.target.value)} className="px-4 py-2 border-2 rounded-lg border-zinc-300"
            placeholder="Ex: Arroz"/>
          </div>
          <div>
            <h1 className="font-medium">Quantidade</h1>
            <input type="text" value={unid} onChange={(e) => setUnid(e.target.value)}
            className="w-40 py-2 px-4 border-2 rounded-lg border-zinc-300"
            placeholder="Ex: 1kg" />
          </div>
          <div className="flex flex-col">
            <span className="text-white select-none">.</span>
            <button onClick={handleSubmit} className="flex items-baseline px-8 py-2 border-2 rounded-lg
             bg-blue-800 text-white font-bold hover:bg-blue-600 transition"> + </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-zinc-700 mb-4">Itens pendentes</h2>
          <div className="flex flex-col gap-4 px-2">
            {pendentes.length === 0 ? (
              <p className="text-zinc-400">Nenhum item pendente.</p>
            ) : (
              pendentes.map((item, index) => (
                <div key={index} className="flex gap-6 items-center">
                  <button onClick={() => handleToggleCheck(lista.indexOf(item))}
                    className="border-2 rounded-full h-6 w-6 flex items-center justify-center hover:bg-green-500"/>
                  <div className="border-b w-[500px]">
                    <h1 className="font-semibold text-xl">{item.item}</h1>
                    <p className="text-zinc-500">{item.unid}</p>
                  </div>
                  <img src={trashIcon} alt="trash" onClick={() => handleDeleteItem(lista.indexOf(item))}
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition"/>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-zinc-700 mb-4">Itens já comprados</h2>
          <div className="flex flex-col gap-4 px-2">
            {comprados.length === 0 ? (
              <p className="text-zinc-400">Nenhum item comprado ainda.</p>
            ) : (
              comprados.map((item, index) => (
                <div key={index} className="flex gap-6 items-center">
                  <button onClick={() => handleToggleCheck(lista.indexOf(item))}
                    className="border-2 rounded-full h-6 w-6 flex items-center justify-center bg-green-500">
                    ✔
                  </button>
                  <div className="border-b w-[500px]">
                    <h1 className="font-semibold text-xl line-through text-zinc-400">{item.item}</h1>
                    <p className="text-zinc-400 line-through">{item.unid}</p>
                  </div>
                  <img src={trashIcon} alt="trash" onClick={() => handleDeleteItem(lista.indexOf(item))}
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition"/>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
