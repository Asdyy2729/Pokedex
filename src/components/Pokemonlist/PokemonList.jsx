import { useEffect, useState } from "react";
import axios from "axios";
import '../Pokemonlist/PokemonList.css'
import Pokemon from '../Pokemon/Pokemon'

function PokemonList(){

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon' )

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

    const [ pokemonListState , setPokemonsListState ] = useState({
          pokemonList: [],
          isLoading: true,
          pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
          nextUrl : '',
          prevUrl: ''

    })

async function downloadPokemons() {
    setPokemonsListState({...pokemonListState, isLoading:true})
const response = await axios.get(pokemonListState.pokedexUrl) // This downloads list of 20 pokemons


 const pokemonResults = response.data.results; // we get the array of pokemons from result

 console.log(response.data);
 setPokemonsListState((state)=>({...state,
     nextUrl : response.data.next, 
     prevUrl : response.data.previous
                                      }));


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
 setPokemonsListState((state)=>({
    ...state,
     pokemonList:res ,
      isLoading : false
    }))
 
//  setIsLoading(false);
}



 useEffect(()=>{
    downloadPokemons();
 } , [pokemonListState.pokedexUrl]); 
 
return (<div className="pokemon-list-wrapper">
           <div className="pokemon-wrapper">{(pokemonListState.isLoading) ? 'Loading....': pokemonListState.pokemonList.map((p)=><Pokemon name = {p.name} image={p.image} key={p.id} part={p.id} />)}</div> 
               <div >
                  <button className="prevButtons" disabled={pokemonListState.prevUrl == null} onClick={()=>  {
                    const urlToSet = pokemonListState.prevUrl 
                    setPokemonsListState({ ...pokemonListState, pokedexUrl: urlToSet })}} > Prev </button>
                  <button className="nextButtons" disabled={pokemonListState.nextUrl == null} onClick={()=> {
                    const urlToSet = pokemonListState.nextUrl 
                    setPokemonsListState({ ...pokemonListState , pokedexUrl: urlToSet  })}}>  Next </button>
            </div>
           
           </div>
)
}

export default PokemonList;