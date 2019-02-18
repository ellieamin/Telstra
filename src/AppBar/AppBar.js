import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import T from 'prop-types';

const styles = theme => ({

    root: {
        backgroundColor: '#66B9BF',
    },

});


class App extends Component {

  static propTypes = {
		classes: T.object,
	};

	static defaultProps = {
		classes: {},
	};

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }


  
  render() {
    const { classes } = this.props;

    return (
        <div>
            <AppBar position="static" classes={{root: classes.root}}>
            <Toolbar variant="dense">
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                    Phones
                </Typography>
            </Toolbar>
            </AppBar>
        </div>
    );
  }
}

export default withStyles(styles, {
	withTheme: true,
})(App);
