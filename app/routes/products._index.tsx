import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "components/ui/pagination";
import { ProductCard } from "~/components/productcard";
import type { Product } from "~/types/product";

// This would typically come from your database
const PRODUCTS_PER_PAGE = 12;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  
  // Mock data - replace with actual database call
  const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Coffee Blend ${i + 1}`,
    imageUrl: ``,
    rating: Math.floor(Math.random() * 5) + 1,
    tags: ['beginner-friendly', 'seriously-black'],
    price: 14.99,
    description: "A delightful coffee blend perfect for any time of day.",
    reviews: []
  }));

  const totalProducts = mockProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const currentProducts = mockProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return json({
    products: currentProducts,
    currentPage: page,
    totalPages
  });
};

export default function ProductsPage() {
  const { products, currentPage, totalPages } = useLoaderData<typeof loader>();

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Coffee Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product:Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/products?page=${currentPage - 1}`} />
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
                    href={`/products?page=${pageNumber}`}
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
              <PaginationNext href={`/products?page=${currentPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}