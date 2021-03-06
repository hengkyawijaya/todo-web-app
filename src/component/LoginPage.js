import React, { Component } from 'react';
import { connect  } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import authAction from '../action/authAction';

import { LOCAL_TOKEN } from '../config';
import LogoHospital from '../friendship.png'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: 20
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: '100%',
    },
    menu: {
      width: 200,
    },
    button: {
        width: '100%',
        margin: theme.spacing.unit,
      },
    logo: {
        width: '30%',
        height: '30%',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px'
    }
    
  });

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password: ''     
        }

        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    componentWillMount(){
        const token = localStorage.getItem(LOCAL_TOKEN);
        if(token){
            this.props.history.push('/')
        }  
    }

    componentDidMount(){
        document.title = "Login | TODO ";
        
    }


    onHandleChange(e) {
        
        this.setState({
            [e.target.name] : e.target.value
        })

    }

    onHandleSubmit(e){
        const data = this.state;
        const { loginUser } = this.props;

        e.preventDefault()

        loginUser(data, () => this.props.history.push('/'))
        
    }

    render(){
        const { classes } = this.props
        const { email, password } = this.state

        return (
            <div className='login-bg'>
                <Grid style={{ height: '100%' }} container spacing={24} justify='center' alignItems='center'>

                    <Grid item xs={10} sm={8} md={4} lg={3}>
                        <Paper >

                        <form  className={classes.container} noValidate autoComplete="off" onSubmit={e => this.onHandleSubmit(e)}>

                            <img className={classes.logo} src={LogoHospital}/>

                            <TextField
                            id="email"
                            label="Email"
                            name="email"
                            className={classes.textField}
                            onChange={e => this.onHandleChange(e)}
                            value={email}
                            margin="normal"
                            />
                            <TextField
                            type='password'
                            id="password"
                            label="Password"
                            name="password"
                            className={classes.textField}
                            onChange={e => this.onHandleChange(e)}
                            value={password}
                            margin="normal"
                            />

                            
                            <Button type='submit' style={{ marginTop: 30 }} variant="raised" color="primary" className={classes.button}>
                                Login
                            </Button>
                            <Button  type='button' style={{ marginTop: 30 }} variant="raised" color="secondary" className={classes.button} 
                              component={Link}
                              to='/register'
                            >
                              Signup
                            </Button>

                         </form>

                        </Paper>
                        </Grid>
                </Grid>

            </div>
            
        )
    }
}


LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps ({ auth }) {
    return {
        auth
    }
}
  

export default connect(mapStateToProps, authAction)(withStyles(styles)(LoginPage));