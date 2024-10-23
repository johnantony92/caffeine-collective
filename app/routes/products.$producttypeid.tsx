import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "components/ui/pagination";
import { Database } from "database.types";
import { ProductCard } from "~/components/productcard";
import { Product } from "~/types/product";
import { getAllProductForType, getBlogPostsDetails } from "~/utils/database.server";
import { getSupabaseWithSessionAndHeaders } from "~/utils/supabase.server";



const PRODUCTS_PER_PAGE = 12;

type ProductWithBrand = Database['dbo']['Tables']['products']['Row'] & {
  brand: Pick<Database['dbo']['Tables']['brand']['Row'], 'name'>
};


export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const productTypeId=parseInt(params?.producttypeid||"");
  const from = (page - 1) * PRODUCTS_PER_PAGE;
  const to = from + PRODUCTS_PER_PAGE - 1;

  const { supabase, headers } = await getSupabaseWithSessionAndHeaders({
    request,
  });

  const {  products, error, totalPages } = await getAllProductForType({
    dbClient: supabase,
    page:page
  });

  return json({
    products,
    currentPage: page,
    totalPages,
    productTypeId
  }, {
    headers
  });
};

export default function ProductsPage() {
  const { products, currentPage, totalPages,productTypeId } = useLoaderData<typeof loader>();

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Coffee Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product: ProductWithBrand) => (
          <Link to={`/products/${product.id}`} key={product.id} className="block">
            <ProductCard
              product={{
                id: product.id,
                name: product.name,
                imageurl: product.imageurl || '',
                averagerating: product.averagerating || 0,
                profile: product.profile || ''    ,
                price :product.price || 0 ,
                brandname:product.brand?.name,
                brandid:product.brandid
                    }}
            />
          </Link>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/products/${productTypeId}/?page=${currentPage - 1}`} />
            </PaginationItem>
          )}
          
          {[...Array(totalPages)].map((_, i) => {
            const pageNumber = i + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={`/products/${productTypeId}/?page=${pageNumber}`}
                    isActive={pageNumber === currentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={`/products/${productTypeId}/?page=${currentPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}