import { useEffect, useState } from "react";
import { RickAndMortyApi } from "../api/api";
import "./styles.css";

interface ListCharactersProps {
  id: number;
  name: string;
  image: string;
  species: string;
  gender: string;
}
export default function Home() {
  const [listOfCharacters, setListOfCharacters] = useState<
    ListCharactersProps[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await RickAndMortyApi();
        console.log(data, "lista");
        setListOfCharacters(data.results);
      } catch (error) {
        alert("Erro ao obter informações");
        console.error("Erro", error);
      }
    }
    fetchData();
  }, []);
  console.log(listOfCharacters, "listagemDePersonagens");
  return (
    <>
      <div>
        <h1>Rick and Morty </h1>
        <h2>Selecione seu personagem </h2>
        <div className="searchContainer">
          <select>
            {listOfCharacters.map((character) => (
              <option key={character.id}>{character.name}</option>
            ))}
          </select>
          <button>Buscar...</button>
        </div>
      </div>
      <div>
        <div className="geralContainer">
          {listOfCharacters.map((character) => (
            <div className="infoContainer">
              <span>
                Nome: <span></span>
                {character.name}
              </span>
              <span>
                Genero: <span>{character.gender}</span>
              </span>
              <span>
                Espécie: <span>{character.species}</span>
              </span>
              <div>
                <img src={character.image} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
