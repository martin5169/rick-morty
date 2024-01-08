import { useState, useEffect } from "react";
import "./App.css";
import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBProgress,
  MDBProgressBar,
  MDBBtn,
  MDBInput 
} from "mdb-react-ui-kit";

import titulo from "/ttile.png"
import logo from "/rm.png";
import next from "/icons8-next-48.png";
import previous from "/icons8-previous-48.png";

interface Character {
  id: number;
  name: string;
  species: string,
  type: string,
  gender: string,
  status: string,
  location: {
    name: string;
  },
  origin: {
    name: string;
  };
  image:string,
}

function App() {
  const [listadoPersonajes, setListadoPersonajes] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [buscado, setBuscado] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const start = (page - 1) * 28 + 1;
      const characterIds = Array.from({ length: 28 }, (_, index) => start + index);
      const url = `https://rickandmortyapi.com/api/character/${characterIds.join(",")}`;

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
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: { results: Character[] } = await response.json();

      setListadoPersonajes(data.results);
      setBuscado(searchQuery);
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
        <MDBInput label='Busca tu personaje favorito' type='text' id='formWhite' contrast onChange={(e) => handleSearch(e.target.value)} value={buscado}/>
        <button onClick={handleNextPage}>
        <img src={next} alt="" />
        </button>
      </div>

      <div className="listado">
      {loading && <p>Buscando personajes..</p>}
        {error && <p>{error}</p>}
        {listadoPersonajes.length>0 && listadoPersonajes.map((p) => (
          <MDBCard
          key={p.id}
          alignment='center'
          >
                <MDBCardImage
                  src={p.image}
                  alt={p.name}
                />
         
               <MDBCardBody>
                  <MDBCardTitle>{p.name}</MDBCardTitle>
                  <MDBCardText>
                    <small className="text-muted">Status</small>
                    <MDBProgress>
                      <MDBProgressBar
                        bgColor={p.status === "Alive" ? "success" : "danger"}
                        striped
                        animated
                        width="100"
                        valuemin={0}
                        valuemax={100}
                      />
                    </MDBProgress>
                
                 
                </MDBCardText>
                <MDBBtn outline className='mx-2' color='dark'>
          INFO
      </MDBBtn>
                </MDBCardBody>
            
          </MDBCard>
        ))}
      </div>
    </div>
  );
}

export default App;
