import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = process.env.REACT_APP_OMDB_API_KEY;
const url = "http://www.omdbapi.com/";
const placeholderImg = "https://via.placeholder.com/300x450?text=No+Image";

const Card = ({ img }) => <img className="card" src={img || placeholderImg} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={item.Poster !== "N/A" ? item.Poster : placeholderImg} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [showMovies, setShowMovies] = useState(true); // Toggle for movies/TV shows

  useEffect(() => {
    const fetchData = async (searchTerm, setter, type) => {
      try {
        const { data } = await axios.get(`${url}?apikey=${apiKey}&s=${searchTerm}&type=${type}`);
        if (data.Search) setter(data.Search);
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      }
    };

    if (showMovies) {
      fetchData("Avengers", setPopularMovies, "movie");
      fetchData("Action", setActionMovies, "movie");
      fetchData("Comedy", setComedyMovies, "movie");
      fetchData("Horror", setHorrorMovies, "movie");
      fetchData("Drama", setDramaMovies, "movie");
    } else {
      fetchData("Breaking Bad", setTvShows, "series");
      fetchData("Stranger Things", setTvShows, "series");
      fetchData("Game of Thrones", setTvShows, "series");
    }
  }, [showMovies]);

  return (
    <section className="home">
     

      <div
        className="banner"
        style={{
          backgroundImage: showMovies
            ? `url(${popularMovies[1]?.Poster || placeholderImg})`
            : `url(${tvShows[3]?.Poster || placeholderImg})`,
            
           
           
        }}
      >
        <h1>{showMovies ? popularMovies[0]?.Title : tvShows[0]?.Title}</h1>
        <p>Year: {showMovies ? popularMovies[0]?.Year : tvShows[0]?.Year}</p>

        <div>
          <button>
            <BiPlay /> Play
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>

      {showMovies ? (
        <>
          <Row title={"Popular"} arr={popularMovies} />
          <Row title={"Action"} arr={actionMovies} />
          <Row title={"Comedy"} arr={comedyMovies} />
          <Row title={"Horror"} arr={horrorMovies} />
          <Row title={"Drama"} arr={dramaMovies} />
        </>
      ) : (
        <Row title={"TV Shows"} arr={tvShows} />
      )}
    </section>
  );
};

export default Home;
