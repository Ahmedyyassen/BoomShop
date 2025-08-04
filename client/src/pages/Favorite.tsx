import PageTransition from "@/components/PageTransition"
import Product from "@/components/slideProduct/Product";
import { useAppSelector } from "@/hooks/useApp"

const Favorite = () => {
  const favList = useAppSelector(state=> state.fav);

  return (
    <PageTransition >
     <section className="container mx-auto my-32 pt-20">
      <article className="border-b-4 w-fit border-main-main py-4 mb-3">
          <h2 className="text-3xl text-main-main font-bold capitalize">Your Favorites</h2>
      </article>

    <div className="flex flex-wrap gap-4 justify-start">
      {favList.length > 0 ? favList.map((item)=>(
        <div key={item.id}><Product item={item} /></div>
      ))
      : <p className="text-2xl text-center w-full text-main-p">No Favorites Products yet.</p> }

      </div>
    </section>
    </PageTransition>
  )
}

export default Favorite
