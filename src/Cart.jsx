import React from 'react'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const Cart = ({ user, removeFromCart, cart, getTotal }) => {
    const getUniqueCart = (cart) => {
        const uniqueCart = [];
        const seen = new Set();
        for (let item of cart){
            if (!seen.has(item.id)){
                uniqueCart.push(item)
                seen.add(item.id)
            }
        }
        return uniqueCart
    };

    const getQuantity = (searchItem)=>{
        let count = 0;
        for (let item of cart){
            if (item.id === searchItem.id){
                count++
            }
        }
        return count
    };

    const removeFromCartAPI = async (product) => {
        const res = await fetch(BACKEND_URL + '/api/cart/remove', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({product_id: product.id})
        });
        const data = await res.json();
        console.log(data)
        if (data.status==='ok'){
            //
        }
    }

    const handleClick = (item) => {
        removeFromCart(item)
        // if logged in, let Flask know
        if (user.token) {
            removeFromCartAPI(item)
        }
    }

  return cart.length === 0? <h1>Your cart is empty.</h1>: (
    <table className='table table-striped'>
        <thead>
            <tr>
                <th>ID</th>
                <th></th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Remove</th>
            </tr>
        </thead>

        <tbody>
            {getUniqueCart(cart).map(item => (
                <tr key={item.id}>
                    <th>{item.id}</th>
                    <td>
                        <img src={item.img_url} style={{width: '50px', height: '50px'}}/>
                    </td>
                    <td>{item.product_name}</td>
                    <td>{getQuantity(item)}</td>
                    <td>{item.price}</td>
                    <td>{(getQuantity(item)*parseFloat(item.price)).toFixed(2)}</td>
                    <td>
                        <button className='btn btn-danger' onClick={()=>handleClick(item)}>Remove</button>
                    </td>

                </tr>
            ))}
            <tr>
                <th>Total</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>${getTotal()}</th>
                <th></th>
            </tr>
        </tbody>

    </table>
  )
}

export default Cart