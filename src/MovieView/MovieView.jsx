import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import MoviePanel from './MoviePanel';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';





const MovieView = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false);
    const [searchStr, setSearchStr] = useState('');


    const styles = {
        root: {
            background: "radial-gradient(ellipse at center," +
                "#808080" +
                " 0," +
                "#000000" +
                " 100%)",
            height: '100%',
            minHeight: '101vh'
        },
        title: {
            backgroundColor: 'grey'
        },
        panel: {
            margin: '1%',
            width: '80%',
        },
        search: {
            backgroundColor: 'white',
            border: '5%, 5%, 5%, 5%',
            width: '40%',
        }
    };


    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let res = await axios.get('https://gist.githubusercontent.com/tiangechen/b68782efa49a16edaf07dc2cdaa855ea/raw/0c794a9717f18b094eabab2cd6a6b9a226903577/movies.csv');
                let parsedData = csvJSON(res.data);
                setMovies(parsedData)
                console.log(parsedData, 'parsed Data')
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, []);



    const csvJSON = (csv) => {
        const lines = csv.split('\n')
        const result = []
        const headers = lines[0].split(',').map(x => x.replace(/[|&;$%@"<>()+,]/g, ""));
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i])
                continue
            const obj = {}
            const currentline = lines[i].split(',')
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j]
            }
            result.push(obj)
        }
        return result
    }

    const handleValueChange = (e) => {
        setSearchStr(e.target.value)
    }



    return (
        <Paper style={styles.root}>
            <Grid container justfiy='center' spacing={5} >
                <Grid item xs={12} align='center' style={styles.title} >
                    <Typography variant='h1' >
                        Movies
                </Typography>
                    <TextField
                        style={styles.search}

                        label='Search Movie'
                        variant='standard'
                        name='search'
                        onChange={handleValueChange}
                        value={searchStr}

                    />
                    {loading ? <LinearProgress /> : null}

                </Grid>
                {<Grid container justify='center' >
                    {movies
                        .filter(movie => {
                            if (searchStr === '') {
                                return movie
                            } else if (movie.Film.toLowerCase().includes(searchStr.toLowerCase())) {
                                return movie
                            }
                        })
                        .map((movie, i) => (
                            <Grid key={i} item xs={6} style={styles.panel}>
                                <MoviePanel movie={movie} />
                            </Grid>
                        )).reverse()}

                </Grid>}

            </Grid >
        </Paper>
    )
}

export default MovieView