import { use, useEffect } from "react";
import ProtectedRoute from "../component/auth/ProtectedRoute";
import { getApi } from "../services/service";


const Cart = () => {
    const data = [{
    "id": 1,
    "name": "Product Name",
    "quantity": 2,
    "price": 199.99,
    "image": "product-image-url.jpg"
  },
  {
    "id": 2,
    "name": "Product Name",
    "quantity": 2,
    "price": 199.99,
    "image": "product-image-url.jpg"
  },
  {
    "id": 3,
    "name": "Product Name",
    "quantity": 2,
    "price": 199.99,
    "image": "product-image-url.jpg"
  }

];

    useEffect(() => {
        // const getCart = async() =>{
        //       try {
        //     const post = await getApi(API_URL.CART, data)
        //     if (!post.ok) {
        //         throw error
        //     }
        // } catch (error) {
        //     alert("login failed")
        //     console.log(error, "error")
        // }
        // }
        // getCart()
    },[])

    const removeCart = (id) => {
        console.log(id, "remove cart item");
    }
    
    return (
        
        <div>
            {/*  <ProtectedRoute>
            {data.map(item => (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <h2>{item.name}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                    <button>Remove</button>         
                </div>
            ))} */}
            {data.map((item, id) => <div className="d-flex cart" key={id}>
                <img src={item.image} />
               <div>
                 <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
                 <button className="themebtn" onClick={() => removeCart(item.id)}> Remove</button>
               </div>
                 
                </div>)}

            {/* <div className="cart">
                <img src="" alt="Cart Icon" />
                <h1>Cart Page</h1>
                <p>This is where the cart items will be displayed.</p>
                <button>remove</button>
            </div> */}
            {/* </ProtectedRoute> */}
        </div>
    );
}
export default Cart;