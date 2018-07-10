import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  progress: {
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
    left: 0,
    right: 0,
  },
});



class Loading extends Component {
  render(){
    const { classes } = this.props
    return (
      <div style={{ flexGrow: 1, width: '100%', height: '100vh', position: 'relative' }}>
        <Grid style={{ height: '100%' }} container spacing={24} justify='center' alignItems='center'>
        <Grid item>
        <CircularProgress className={classes.progress} size={50} />
        </Grid>
        </Grid>
      </div>
    )
  }
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Loading);