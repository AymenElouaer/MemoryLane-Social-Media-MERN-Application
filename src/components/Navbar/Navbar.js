import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, TextField, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import decode from 'jwt-decode';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import photo from '../../images/photo.png';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);

    };
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position='static' color='default'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Forkeeps</Typography>

                <img className={classes.image} src={photo} alt="memories image" height="60  " />
            </div>
            <Toolbar className={classes.Toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color='primary'>Sign In</Button>
                )}

            </Toolbar>









        </AppBar>
    )
}

export default Navbar
