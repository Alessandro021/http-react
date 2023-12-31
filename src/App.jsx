/* eslint-disable no-unused-vars */
import './App.css'
import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'

function App() {
  const url = "http://localhost:3000"
  // const [produtos, setProdutos] = useState([])
  //##CUSTON HOOKS ⬇⬇⬇⬇
  const {data: items, httpConfig, loading, error, deleteItem} = useFetch(`${url}/products`)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  
  // useEffect(() => {
  //   const api = async () => {
  //     await fetch(`${url}/products`)
  //       .then(result => result.json())
  //       .then(data => setProdutos(data))
  //   }

  //   api()
  // },[])

  const handleSubmit = async (evento) => {
    evento.preventDefault()

    const product = {
      name: name,
      price: price,
    }

  // await fetch(`${url}/products`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(product)
  //  })
  //  .then(res => res.json())
  //  .then(data => setProdutos((oldProdutos) => [...oldProdutos, data]))
   
   httpConfig(product, "POST")
   setName("")
   setPrice("")
  }

  return (
      <div className="App">
        <h1>Lista de produtos</h1>
        {loading && <p>Carregando dados...</p>}
        {error && <p>{error}</p>}
        {!error && 
        <ul>
          {items?.slice(items?.length - 10, items?.length ).map((produto) => (
            <li key={produto.id}>{produto.name} - R$ {produto.price} <button onClick={() => deleteItem(`${url}/products/${produto.id}`, "DELETE")}>Excluir</button></li>
          ))}
        </ul>
        }
        <div className='add-product'>
            <form onSubmit={handleSubmit}>
              <label> Nome:
                <input type="text" value={name} name='name' onChange={evento => setName(evento.target.value)}/>
              </label>

              <label> Preço:
                <input type="number" value={price} name='price' onChange={evento => setPrice(evento.target.value)}/>
              </label>

              {loading && <input type="submit" disabled value="Aguarde"/> }
              {!loading && <input type="submit" value="Criar"/> }
            </form>
        </div>
      </div>
  )
}

export default App
