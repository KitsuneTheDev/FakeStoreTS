import { useEffect, useState } from 'react';
import './App.css'
import { getProducts } from './api/getProducts.api.ts';
import type { ProductType } from './types/product.type.ts';
import type { Response } from './types/api.type.ts';

function App() {

  const [products, setProducts] = useState<ProductType[] | null>(null);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response: Response<ProductType[]> = await getProducts();
      if(response.data) {
        setProducts(response.data);
      } else {
        throw new Error(`No data after fetching.`);
      }
    } catch(error) {
      console.error('Error while fetching products: ', error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div className='products-container'>
      {products?.map((product, index) => {
        return(
          <div className='product-card' key={index}>
            <div className='card-cover'>
              <img src={product.image} alt={product.title} />
            </div>
            <div className='card-detail'>
              <div className='detail-header'>
                <h1>{product.title}</h1>
              </div>
              <div className='detail-body'>
                <div className='body-top'>
                  <h3>{product.description}</h3>
                  </div>
                <div className='body-bottom'>
                  <div className='bottom-left'>
                    $ {product.price}
                  </div>
                  <div className='bottom-right'>
                    <div className="category">
                      {product.category}
                    </div>
                    <div className="rate">
                      Rating: {product.rating.rate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default App
