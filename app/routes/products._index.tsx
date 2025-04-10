import { json } from "@remix-run/node";
import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardFooter } from "components/ui/card";
import { ProductTypeInfo, productTypes } from "~/types/product";


export const meta: MetaFunction<typeof loader> = ({ data }) => {

  const title = "Product Types"; 

  return [
    { title: title },
    { name: "description", content: "Product Types." }, 
  ];
};


export const loader = async () => {
  return json({ productTypes });
};

export default function ProductTypes() {
  const { productTypes } = useLoaderData<typeof loader>();

  return (
 
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Product Types</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productTypes.map((type: ProductTypeInfo) => (
          <Link key={type.id} to={`/products/${type.id}`} className="p-2">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-48 object-cover"
                />
              </CardContent>
              <CardFooter className="bg-secondary">
                <h2 className="text-lg font-semibold">{type.name}</h2>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>

  );
}