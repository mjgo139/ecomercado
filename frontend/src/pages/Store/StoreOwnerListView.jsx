import { useEffect } from "react";
import { useStore } from "../../context/StoresContext";
import Header from "../../components/Common/Header";
import StoreCard from "../../components/Store/StoreCard";

function StoreOwnerListView() {
  const { getStoresByOwner, stores } = useStore();

  useEffect(() => {
    getStoresByOwner()
  }, [stores])

  return (
    <>
      <Header />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {stores.map(store => (
          <StoreCard store={store} key={store._id} />
        ))}
      </div>
    </>
  )
}

export default StoreOwnerListView