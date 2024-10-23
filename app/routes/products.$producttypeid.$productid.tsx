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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion"
import { Separator } from "components/ui/separator"
import type { Product, ProductReview, ProductTag, PrefferedRecipe } from "~/types/product";

export const loader: LoaderFunction = async ({ params }) => {
  // Mock data - replace with actual database call
  const product: Product = {
    id: params.productId!,
    name: "Premium Coffee Blend",
    imageurl: `/placeholder.svg?height=400&width=400`,
    averagerating: 4,
    profile:"",
    brandid:1,
    brandname:"",
    tags: ['beginner-friendly', 'medium-roast', 'blend'],
    price: 14.99,
    description: "A delightful coffee blend perfect for any time of day. This medium roast offers a balanced flavor profile with notes of chocolate and caramel, making it an excellent choice for both newcomers and coffee enthusiasts alike.",
    reviews: [
      {
        id: "1",
        userName: "John Doe",
        rating: 5,
        comment: "Best coffee I've ever had! The flavor is rich and smooth, perfect for my morning routine.",
        date: "2024-03-15"
      },
      {
        id: "2",
        userName: "Jane Smith",
        rating: 4,
        comment: "Great flavor, would buy again. I especially enjoy the subtle chocolate notes.",
        date: "2024-03-10"
      },
      {
        id: "3",
        userName: "Alex Johnson",
        rating: 4,
        comment: "A solid choice for everyday drinking. Smooth and well-balanced.",
        date: "2024-03-05"
      }
    ],
    preferredRecipe: {
      grindSize: "Medium",
      waterTemperature: "200°F (93°C)",
      coffeeToWaterRatio: "1:16",
      brewTime: "3-4 minutes",
      instructions: [
        "Start with freshly roasted beans",
        "Grind beans to medium consistency",
        "Use filtered water heated to 200°F",
        "Add ground coffee to filter",
        "Pour water over grounds in circular motion",
        "Allow to brew for 3-4 minutes",
        "Remove filter and enjoy your perfectly brewed coffee"
      ]
    }
  };

  return json({ product });
};

export default function ProductDetailPage() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < product.rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">({product.rating}/5)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag: ProductTag) => (
                <Badge key={tag} variant="secondary">
                  {tag.replace('-', ' ')}
                </Badge>
              ))}
            </div>
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Brewing Recipe</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p><strong>Grind Size:</strong> {product.preferredRecipe?.grindSize}</p>
                  <p><strong>Water Temperature:</strong> {product.preferredRecipe?.waterTemperature}</p>
                  <p><strong>Coffee to Water Ratio:</strong> {product.preferredRecipe?.coffeeToWaterRatio}</p>
                  <p><strong>Brew Time:</strong> {product.preferredRecipe?.brewTime}</p>
                  <h3 className="font-semibold mt-4 mb-2">Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    {product.preferredRecipe?.instructions.map((step:string, index:number) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <Accordion type="single" collapsible className="w-full">
              {product.reviews.map((review: ProductReview) => (
                <AccordionItem key={review.id} value={review.id}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full">
                      <span>{review.userName}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${
                              index < review.rating
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardContent>
                        <p>{review.comment}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}