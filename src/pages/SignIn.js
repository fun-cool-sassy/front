import React ,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from './images/Frame.svg';
import { postSignIn } from '../API';
import {Redirect} from 'react-router';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [username,setUserName] = useState();
  const [password,setPassword] = useState();
  const [redirect,setRedirect]=useState(false);
  const handlePostApi = ()=>{
    if(username&&password){
        const data = {
            username:username,
            password:password
        }
        postSignIn(data).then(e=>
            setRedirect(true)
        );
    }
    else{
        alert('Please type required input form');
    }
    
}
useEffect(() => {
    if(localStorage.getItem('token')){
        setRedirect(true);
    }
}, [])
  return (
    <Container component="main" maxWidth="xs">
        { redirect&&
            <Redirect to='/'/>
        }
      <CssBaseline />
      <div className={classes.paper}>
      <Link href="/"><img src={Logo} alt="logo"/></Link>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id"
            label="ID"
            name="id"
            autoComplete="id"
            autoFocus
            onChange={e=>setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e=>setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handlePostApi}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}