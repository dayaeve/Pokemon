import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import './styles/PokedexInfoPage.css'

const PokeInfoPage = () => {

  const { id } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [pokemon, getPokemon] = useFetch(url)

  useEffect(() => {
    getPokemon()
  }, [])
  const firsType = pokemon?.types[0].type.name

  {
    pokemon?.types.map(infoType => (
      <li key={infoType.type.url}>{infoType.type.name}</li>
    ))
  }


  //console.log(pokemon);

  return (
    <div className="info__div">
      <div className="info__container1">
      <article className="info__article">
        <header className="info__header">
          <img className="info__img" src={pokemon?.sprites.other['official-artwork'].front_default} alt='' />
          <div className={`info__color ${firsType}-gradient`}></div>
        </header>
      </article>

      <section className="info__section">
        <h3 className="info__id ">#{pokemon?.id}</h3>
        <h2 className="info__name">{pokemon?.species.name}</h2>
        <ul className="info__ul">
          <li className="info__li"> Height </li>
          <li className="info__li"> Weight </li>
          <li className="info__li">{pokemon?.height} </li>
          <li className="info__li">{pokemon?.weight}</li>
        </ul>
        <div>
          <div className="info__tyha">
            <h4>Type</h4>
            <h4>Habilities</h4>
          </div>
        </div>
      </section>


      <div>
      <article className="info__artype">
        <ul className="info__typur">
          {
            pokemon?.types.map(infoType => (
              <li className={`info__type ${infoType.type.name}-gradient`} key={infoType.type.url}>{infoType.type.name} </li>
            ))
          }
        </ul>
        

        <ul className="info__abi">
          {
            pokemon?.abilities.map(infoAbi => (
              <li className="info__ability" key={infoAbi.ability.url}>{infoAbi.ability.name}
              </li>
            ))
          }
        </ul>
      </article>
      </div>


      <div className="info__comstat">
        <h2>Stats</h2>
        <div className="info__stats" >
          {
            pokemon?.stats.map(infoStatus => (
              <div className="info__statinfo">
                <div className="info__status">
                  <h3 className="info__name1">{infoStatus.stat.name}</h3>
                  <span className="info__span">{infoStatus.base_stat}/150</span>
                </div>
                <div className="info__bar" style={{ width: `${(infoStatus.base_stat * 100) / 150}%` }}>  
                </div>
              </div>
            ))
          }
          </div>
        </div>
      </div>


      <div className="pokeInfo__move">
        <h2 className="poke__moveh2">Movements</h2>
        <div className="poke__container">
          {
            pokemon?.moves.map(infoMove => (
              <span className="poke__typemove" key={infoMove.move.url}>{infoMove.move.name}
              </span>
            ))
          }
        </div>
      </div>
    </div>

  )
}

export default PokeInfoPage