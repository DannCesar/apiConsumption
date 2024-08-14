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
  const [selectCharacters, setSelectCharacters] = useState<
    ListCharactersProps[]
  >([]);
  const [characterIsVisible, setCharacterIsVisible] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  );

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

  function createList() {
    const selectedCharacterForId = listOfCharacters.find(
      (character) => character.id === selectedCharacterId
    );
    const selectedEqualId = selectCharacters.some(
      (character) => character.id === selectedCharacterId
    );

    if (selectedCharacterForId && !selectedEqualId) {
      setSelectCharacters([...selectCharacters, selectedCharacterForId]);
      setCharacterIsVisible(true);
    }
    if (selectedEqualId) {
      alert(
        "As informações do personagem já estão disponiveis,selecione outro personagem."
      );
    }
  }

  function handleChangeSelectedById(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCharacterId(parseInt(event.target.value));
  }

  return (
    <>
      <div className="titleContainer">
        <h1>Rick and Morty</h1>
        <h2>Selecione seu personagem</h2>
        <div className="searchContainer">
          <select onChange={handleChangeSelectedById}>
            <option value="">Selecione um personagem</option>
            {listOfCharacters.map((character) => (
              <option value={character.id} key={character.id}>
                {character.name}
              </option>
            ))}
          </select>
          <button onClick={createList}>Buscar...</button>
        </div>
      </div>
      <div>
        {characterIsVisible && (
          <div className="geralContainer">
            {selectCharacters.map((character) => (
              <div className="infoContainer" key={character.id}>
                <span>
                  Nome: <span>{character.name}</span>
                </span>
                <span>
                  Gênero: <span>{character.gender}</span>
                </span>
                <span>
                  Espécie: <span>{character.species}</span>
                </span>
                <div>
                  <img src={character.image} alt={character.name} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
