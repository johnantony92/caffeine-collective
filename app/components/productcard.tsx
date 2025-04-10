import { Link } from "@remix-run/react";
import { Star } from "lucide-react";
import { Badge } from "components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import type { Product } from "~/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.productTypeId}/${product.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <img
            src={product.imageurl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-2">{product.name}</CardTitle>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < product.averagerating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            
              <Badge  variant="secondary">
                {product.profile}
              </Badge>
            
          </div>
        </CardContent>
        <CardFooter>
          <p className="font-bold text-lg">₹{product.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}