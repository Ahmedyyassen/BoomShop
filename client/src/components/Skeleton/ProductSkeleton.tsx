import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => {
  return (
     <article className="w-[280px] py-6 px-4 border group overflow-hidden border-main-border hover:border-main-main transition-colors rounded-lg">
          <Skeleton className="h-[200px] w-auto px-6 flex items-center justify-center mb-8" />
          <div className="space-y-4">
          <Skeleton  className="h-4 w-full" />
             <Skeleton  className="h-4 w-1/2" />
             <Skeleton  className="h-4 w-14 " />
          </div>
        </article>
  )
}

export default ProductSkeleton;
