import { Box, Stack, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieList from '../components/MovieList';

const Homepage = () => {
  const [movies, setMovies] = useState();
  const [filteredMovie, setFilteredMovie] = useState();

  useEffect(() => {
    (
      
        async () => {
          try {
          const { data } = await axios.get("/movies/");
          setMovies(data)
        } catch (error) {
          console.error("Error fetching movies:", error)
        }
        }
      
      
    )()

  }, [])

  const handleChange = (e) => {
    if (!e.target.value) {
      setFilteredMovie()
    }
    let f = movies.filter(el => el.title.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredMovie(f)
  }


  return (
    <Box sx={{
      width: "90%",
      margin: "0 auto",
      padding: "10px"
    }}>
      <Stack direction="column" justifyContent="center" rowGap="2rem">
        <TextField variant="outlined" onChange={(e) => {
          handleChange(e)
        }} />
        <Stack direction="column" rowGap="2rem">
          {

            (filteredMovie ? filteredMovie : movies)?.map((el, key) => {
              return <MovieList key={key} id={el.id} title={el.title} description={el.description} date_released={el.date_released} smallPosterUrl={el.extra_small_poster_url}/>
            })
          }
        </Stack>
      </Stack>
    </Box>
  )
}

export default Homepage
