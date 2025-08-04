import PageTransition from "@/components/PageTransition"
import HeroSlider from "../components/HeroSlider"
import SlideProduct from "../components/slideProduct/SlideProduct"

const Home = () => {
  return (
    <PageTransition>
      <div className="pt-50">
        <HeroSlider />

        <SlideProduct />
    </div>
    </PageTransition>
  )
}

export default Home
