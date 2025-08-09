import { useEffect, useState } from "react"
import {getApi} from '../services/service'
import API_URL from "../services/endpoint"
import ProtectedRoute from "./auth/ProtectedRoute"


const Product = () => {
    const [allProducts, setAllProducts] = useState([])


    useEffect(() => {
       const getData  = async () =>{
            try {
                const getProduct = await getApi("https://fakestoreapi.com/products")
                 setAllProducts(getProduct)
            } catch (error) {
               console.log(error);
                throw error
            }
       }
       getData()

    },[])



    return (<>
    <ProtectedRoute>
    <div className="row">
         {allProducts.map(i => <div className="col-md-3"  key={i.id}><div className="card">
            <img height={150} src={i.image}/>
            <div>
                <p>{i.title}</p>
                <p>{i.price}</p>
                <button >Add to cart</button>
            </div></div>
        </div>)}
    </div>
    </ProtectedRoute>
   

    </>)
}

export default Product