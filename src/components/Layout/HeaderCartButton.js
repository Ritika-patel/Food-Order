  
import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const[btnIsHighlited, SetBtnIsHighlited] = useState(false)
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  
  const btnClasses = `${classes.button} ${ btnIsHighlited ? classes.bump: ''}`

  const { items } = cartCtx;
  useEffect(() => {
    if(items.length === 0){
      return;
    }
    SetBtnIsHighlited(true)

    const timer = setTimeout(()=>{
      SetBtnIsHighlited(false)
    }, 300)

    return () => {
   clearTimeout(timer)
 } 
 }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;