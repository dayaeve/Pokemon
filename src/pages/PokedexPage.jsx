import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import './styles/PokedexPage.css'

const PokedexPage = () => {

const [inputValue, setInputValue] = useState('')
const [selectValue, setSelectValue] = useState('allPokemons')
 const trainerName =  useSelector(store => store.trainerName)
 
 const url = 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0'
 const [pokemons, getPokemons, getByTypePokemons ] = useFetch(url)

 useEffect(() => {
  if(selectValue === 'allPokemons') {
    getPokemons()
    setPage(1)
  }else{
    getByTypePokemons(selectValue)
    setPage(1)
  }
  
 }, [selectValue]) 
 
 //console.log(pokemons);

 const inputSearch = useRef()

 const handleSubmit = e => {
  e.preventDefault()
 setInputValue(inputSearch.current.value.toLowerCase().trim())
 inputSearch.current.value = ''
 }

 //console.log(inputValue)

  const cbFilter = (poke) => {
  //filtro por nombre en el input
  const nameFiltered = poke.name.includes(inputValue)
  return nameFiltered
 }

 // Logica paginación
 const [page, setPage] = useState(1)
 const pokemonsFiltered = pokemons?.results.filter(cbFilter)

 const totalPokemon = pokemonsFiltered?.length
 const pokePerPage = 12
 const quantityPages = Math.ceil(totalPokemon / pokePerPage)
 let arrPages = []
 for (let i = 1; i <= quantityPages; i++) {
   if (pokemonsFiltered) {
     arrPages.push(i)
   }
 } 
 const firstIndex = pokePerPage * (page - 1)
 const finalIndex = pokePerPage * page
 //Final de la paginacion 

  return (
    <div className="poke__body">

      <p className="poke__p"><span className="poke__span">Welcome {trainerName}</span>, here you find your favorite pokemon. Let's go!</p>
      <form className="poke__form" onSubmit={handleSubmit}>
        <input className="poke__input" ref={inputSearch} type="text" />
        <button className="poke__button">Search</button>
        
      </form>
      <SelectType
      setSelectValue={setSelectValue}
      setPage={setPage}

      />
      <div className="poke__div">
        {
           pokemonsFiltered?.slice(firstIndex, finalIndex).map(poke => (
            <PokeCard
            key = {poke.url}
            url = {poke.url}
            />

          ))
        }
      </div>
    

      <ul className="poke__page">
        <li style={{ display: `${page <= 1 ? "none" : "block"}` }} className="poke__cont" onClick={() => {
          if (page >= 2) {
            setPage(page - 1)
          }
        }} >&gt;</li>
        {          
          arrPages.map(e => (
            <li className={`poke__count ${e === page ? "page__count" : ""}`} onClick={() => setPage(e)} key={e}>{e}</li>
          ))
        }
        <li style={{ display: `${page >= quantityPages ? "none" : "block"}` }} className="page__count" onClick={() => {
          if (page < quantityPages) {
            setPage(page + 1)
          }
        }}>&gt;</li>
      </ul>
      {
        /*término Paginación*/
      }

    </div>
  )
}

export default PokedexPage