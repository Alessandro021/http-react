/* eslint-disable no-unused-vars */
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [produtos, setProdutos] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const url = "http://localhost:3000"
  
  useEffect(() => {
    const api = async () => {
      await fetch(`${url}/products`)
        .then(result => result.json())
        .then(data => setProdutos(data))
    }

    api()
  },[])

  const handleSubmit = async (evento) => {
    evento.preventDefault()

    const product = {
      name: name,
      price: price,
    }

  await fetch(`${url}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
   })
   .then(res => res.json())
   .then(data => setProdutos((oldProdutos) => [...oldProdutos, data]))
   
   setName("")
   setPrice("")
   
  }

  return (
      <div className="App">
        <h1>Lista de produtos</h1>
        <ul>
          {produtos.slice(produtos.length - 10,produtos.length ).map((produto) => (
            <li key={produto.id}>{produto.name} - R$ {produto.price}</li>
          ))}
        </ul>
        <div className='add-product'>
            <form onSubmit={handleSubmit}>
              <label> Nome:
                <input type="text" value={name} name='name' onChange={evento => setName(evento.target.value)}/>
              </label>

              <label> Preço:
                <input type="number" value={price} name='price' onChange={evento => setPrice(evento.target.value)}/>
              </label>


              <input type="submit" value="Criar"/>
            </form>
        </div>
      </div>
  )
}

export default App
