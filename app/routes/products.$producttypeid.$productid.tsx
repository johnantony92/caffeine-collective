import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSupabaseWithSessionAndHeaders } from "~/utils/supabase.server";
import {
  getProductDetails,
  getBrewMethodsForProduct, // Import new function
  getRatingsForProduct,     // Import new function
} from "~/utils/database.server";
// Use the combined type for clarity
import type { ProductPageData, BrewMethod, ProductRating } from "~/types/product";

import { Star } from "lucide-react";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Separator } from "components/ui/separator";

// Meta Function for SEO
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  // Make sure to handle the case where data might be undefined (e.g., during errors)
  const productData = data as ProductPageData | undefined;
  const productName = productData?.product?.name ?? "Product";
  const description = `Details, brewing methods, and reviews for ${productName}.`;

  return [
    { title: `${productName} Details` },
    { name: "description", content: description },
  ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const productId = params.productId;
  // const productTypeId = params.productTypeId; // Keep if used elsewhere

  if (!productId) {
    throw ("Product ID is missing");
  }

  const { supabase, headers } = await getSupabaseWithSessionAndHeaders({ request });

  // 1. Fetch Product Core Details
  const { product, error: productError } = await getProductDetails({
    dbClient: supabase,
    productId: productId,
  });

  if (productError || !product) {
    // Log the specific error if it exists
    if(productError) console.error("Loader error fetching product:", productError.message);
    throw (`Product with ID ${productId} not found or error loading details.`);
  }

  // 2. Fetch Preferred Brew Methods (concurrently for efficiency)
  // 3. Fetch Product Ratings (concurrently for efficiency)
  const [brewMethodsResult, ratingsResult] = await Promise.all([
    getBrewMethodsForProduct({ dbClient: supabase, productId: product.id }),
    getRatingsForProduct({ dbClient: supabase, productId: product.id })
  ]);

  // Errors from methods/ratings fetching are handled inside the utility functions
  // They will return empty arrays in case of DB errors, allowing the page to load.

  return json<ProductPageData>({
      product,
      brewMethods: brewMethodsResult.methods,
      ratings: ratingsResult.ratings,
    },
    { headers } // Pass headers for session management, etc.
  );
};

export default function ProductDetailPage() {
  // Use the specific ProductPageData type for the loader data
  const { product, brewMethods, ratings } = useLoaderData<ProductPageData>();

  const isCoffeeProduct = product.producttypeid === 1; // Assuming 1 is Coffee
  const profile = product.coffeeprofile;
  const imageUrl = product.imageurl || "/placeholder.svg?height=400&width=400";
  const price = product.price ?? 0;
  const rating = product.averagerating ?? 0;
  const tags = []; // Assuming tags is an array field in products table


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Product Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-10">
          {/* Left Column: Image */}
          <div>
            <img
              src={imageUrl}
              alt={product.name ?? 'Product Image'}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              height={200}
            />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col space-y-4 pt-2">
            {product.brand?.name && (
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {product.brand.name}
              </p>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${
                      index < Math.round(rating)
                        ? "fill-yellow-400 text-yellow-500"
                        : "fill-gray-300 text-gray-400"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              {rating > 0 && (
                <span className="ml-1 text-sm text-muted-foreground">
                  ({rating.toFixed(1)} / 5) - {ratings.length} review{ratings.length !== 1 ? 's' : ''}
                </span>
              )}
               {ratings.length === 0 && rating === 0 && (
                 <span className="ml-1 text-sm text-muted-foreground">No reviews yet</span>
               )}
            </div>
            <p className="text-2xl font-semibold">₹{price.toFixed(2)}</p>
            <Separator className="my-2" />

            {/* --- Tags --- */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {/* {tags.map((tag:any) => (
                  <Badge key={tag} variant="secondary" className="capitalize">
                    {tag.replace(/[-_]/g, ' ')}
                  </Badge>
                ))} */}
              </div>
            )}

            {/* --- Coffee Specific Details (Conditional) --- */}
            {isCoffeeProduct && profile && (
              <div className="space-y-3 pt-4">
                 {profile.flavour_profile && (
                    <div>
                        <h3 className="text-sm font-semibold tracking-wide text-gray-700 mb-1">Flavour Profile</h3>
                        <p className="text-sm text-gray-600">{profile.flavour_profile}</p>
                    </div>
                 )}
                 {profile.roast_type && (
                    <div>
                        <h3 className="text-sm font-semibold tracking-wide text-gray-700 mb-1">Roast Type</h3>
                        <Badge variant="outline" className="text-sm">{profile.roast_type}</Badge>
                    </div>
                 )}
                 {profile.preferred_brew_method && (
                    <div>
                        <h3 className="text-sm font-semibold tracking-wide text-gray-700 mb-1">Preferred Brew Method</h3>
                         <p className="text-sm text-gray-600">{profile.preferred_brew_method}</p>
                    </div>
                 )}
                 {profile.brew_approach && (
                    <div>
                        <h3 className="text-sm font-semibold tracking-wide text-gray-700 mb-1">Have it as(Preferred):</h3>
                         <p className="text-sm text-gray-600">{profile.brew_approach}</p>
                    </div>
                 )}
              </div>
            )}

            {/* Checkout Link */}
            {product.producturl && (
              <div className="pt-6">
                <Button asChild size="lg">
                  <a
                    href={product.producturl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Product Website
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Lower Sections: Recipe and Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Brewing Recipe Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Brewing Recipes</h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                {brewMethods.length > 0 ? (
                  <div className="space-y-6">
                    {brewMethods.map((method, index) => (
                      <div key={method.id || index}> {/* Use method.id if available */}
                        <h4 className="font-semibold mb-1">{method.apparatus || 'Recommended Method'}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                           {method.watertemperature && <p><strong>Water Temp:</strong> {method.watertemperature}</p>}
                           {method.description && <p className="mt-1">{method.description}</p>}
                        </div>
                         {/* Add separator if not the last item */}
                         {index < brewMethods.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No specific brew methods found for this product.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Customer Reviews Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What Others Say ({ratings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {ratings.length > 0 ? (
                  <div className="space-y-6">
                    {ratings.map((review, index) => (
                      <div key={review.id || index}> {/* Use review.id */}
                         <div className="flex items-center justify-between mb-2">
                             <p className="font-semibold">{review.username || 'Anonymous'}</p>
                             <div className="flex items-center">
                                {[...Array(5)].map((_, starIndex) => (
                                <Star
                                    key={starIndex}
                                    className={`h-4 w-4 ${
                                    starIndex < (review.ratingvalue ?? 0) // Use review's rating
                                        ? "fill-yellow-400 text-yellow-500"
                                        : "fill-gray-300 text-gray-400"
                                    }`}
                                    aria-hidden="true"
                                />
                                ))}
                            </div>
                         </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                         {review.addedon && (
                             <p className="text-xs text-muted-foreground mt-2">
                                 {new Date(review.addedon).toLocaleDateString()}
                            </p>
                         )}
                         {/* Add separator if not the last item */}
                         {index < ratings.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No reviews found for this product yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}