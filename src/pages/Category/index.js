import { useParams,useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductsCategory, getCategory } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import { PaginationCategory } from "../../shared/components/PaginationCategory";
const Category = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [pages, setPages] = useState({})
  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const page = Number(searchParams.get("page")) || 1; // Khi tìm kiếm lần đầu thì hiển thị trang 1, Khi bấm vào trang nào thì hiển thị trang đó.
  useEffect(() => {
    // Get Products By Category ID && Get Total Products
    getProductsCategory(id, {
      params: {
        page,
        limit: 9,
      }
    })
      .then(({ data }) => {
        setProducts(data.data.docs);
        setTotal(data.data.pages.total);
        setPages(data.data.pages);
      })
      .catch((error) => console.log(error));


    getCategory(id)
    .then(({data})=> setCategory(data.data.name))
    .catch((error)=> console.log(error));  



  }, [id,page]);
  return (
    <>
      {/*	List Product	*/}
      <div className="products">
        <h3>{category} (hiện có {total} sản phẩm)</h3>
        <div className="product-list card-deck">
          {
            products.map((item, index) =>
              <ProductItem key={index} item={item} />
            )
          }
        </div>
      </div>
      {/*	End List Product	*/}
      <div id="pagination">
        <PaginationCategory pages={pages}/>
      </div>
    </>
  );
};
export default Category;
