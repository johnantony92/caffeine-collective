import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Star } from "lucide-react";
import { Badge } from "components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import type { Product, ProductReview, ProductTag } from "~/types/product";

export const loader: LoaderFunction = async ({ params }) => {
  // Mock data - replace with actual database call
  const product: Product = {
    id: params.productId!,
    name: "Premium Coffee Blend",
    imageUrl: `/api/placeholder/800/600`,
    rating: 4,
    tags: ['beginner-friendly', 'medium-roast'],
    price: 14.99,
    description: "A delightful coffee blend perfect for any time of day.",
    reviews: [
      {
        id: "1",
        userName: "John Doe",
        rating: 5,
        comment: "Best coffee I've ever had!",
        date: "2024-03-15"
      },
      {
        id: "2",
        userName: "Jane Smith",
        rating: 4,
        comment: "Great flavor, would buy again.",
        date: "2024-03-10"
      }
    ]
  };

  return json({ product });
};

export default function ProductDetailPage() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <div className="px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg"
          />
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < product.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag: ProductTag) => (
                <Badge key={tag} variant="secondary">
                  {tag.replace('-', ' ')}
                </Badge>
              ))}
            </div>
            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review: ProductReview) => (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{review.userName}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}