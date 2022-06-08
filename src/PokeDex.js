import "./App.css";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import { filter, sortBy } from "lodash";


function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("white");
  const [q, setQ] = useState('');
  const [filterresults, setFilterresults] = useState([]);

  useEffect(() => {
    const getpokedox = () => {
      setIsLoading(true);
      setTimeout(async () => {
        const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
        setPokemons(data.results);
        setIsLoading(false);
      }, 3000);
    };
    getpokedox();
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
    },
    overlay: { backgroundColor: "grey" },
  };


  const onSearch = (search) => {
    setIsLoading(true)
    console.log('searchterm-----', search, pokemons)
    let sortData = [];
    setFilterresults([]);
    if (search !== '' && search !== undefined && search !== null) {
      const searchdata = filter(
        pokemons,
        (o) => o.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
      setFilterresults(searchdata);
      sortData = sortBy(filterresults, (o) => o.name.startsWith(search));
      console.log('searchviatitle-----', sortData)
      setIsLoading(false)
    }
    else {
      setFilterresults(pokemons);
      sortData = sortBy(filterresults, (o) => o.name.startsWith(search));
      setIsLoading(false)
    }
  }


  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex !</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex,
              and show a list of pokemon name.
            </li>
            <li>Implement React Loading and show it during API call</li>
            <li>
              when hover on the list item , change the item color to yellow.
            </li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>
              If you do more than expected (E.g redesign the page / create a
              chat feature at the bottom right). it would be good.
            </li>
          </ul>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                <b>Implement loader here</b>
                <ReactLoading
                  type={"balls"}
                  color={"#fff"}
                  height={"20%"}
                  width={"20%"}
                />
              </header>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>
            <div className="wrapper">
              <div className="search-wrapper">
                <label htmlFor="search-form">
                  <input
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Search for..."
                    value={q}
                    onChange={(e) => { setQ(e.target.value); onSearch(e.target.value) }}
                  />
                </label>
              </div>
            </div>
            <b>Implement Pokedex list here</b>
            <ul>
              {filterresults.length > 0 ?
                pokemons.map((pokemon, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setColor("yellow")}
                    onMouseLeave={() => setColor("white")}
                    style={{ color: color }}
                    onClick={() => setPokemonDetail(true)}
                  >
                    <label>{pokemon.name}</label>
                  </li>
                ))
                :
                pokemons.map((pokemon, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setColor("yellow")}
                    onMouseLeave={() => setColor("white")}
                    style={{ color: color }}
                    onClick={() => setPokemonDetail(true)}
                  >
                    <label>{pokemon.name}</label>
                  </li>
                ))
              }
            </ul>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#/">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#/">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#/">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#/">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#/">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <div>
            Requirement:
            <ul>
              <li>show the sprites front_default as the pokemon image</li>
              <li>
                Show the stats details - only stat.name and base_stat is
                required in tabular format
              </li>
              <li>Create a bar chart based on the stats above</li>
              <li>
                Create a buttton to download the information generated in this
                modal as pdf. (images and chart must be included)
              </li>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;