import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link, useSubmit, useSearchParams, MetaFunction } from "@remix-run/react";
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
import { getAllProductForType, getAllBrands } from "~/utils/database.server";
import { getSupabaseWithSessionAndHeaders } from "~/utils/supabase.server";
import { useState, useRef, useEffect } from "react";
import { Slider } from "components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Button } from "components/ui/button";
import { X, Check, ChevronDown } from "lucide-react";
import { Badge } from "components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "components/ui/command";
import { cn } from "~/lib/utils";

const PRODUCTS_PER_PAGE = 12;

type ProductWithBrand = Database['dbo']['Tables']['products']['Row'] & {
  brand: Pick<Database['dbo']['Tables']['brand']['Row'], 'name'>
};

type Brand = {
  id: number;
  name: string;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {

  const title = "Products"; 

  return [
    { title: title },
    { name: "description", content: "Browse and filter coffee products." }, 
  ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const productTypeId = parseInt(params.producttypeid || "1");
  
  // Get filter parameters
  const minPrice = parseFloat(url.searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(url.searchParams.get("maxPrice") || "1000");
  const brandIds = url.searchParams.getAll("brands").map(id => parseInt(id));

  const { supabase, headers } = await getSupabaseWithSessionAndHeaders({
    request,
  });

  // Get all brands for the filter
  const brands = await getAllBrands({ dbClient: supabase }) as Brand[];

  // Get products with filters
  const { products, error, totalPages } = await getAllProductForType({
    dbClient: supabase,
    page: page,
    filters: {
      productTypeId,
      minPrice,
      maxPrice,
      brandIds: brandIds.length > 0 ? brandIds : undefined
    }
  });

  // Calculate the absolute min and max prices from DB for the slider
  let priceRange = { min: 0, max: 1000 };
 
  return json({
    products,
    currentPage: page,
    totalPages,
    productTypeId,
    brands,
    priceRange,
    filters: {
      minPrice,
      maxPrice,
      brandIds
    }
  }, {
    headers
  });
};

export default function ProductsPage() {
  const { 
    products, 
    currentPage, 
    totalPages, 
    productTypeId, 
    brands, 
    priceRange,
    filters 
  } = useLoaderData<typeof loader>();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const submit = useSubmit();

  // Local state for filter values before submission
  const [priceRange1, setPriceRange1] = useState<number[]>([
    filters.minPrice || priceRange.min,
    filters.maxPrice || priceRange.max
  ]);
  
  const [selectedBrands, setSelectedBrands] = useState<number[]>(
    filters.brandIds || []
  );
  
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPriceRange1([filters.minPrice, filters.maxPrice]);
    setSelectedBrands(filters.brandIds || []);
  }, [filters]);

  // Handle price range change
  const handlePriceChange = (values: number[]) => {
    setPriceRange1(values);
  };

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Reset to page 1 when filtering
    params.set("page", "1");
    
    // Set price range
    params.set("minPrice", priceRange1[0].toString());
    params.set("maxPrice", priceRange1[1].toString());
    
    // Remove all brand parameters first
    params.delete("brands");
    
    // Add selected brands
    selectedBrands.forEach(brandId => {
      params.append("brands", brandId.toString());
    });
    
    setSearchParams(params);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange1([priceRange.min, priceRange.max]);
    setSelectedBrands([]);
    
    const params = new URLSearchParams();
    params.set("page", "1");
    setSearchParams(params);
  };

  // Get brand name by id
  const getBrandName = (id: number) => {
    const brand = brands?.find((b:Brand) => b.id === id);
    return brand ? brand.name : '';
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      priceRange1[0] !== priceRange.min ||
      priceRange1[1] !== priceRange.max ||
      selectedBrands.length > 0
    );
  };
  
  // Toggle brand selection
  const toggleBrand = (brandId: number) => {
    setSelectedBrands(current => 
      current.includes(brandId)
        ? current.filter(id => id !== brandId)
        : [...current, brandId]
    );
  };

  // Select all brands
  const selectAllBrands = () => {
    setSelectedBrands(brands.map((brand: Brand) => brand.id));
  };

  // Deselect all brands
  const deselectAllBrands = () => {
    setSelectedBrands([]);
  };
  
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Coffee Products</h1>
      
      {/* Filters Section */}
      <Card className="mb-8">
        <CardHeader>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap md:flex-nowrap gap-4 items-start"> {/* Changed items-end to items-start */}
            {/* Price Range Filter */}
            <div className="w-full md:w-1/2">
              <div className="mb-2 font-medium">Price Range</div>
              <div className="pt-2 pb-2">
                <Slider
                  // Use controlled component pattern if needed, or keep defaultValue
                  value={priceRange1} // Use value for controlled
                  min={priceRange.min}
                  max={priceRange.max}
                  step={1}
                  onValueChange={handlePriceChange} // Use onValueChange for controlled
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{priceRange1[0]}</span>
                  <span>{priceRange1[1]}</span>
                </div>
              </div>
            </div>

            {/* Brands Multiselect Dropdown */}
            <div className="w-full md:w-1/2">
              <div className="mb-2 font-medium">Brands</div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className="w-full justify-between">
                    {selectedBrands.length === 0
                      ? "All Brands"
                      : selectedBrands.length === 1
                      ? getBrandName(selectedBrands[0])
                      : `${selectedBrands.length} brands selected`}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                 {/* THIS IS THE MISSING PART */}
                 <PopoverContent className="w-[--radix-popover-trigger-width] p-0"> {/* Match trigger width, remove padding */}
                  <Command>
                    <CommandInput placeholder="Search brands..." />
                    <CommandList>
                      <CommandEmpty>No brand found.</CommandEmpty>
                      <CommandGroup>
                        {brands && brands.map((brand:Brand) => (
                          <CommandItem
                            key={brand.id}
                            value={brand.name} // Use name for filtering/display
                            onSelect={() => {
                                toggleBrand(brand.id);
                                // Optional: Keep popover open after selection for multi-select
                                // setOpen(true); // Or manage focus differently
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedBrands.includes(brand.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {brand.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Apply Button */}
            {/* Adjusted margin-top slightly to align button base visually better with controls */}
            <div className="w-full mt-4 md:mt-0 md:w-auto md:pt-7"> {}
               <Button onClick={applyFilters}>Apply Filters</Button>
             </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="mb-6 flex flex-wrap gap-2">
          {(priceRange1[0] !== priceRange.min || priceRange1[1] !== priceRange.max) && (
            <Badge variant="secondary" className="px-3 py-1">
              Price: ${priceRange1[0]} - ${priceRange1[1]}
            </Badge>
          )}
          
          {selectedBrands.length > 0 && (
            <Badge variant="secondary" className="px-3 py-1">
              Brands: {selectedBrands.length} selected
            </Badge>
          )}
        </div>
      )}
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product: ProductWithBrand) => (
          <Link to={`/products/${productTypeId}/${product.id}`} key={product.id} className="block">
            <ProductCard
              product={{
                id: product.id,
                name: product.name,
                imageurl: product.imageurl || '',
                averagerating: product.averagerating || 0,
                profile: '',
                price: product.price || 0,
                brandname: product.brand?.name,
                brandid: product.brandid,
                productTypeId: productTypeId
              }}
            />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/products/${productTypeId}?${searchParams.toString().replace(/page=\d+/, `page=${currentPage - 1}`)}`} />
            </PaginationItem>
          )}
          
          {[...Array(totalPages)].map((_, i) => {
            const pageNumber = i + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              const currentParams = new URLSearchParams(searchParams);
              currentParams.set("page", pageNumber.toString());
              
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={`/products/${productTypeId}?${currentParams.toString()}`}
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
              <PaginationNext href={`/products/${productTypeId}?${searchParams.toString().replace(/page=\d+/, `page=${currentPage + 1}`)}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}