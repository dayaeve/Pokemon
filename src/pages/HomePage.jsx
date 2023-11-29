import { useRef } from "react"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import './styles/HomePage.css'

const HomePage = () => {

    const inputName = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch (setTrainerName(inputName.current.value.trim()))
        navigate('/pokedex')

    }



    return (
        <div className="home--container">
            <div className="home__div">
                <img className="home__h1" src="../PokedexLogo.png" />
                <h2 className="home__h2">Hi Trainer!</h2>
                <p className="home__p">To start, please give me your trainer name</p>
                <form className="home__form" onSubmit={handleSubmit}>
                    <input className="home__input" ref={inputName} type="text" />
                    <button className="home__btn">Catch them all!</button>
                </form>
            </div>
        </div>
    )
}

export default HomePage