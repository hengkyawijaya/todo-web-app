import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import postAction from '../action/postAction';
import { LOCAL_TOKEN } from '../config';

const styles = theme => ({
  root: {
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  wrapper: {
    maxWidth: 400,
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
});


class HomePage extends Component {

  constructor(props){
    super(props)
    this.state = {
      search:null,
      searchBy:null,
      order:null, 
      orderBy:null,
      page:null,
      limit:null,
      content: '',
      anchorEl: null,
      menu:null,
      edit: null,
      contentEdit: null
    }
  }

  componentWillMount(){
    const token = localStorage.getItem(LOCAL_TOKEN);
    if(!token){
        this.props.history.push('/login')
    }  
  }
  
  componentDidMount(){
      const { search, searchBy, order, orderBy, page, limit } = this.state


      this.props.fetchPosts({ search, searchBy, order, orderBy, page, limit  });
  }

  handleFetchPosts = () => {
       const { search, searchBy, order, orderBy, page, limit } = this.state
      this.props.fetchPosts({ search, searchBy, order, orderBy, page, limit  });
  }

  handleClose = () =>{
    this.setState({
      anchorEl: null,
      menu: null
    })
  }

  handleClick = (e,id) => {
    console.log(id);

    this.setState({
      anchorEl: id,
      menu: e.target
    })
  }

  handleDelete = async (id) => {
    console.log(id);

    await this.props.deletePost({id}, () => this.handleFetchPosts())

    this.handleClose();
  }

  handleEdit = (id, content) => {
    this.setState({
      edit: id,
      contentEdit: content
    })
    this.handleClose();
  }

  handleUpdate = async (e) => {
    e.preventDefault();
    const { contentEdit, edit } = this.state;
    await this.props.updatePost({id: edit, post: { content: contentEdit } }, () => this.handleFetchPosts())

    this.setState({
      edit: null,
      contentEdit: ''
    })

  }

  renderPost() {
    const { posts, classes, auth } = this.props;
    const { anchorEl, menu, edit, contentEdit } = this.state;
    

    return posts.map(post => {
      return (
        <Grid item xs={12} md={7}>
        <Paper className={classes.paper}>
          
            
            {
              edit === post._id ? (
                <Grid container wrap="nowrap" spacing={16}>
                  <Grid item xs>
                  <form onSubmit={e => this.handleUpdate(e)} >
              <TextField
                id="multiline-flexible"
                label="Post"
                name="contentEdit"
                multiline
                fullWidth
                value={contentEdit}
                onChange={e => this.handleChange(e)}
                className={classes.textField}
                margin="normal"
              />
             
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Send
              </Button>
              <Button type="button" onClick={e => this.setState({ edit: null, contentEdit: '' })} variant="contained" color="secondary" className={classes.button}>
                Close
              </Button>
              </form>


                  </Grid>                  
                </Grid>
              ) : (
                <Grid container wrap="nowrap" spacing={16}>
                  <Grid item>
              <Avatar>{post.user.name.charAt(0)}</Avatar>
            </Grid>
                  <Grid item xs >
              <Typography>{post.user.name}</Typography>
              <Typography >{post.content}</Typography>
            </Grid>
            {
              auth._id === post.user._id ? (
                <Grid item >
                <IconButton
              aria-label="More"
              aria-owns={`menu-${post._id}`}
              aria-haspopup="true"
              onClick={e => this.handleClick(e, post._id)}
            >
               <MoreVertIcon />
              </IconButton>

              <Menu
                id={post._id}
                anchorEl={menu}
                open={anchorEl === post._id ? true : false}
                onClose={e => this.handleClose()}
              >
                
                  <MenuItem  onClick={e => this.handleEdit(post._id, post.content)}>
                    Edit
                  </MenuItem>
                  <MenuItem  onClick={e => this.handleDelete(post._id)}>
                    Delete
                  </MenuItem>
                
              </Menu>
            </Grid>
              ) : false

            }
            

                </Grid>
              )
            }
            
          
        </Paper>
        </Grid>
      )
    })
  }

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const { content, search, searchBy, order, orderBy, page, limit } = this.state;
    e.preventDefault();
    this.props.createPost({ content }, () => this.props.fetchPosts({ search, searchBy, order, orderBy, page, limit  }));
    this.setState({
      content: ''
    })
  }

  formPost(){
    const { classes } = this.props;
    const { content } = this.state;

    return (
      <Grid item xs={12} md={7}>
      
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={16}>
            <Grid item xs={12} >
            <form onSubmit={e => this.handleSubmit(e)} >
              <TextField
                id="multiline-flexible"
                label="Post"
                name="content"
                multiline
                fullWidth
                value={content}
                onChange={e => this.handleChange(e)}
                className={classes.textField}
                margin="normal"
              />
             
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Send
              </Button>
              </form>
            </Grid>
            
          </Grid>
         
        </Paper>
       
        </Grid>
    )
  }

  render(){
    const { posts, classes } = this.props;
  
    if(!posts){
      return 'Loading';
    }

    return (
      <div className={classes.root}>
      <Grid container justify='center' >  
          {this.formPost()}
          { this.renderPost()}
      </Grid>
    </div>
    )
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ posts, auth }){
  return {
    posts,
    auth
  }
}

export default connect(mapStateToProps, postAction)(withStyles(styles)(HomePage));