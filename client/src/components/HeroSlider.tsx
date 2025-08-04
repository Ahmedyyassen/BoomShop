import {Swiper, SwiperSlide} from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { Link } from "react-router-dom"

const dataSlider = ["/src/img/banner_Hero1.jpg",
  "/src/img/banner_Hero2.jpg","/src/img/banner_Hero3.jpg"
]
const HeroSlider = () => {
  return (
    <>
      <Swiper className="container mx-auto rounded-2xl" pagination={true} loop={true} autoplay={{delay:2500, disableOnInteraction:false}} modules={[Pagination,Autoplay]}>
      {dataSlider.map((item)=>(
        <SwiperSlide key={item} className="relative ">
        <article className="absolute top-1/2 -translate-y-1/2 left-[5%]">
          <h4 className="text-[1vw] text-main-heading uppercase italic mb-[0.4vw]">Introducing the new</h4>
          <h3 className="text-[3vw] capitalize mb-8 text-main-main font-extrabold leading-16">Microsoft Xbox <br />  360 Controller</h3>
          <p className="text-[1.1vw] my-[2.5vw] text-main-heading" >Windows Xp/7/8/10 ps3, Tv Box</p>
          <Link className="btn" to={"/"}>Shop Now</Link>
        </article>

        <img src={item} alt={"item"} />
      </SwiperSlide>
      ))}
      </Swiper>
    </>
  )
}

export default HeroSlider
