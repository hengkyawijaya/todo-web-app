import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import authAction from '../../action/authAction';

const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

class Header extends Component {
    

    state = {
        auth: false,
        anchorEl: null,
      };

    componentDidMount(){
      this.props.checkAuth();
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

      handleLogout = () => {
        this.setState({ anchorEl: null });
        localStorage.removeItem('todo-token');
        
      }
    render(){
        const { classes, auth } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);



      return (
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Title
            </Typography>
            {auth ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button color="inherit">Login</Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      )
    }
  }
  
  Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  function mapStateToProps({ auth }){
    return {
      auth
    }
  }

export default connect(mapStateToProps, authAction)(withStyles(styles)(Header));