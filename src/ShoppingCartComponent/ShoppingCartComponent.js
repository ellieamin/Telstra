import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import T from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Close from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    imgPreview: {
      width: 50,
    },
    ShoppingCartIcon: {
      fontSize: 60,
      fill: '#FF3B3F',
    },
    shoppingList: {
      textAlign: 'center',
      width: '100%',
      backgroundColor: '#EFEFEF',
    },
    closeButton: {
      float: 'left',
      margin: 5,
    },
    shoppingCard: {
      paddingBottom: 20,
    },
    cardInfo: {
      textAlign: 'left',
    },
    shoppingCardContainer: {
      marginBottom: 20,
    },
    shoppingCardTitle: {
      backgroundColor: '#CAEBF2',
      padding: '14px 0',
    },
    shoppingCartFooter: {
      padding: 20,
      textAlign: 'left',
    },
    total: {
      paddingBottom: 20,
    },
    checkoutButton: {
      fontSize: 16,
      fontWeight: 'bold',
      backgroundColor: '#FF3B3F',
      color: '#FFFFFF',
      '&:hover': {
        color: '#FF3B3F',
        backgroundColor: '#FFFFFF',
      },
    },
  });


class ShoppingCartComponent extends Component {

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
    const { classes, productList, total, _handleAddBack } = this.props;

    return (
        <React.Fragment>
            <Card className={classes.shoppingList}>
                  <Typography variant="h5" className={classes.shoppingCardTitle}>
                    Shopping cart
                    </Typography>
                  <CardContent>
                    {Object.keys(productList).length === 0 &&
                      <React.Fragment>
                        <ShoppingCart className={classes.ShoppingCartIcon} />
                        <Typography variant="body2">
                          Your shopping card is empty
                        </Typography>
                      </React.Fragment>
                    }
                    {
                      productList.map((i) => {
                        return(
                          <Card className={classes.shoppingCardContainer}>
                            <IconButton aria-label="Delete" className={classes.closeButton} onClick={() => {_handleAddBack(i)}}>
                                <Close fontSize="small" />
                              </IconButton>
                              <Grid container className={classes.shoppingCard}>
                                  <Grid item lg={5} xs={5}>
                                      <img src={i.productImage} alt={i.productName} className={classes.imgPreview}/>
                                    </Grid>
                                    <Grid item lg={7} xs={7} className={classes.cardInfo}>
                                      <Typography variant="h6">
                                        {i.productName}
                                      </Typography>
                                      <Typography variant="body2">
                                        {`$${i.price} AUD`}
                                      </Typography>
                                    </Grid>
                              </Grid> 
                          </Card>
                        )
                      })
                    }
                  </CardContent>
                  {Object.keys(productList).length > 0 &&
                  <div className={classes.shoppingCartFooter}>
                  <Typography variant="h5" className={classes.total}>
                        Total: {`$${total} AUD`}
                    </Typography>
                    <Button
                      classes={{root: classes.checkoutButton}}
                      variant="contained" 
                      color="default"
                    >
                      Checkout
                    </Button>
                  </div>
                  }
                </Card>
        </React.Fragment>
    );
  }
}

export default withStyles(styles, {
	withTheme: true,
})(ShoppingCartComponent);
