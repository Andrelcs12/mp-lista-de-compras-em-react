import { useState, useEffect } from "react";
import trashIcon from './assets/trash.svg';
interface ItemLista {
  item: string;
  unid: string;
  checked?: boolean;
}

function App() {


  const [item, setItem] = useState('');
  const [unid, setUnid] = useState('');
  const [lista, setLista] = useState<ItemLista[]>(() => {
      const dadosSalvos = localStorage.getItem("listaDeCompras");
      return dadosSalvos ? JSON.parse(dadosSalvos) : [];
    });

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

  useEffect(() => {
  localStorage.setItem("listaDeCompras", JSON.stringify(lista));
}, [lista]);





  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white w-[800px] h-[800px] rounded-2xl p-8 px-16 shadow-lg overflow-y-auto">
        <h1 className="text-center font-extrabold text-4xl text-blue-700">Lista de Compras</h1>
        <p className="text-center border-b-2 border-zinc-500 pb-2 text-zinc-600">Facilite sua ida ao supermercado</p>

        <div className="flex mt-8 items-center justify-center md:flex-row md:gap-4 gap-1 flex-col"> 
          <div className="flex flex-col w-full md:w-auto">
            <h1 className="font-medium">Item</h1>
            <input type="text" value={item} onKeyDown={(e) => {
    if (e.key === 'Enter') handleSubmit();
  }} onChange={(e) => setItem(e.target.value)} className="px-4 py-2 border-2 rounded-lg border-zinc-300"
            placeholder="Ex: Arroz"/>
          </div>
           <div className="flex flex-col w-full md:w-auto">
            <h1 className="font-medium">Quantidade</h1>
            <input type="text" value={unid} onKeyDown={(e) => {
    if (e.key === 'Enter') handleSubmit();
  }} onChange={(e) => setUnid(e.target.value)}
            className=" py-2 px-4 border-2 rounded-lg border-zinc-300"
            placeholder="Ex: 1kg" />
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <span className="text-white select-none">.</span>
            <button onClick={handleSubmit}
              className="flex items-center justify-center px-8 py-3 border-2 rounded-lg border-none
                   bg-blue-800 text-white font-bold hover:bg-blue-600 transition w-full md:w-auto">
                        +
            </button>

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
                  <div className="border-b  md:w-[500px] w-[250px]">
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
                  <div className="border-b md:w-[500px] w-[250px] ">
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

        <footer>
            <p className="text-center text-md text-zinc-400 mt-8">
            Desenvolvido por André Lucas &copy; {new Date().getFullYear()}
            </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
