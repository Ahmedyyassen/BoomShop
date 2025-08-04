import { Skeleton } from "../ui/skeleton"

const SingleProductSkeleton = () => {
  return (
     <div className="container mx-auto py-12 flex justify-between items-center">
            <div className="w-[40%]">
              <div className="flex items-center justify-center mb-6">
                <Skeleton className="w-[450px] h-[450px]" />
              </div>
              <div className="flex justify-center gap-4 items-center">
                { Array(3).fill(0).map((_,i)=>(
                  <Skeleton key={i}  className="h-32 w-1/4 cursor-pointer" />
                ))}
              </div>
            </div>
    
            <article className="w-[58%]">
               <Skeleton className="mb-4 h-12 w-40" />
               <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-54 my-5" />
                <Skeleton className=" mb-5 w-54 h-12" />
                <Skeleton className=" mb-5 w-54 h-12" />
                <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                </div>
                <Skeleton className="my-5 w-3/4 h-16" />
                <Skeleton className="my-5 w-46 h-16" />

                
                <article className="flex gap-2 mt-6">
                    <Skeleton className="w-12 h-12"/>
                    <Skeleton className="w-12 h-12"/>
                  </article>
            </article>
        </div>
  )
}

export default SingleProductSkeleton
