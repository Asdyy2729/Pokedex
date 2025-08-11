import { useEffect, useState } from "react";
import axios from "axios";
import '../Pokemonlist/PokemonList.css'
import Pokemon from '../Pokemon/Pokemon'

function PokemonList(){

    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon' )

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

async function downloadPokemons() {
    setIsLoading(true)
const response = await axios.get(pokedexUrl) // This downloads list of 20 pokemons


 const pokemonResults = response.data.results; // we get the array of pokemons from result

 console.log(response.data);
 setNextUrl(response.data.next);
 setPrevUrl(response.data.previous);


 // itrating over the array of pokemons and using thier url, to create an array of promises
 // that will download those 20 pokemons
 const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
  
 // passing that promise array to axios.all
 const pokemonData = await axios.all(pokemonResultsPromise) // array of 20 pokemon detailed data
 console.log(pokemonData)

// now iterate on the data of each pokemon, and extract id, name, image, types
const res = pokemonData.map((pokeData) => {
    const pokemon = pokeData.data
    return {name: pokemon.name, 
        image : (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
         type : pokemon.types,
         id : pokemon.id
        }
 });
console.log(res)
 setPokemonList(res)
 
 setIsLoading(false);
}



 useEffect(()=>{
    downloadPokemons();
 } , [pokedexUrl]); 
 
return<div className="pokemon-list-wrapper">
           <div className="pokemon-wrapper">{(isLoading) ? 'Loading....': pokemonList.map((p)=><Pokemon name = {p.name} image={p.image} key={p.id} part={p.id} />)}</div> 
               <div >
                  <button className="prevButtons" disabled={prevUrl == null} onClick={()=> setPokedexUrl(prevUrl)} > Prev </button>
                  <button className="nextButtons" disabled={nextUrl == null} onClick={()=> setPokedexUrl(nextUrl)}>  Next </button>
            </div>
           
           </div>
}

export default PokemonList;