import ProductCard from "../../components/Product/ProductCard";
import Header from "../../components/Common/Header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductsContext";
import { useStore } from "../../context/StoresContext";

export default function ProductListView() {
  const { products, getProductsByStore } = useProduct();
  const { getStore } = useStore()
  const [store, setStore] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function load() {
      if (params.id) {
        localStorage.setItem('idStore', params.id)
        getProductsByStore(params.id)
        const storeData = await getStore(params.id);
        setStore(storeData);
      }
    }

    load()


  }, [products, params.id, getProductsByStore])

  return (

    <>
      <Header  store={store} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {products.map(product => (
          <ProductCard product={product} store={store} key={product._id} />
        ))}
      </div>
    </>


  )
}
