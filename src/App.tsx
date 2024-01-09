import { useState, useEffect } from "react";
import "./App.css";
import { MDBInput } from "mdb-react-ui-kit";
import titulo from "/ttile.png";
import logo from "/rm.png";
import next from "/icons8-next-48.png";
import previous from "/icons8-previous-48.png";
import CharacterCard from "./CharacterCard";
import notFound from "/notFound.png";

interface Character {
  id: number;
  name: string;
  species: string;
  type: string;
  gender: string;
  status: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
  image: string;
  episode: [];
}

function App() {
  const [listadoPersonajes, setListadoPersonajes] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [buscado, setBuscado] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCharacters = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const start = (page - 1) * 28 + 1;
      const characterIds = Array.from(
        { length: 28 },
        (_, index) => start + index
      );
      const url = `https://rickandmortyapi.com/api/character/${characterIds.join(
        ","
      )}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Character[] = await response.json();
      setListadoPersonajes(data);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    fetchCharacters(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchCharacters(currentPage - 1);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);
      setIsModalOpen(false);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchQuery}`
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data: { results: Character[]; error?: string } = await response.json();
  
      if (data.error) {
        setListadoPersonajes([]);
      } else if (data.results.length === 0) {
        setListadoPersonajes([]);
      } else {

        setListadoPersonajes(data.results || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="contenedor">
    <div>
      <img src={logo} style={{ maxWidth: "210px" }} alt="" />
      <img src={titulo} style={{ maxWidth: "640px" }} alt="" />
    </div>

    <div className="page-buttons">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        <img src={previous} alt="" />
      </button>
      <button onClick={() => fetchCharacters(1)}>VER TODOS</button>
      <MDBInput
        label="Busca tu personaje favorito"
        type="text"
        id="formWhite"
        contrast
        onChange={(e) => setBuscado(e.target.value)}
        value={buscado}
      />
      <button onClick={() => handleSearch(buscado)}>BUSCAR</button>
      <button onClick={handleNextPage}>
        <img src={next} alt="" />
      </button>
    </div>

    <div className="listado">
      {error && <img src={notFound} alt="" className="nf"/>}
      {!error && listadoPersonajes.length > 0 ? (
        listadoPersonajes.map((p) => (
          <CharacterCard key={p.id} character={p} />
        ))
      ) : null}
    </div>
  </div>
);
}

export default App;
