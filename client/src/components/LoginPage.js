import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Consumer from './ConfigProvider';
import { CircularProgress } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/odders17/Football-info-scores-and-tables'>
        Liron-Perel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    color: '#dddddd',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

class LoginPage extends React.Component {
  _isMounted = false;

  state = {
    loginOrRegister: 'Login',
    email: '',
    password: '',
    fullname: '',
    rememberMe: true,
    error: '',
    isLoading: false
  };

  toggleLoginRegister = () => {
    const newVal =
      this.state.loginOrRegister === 'Login' ? 'Register' : 'Login';
    this.setState({
      loginOrRegister: newVal,
      email: '',
      password: ''
    });
  };

  handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    });
  };

  handleSubmit = (context, e) => {
    e.preventDefault();

    this.setState({
      isLoading: true
    });

    // if user tries to login - handleLogin
    // if user tries to register - handleRegister
    if (this.state.loginOrRegister === 'Login') {
      this.handleLogin(context.loginUser);
    } else this.handleRegister(context.registerUser);

    // delete error
    this.setState({
      error: ''
    });
  };

  handleLogin = async loginUser => {
    if (this._isMounted) {
      try {
        const loginResult = await loginUser(
          this.state.email,
          this.state.password
        );
        if (loginResult.status === 'OK') {
          if (this.state.rememberMe) {
            localStorage.setItem('user-token', loginResult.content.token);
          }
        }
        if (loginResult.status === 'ERR') {
          this.setState({
            error: loginResult.content[0].msg,
            isLoading: false
          });
        }
      } catch (error) {
        this.setState({
          error: error.message,
          isLoading: false
        });
      }
    }
  };

  handleRegister = async registerUser => {
    if (this._isMounted) {
      try {
        const loginResult = await registerUser(
          this.state.email,
          this.state.password,
          this.state.fullname
        );
        if (loginResult.status === 'OK') {
          localStorage.setItem('user-token', loginResult.content.token);
        }
        if (loginResult.status === 'ERR') {
          this.setState({
            error: loginResult.content[0].msg,
            isLoading: false
          });
        }
      } catch (error) {
        this.setState({
          error: error.message,
          isLoading: false
        });
      }
    }
  };

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { classes } = this.props;
    return (
      <Consumer>
        {context => (
          <Container
            component='main'
            maxWidth='xs'
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          >
            <div className={classes.paper}>
              <CssBaseline />
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                {this.state.loginOrRegister}
              </Typography>
              <form
                className={classes.form}
                onSubmit={e => this.handleSubmit(context, e)}
                noValidate
              >
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {this.state.loginOrRegister === 'Login' ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value='remember'
                        name='rememberMe'
                        color='primary'
                        checked={this.state.rememberMe}
                        onChange={this.handleChange}
                      />
                    }
                    label='Remember me'
                  />
                ) : (
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='fullname'
                    label='Your Name'
                    name='fullname'
                    value={this.state.fullname}
                    onChange={this.handleChange}
                  />
                )}
                <div className={classes.wrapper}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    disabled={this.state.isLoading}
                  >
                    {this.state.loginOrRegister}
                    {this.state.isLoading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </Button>
                </div>
                <Grid container className={classes.registerContainer}>
                  <Grid item>
                    <Link
                      href='#'
                      onClick={this.toggleLoginRegister}
                      variant='body2'
                    >
                      {this.state.loginOrRegister === 'Login'
                        ? "Don't have an account? Register"
                        : 'Already have an account? Login'}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              open={this.state.error.length > 0}
              autoHideDuration={3000}
              onClose={() => {
                this.setState({
                  error: ''
                });
              }}
            >
              <Alert severity='error'>{this.state.error}</Alert>
            </Snackbar>
          </Container>
        )}
      </Consumer>
    );
  }
}

export default withStyles(styles)(LoginPage);