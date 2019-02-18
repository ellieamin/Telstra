import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import T from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from './AppBar/AppBar';
import ShoppingCartComponent from './ShoppingCartComponent/ShoppingCartComponent.js'
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import './App.css';

const styles = theme => ({
  app: {
    padding: 20,
  },
  root: {
    flexGrow: 1,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },

  card: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    marginBottom: 20,
    backgroundColor: '#EFEFEF',
    [theme.breakpoints.up('md')]: {
      marginRight: 20,
		},
  },
  img: {
    width: 80,
    paddingBottom: 20,
  },
  buttonRoot: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 15,
    backgroundColor: '#FF3B3F',
    padding: 5,
    color: '#FFFFFF',
    '&:hover': {
      color: '#FF3B3F',
      backgroundColor: '#FFFFFF',
    },
  },
  phoneNames: {
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  cardFooter: {
    backgroundColor: '#CAEBF2',
    height: 55,
    position: 'relative',
  },
  price: {
    position: 'absolute',
    bottom: 0,
    left: 5,
    textAlign: 'center',
    backgroundColor: '#66B9BF',
    border: 'solid 1px #EFEFEF',
    margin: 5,
    boxShadow: '2px 2px #EFEFEF',
    width: 'auto',
    padding: 10,
    borderRadious: 4,
  },
  priceText: {
    fontSize: 20,
    lineHeight: 2,
    color: '#FFFFFF',
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
      productList: [],
      total: 0,
    };
  }

  async getData() {
 
      axios.get('http://telstra-shopping.getsandbox.com/telstra').then(res => {
        const data = res.data;
        this.setState({ data });
      })

    
  }

  componentDidMount() {
		this.getData();
  }

  _handleMove = (e) => {
    const { data, productList} = this.state;
     const [arr] = data.splice(e, 1);
     productList.push(arr);
     

      this.setState((prev) => ({
        data,
        productList,
        total: prev.total + Number(arr.price),
       }))
  };

  _handleAddBack = (e) => {
    const { productList, data} = this.state;
    const [arr] = productList.splice(e, 1);

    data.push(arr)

    this.setState((prev) => ({
      productList,
      data,
      total: prev.total - Number(arr.price),
     }))
  }

  
  render() {
    const { classes } = this.props;
    const { productList, data, total } = this.state


    return (
      <div className={classes.body}>
          <AppBar />
          <Grid 
            container
            className={classes.app}
          >
            <Grid container lg={9}>
                {
                  data.map((item, i) => {
                    if(item.isPublished === 'true') {
                      return (
                        <Grid item lg={3} xs={12} md={4}>
                          <Card className={classes.card}>
                            <CardContent>
                              <Typography variant="h6" className={classes.phoneNames}>
                                {item.productName}
                              </Typography>
                              <img
                                className={classes.img}
                                src={item.productImage} 
                                key={`${item}-phone`}
                                alt={item.productName}
                                />
                            </CardContent>
                            <div className={classes.cardFooter}>
                                <div className={classes.price}>
                                  <Typography variant="subtitle2" className={classes.priceText}>
                                    { `$${item.price} AUD`}
                                  </Typography>
                                </div>
                                <Button
                                  classes={{root: classes.buttonRoot}}
                                  variant="contained" 
                                  color="default" 
                                  className={classes.button}
                                  onClick={()=> {this._handleMove(i)}}
                                >
                                  <AddIcon />
                                  <ShoppingCart />
                                </Button>
                              </div>
                          </Card>
                        </Grid>
                      );
                    }
                  })
                }
            </Grid>
            <Grid container lg={3}>
              <Grid  lg={12} xs={12}>
                <ShoppingCartComponent
                  total={total}
                  productList={productList}
                  _handleAddBack={this._handleAddBack}
                />
              </Grid>
            </Grid>
          </Grid>
      </div>
    );
  }
}

export default withStyles(styles, {
	withTheme: true,
})(App);
