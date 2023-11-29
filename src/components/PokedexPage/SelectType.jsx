import { useEffect, useRef } from "react"
import useFetch from "../../hooks/useFetch"
import '../PokedexPage/styles/SelecTypes.css'

const SelectType = ({setSelectValue}) => {

    const url = 'https://pokeapi.co/api/v2/type'

   const [infoTypes, getInfoTypes] = useFetch(url)

   useEffect(() => {
    getInfoTypes()
   }, [])

   

   const selectElement = useRef()

   const handleChange = () => {
    setSelectValue(selectElement.current.value)

   }
   console.log(infoTypes);

  return (
<select className="select__value" ref={selectElement} onChange={handleChange}>
    <option value= 'allPokemons'>All pokemons </option>
    {
        infoTypes?.results.map(type => (
            <option key={type.url} value={type.url}>{type.name} </option>
        ))

    }
</select>  
  )
}

export default SelectType