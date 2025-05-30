import { useState, useEffect } from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
const Home = () => {
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [latestProduct, setLatestProduct] = useState([]);
  useEffect(()=>{
    // Get Featured
    getProducts({
      params:{
        limit: 6,
        is_featured: true,
      }
    })
      .then(({data})=>setFeaturedProduct(data.data.docs))
      .catch((error)=>console.log(error));

    // Get Latest
    getProducts({
      params:{
        limit: 6,
      }
    })
      .then(({data})=>setLatestProduct(data.data.docs))
      .catch((error)=>console.log(error));
  }, []);
  return (
    <>
      {/*	Feature Product	*/}
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {
            featuredProduct.map((item, index)=>
              <ProductItem key={index} item={item}/>
            )
          }
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {
            latestProduct.map((item, index)=>
              <ProductItem key={index} item={item}/>
            )
          }
        </div>
      </div>
      {/*	End Latest Product	*/}
    </>
  );
};
export default Home;
