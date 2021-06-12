import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const MoviePanel = props => {

    const [comments, setComments] = useState([{
        name: 'John',
        message: 'Awesome Movie!'
    }, {
        name: 'Jasmine',
        message: 'It had its ups and downs.'
    }]);

    const [comment, setComment] = useState({
        name: '',
        message: ''
    });



    const { Film, Genre, Profitability, Year } = props.movie;

    const handleValueChange = e => {
        let obj = { ...comment, [e.target.name]: e.target.value }
        setComment(obj)
    }


    const handleSubmit = () => {


        setComments([...comments, comment]);
        setComment({
            name: '',
            message: ''
        })

    }


    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='body1'>
                    {Film}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item >
                        <Typography>
                            Genre: {Genre}
                        </Typography>
                        <Typography>
                            Studio: {props.movie["Lead Studio"]}
                        </Typography>
                        <Typography>
                            User Rating: {props.movie["Audience score "]}%
                        </Typography>
                        <Typography>
                            Profitability: {Math.round(Profitability * 10) / 10} (rounded to the nearest decimal)
                        </Typography>
                        <Typography>
                            Rotten Tomatoes Rating: {props.movie["Rotten Tomatoes "]}
                        </Typography>
                        <Typography>
                            Worldwide Gross: {props.movie["Worldwide Gross"]}
                        </Typography>
                        <Typography>
                            Year Released: {Year}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item >
                        <Typography variant='body2'>
                            <b>Comments</b>
                        </Typography>
                    </Grid>

                    {comments.map((comment, i) => (
                        <Grid key={i} item xs={12}>
                            <Typography>
                                <b>{comment.name}</b>: {comment.message}
                            </Typography>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='name'
                            variant='standard'
                            name='name'
                            onChange={handleValueChange}
                            value={comment.name}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Comment'
                            variant='standard'
                            name='message'
                            onChange={handleValueChange}
                            value={comment.message}

                        />
                    </Grid>
                    <Grid item xs={12} align='right'>
                        <Button color='primary' variant='contained' onClick={handleSubmit}>
                            Add Comment
                        </Button>
                    </Grid>


                </Grid>
            </AccordionDetails>

        </Accordion>
    )
}

export default MoviePanel;