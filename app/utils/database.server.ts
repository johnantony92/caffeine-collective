import type { SupabaseClient } from "@supabase/supabase-js";
import { CafeLocations } from "~/types/cafe";
import type { Database } from "~/types/database.types";
import { BrewMethod, ProductRating, ProductWithDetails } from "~/types/product";


export async function getAllLocations({
    dbClient
  }: {
    dbClient: SupabaseClient<Database>;
  }) {
    let locationQuery =  dbClient
        .schema("dbo")
      .from("cafelocations")
      .select("*");

    const { data, error } = await locationQuery;
  

    if (error) {
      console.log("Error occured during getAllLocations : ", error);
    }

    return {
        data,
        error
      };
    }

      export async function getCafesForLocation({
        dbClient,
        locationId
      }: {
        dbClient: SupabaseClient<Database>;
        locationId:number
      }) {
        let getCafeLists =  dbClient
            .schema("dbo")
          .from("cafelists")
          .select("*")
          .eq("locationsid",locationId);
    
        const { data, error } = await getCafeLists;
      
    
        if (error) {
          console.log("Error occured during getCafeLists : ", error);
        }
    
        return {
            data,
            error
          };
        }

        export async function getAllBlogPosts({
          dbClient
                }: {
          dbClient: SupabaseClient<Database>;
        }) {
          let postsList =  dbClient
              .schema("dbo")
            .from("blogposts")
            .select("*");
        
          const { data, error } = await postsList;
        
      
          if (error) {
            console.log("Error occured during postsList : ", error);
          }
      
          return {
              data,
              error
            };
          }

          export async function getBlogPostsDetails({
            dbClient,
            blogPostId
          }: {
            dbClient: SupabaseClient<Database>;
            blogPostId:string
          }) {

            let getblogPostDetails =  dbClient
                .schema("dbo")
              .from("blogposts")
              .select("*")
              .eq("id",blogPostId);
        
            const { data, error } = await getblogPostDetails;
          
        
            if (error) {
      
              console.log("Error occured during getBlogPostsDetails : ",error);
            }
        
            return {
                data,
                error
              };
            }

            export async function getAllProductForType({
              dbClient,
              page,
              filters = {}
            }: {
              dbClient: SupabaseClient<Database>;
              page: number;
              filters?: {
                productTypeId?: number;
                minPrice?: number;
                maxPrice?: number;
                brandIds?: number[];
              };
            }) {
              const PRODUCTS_PER_PAGE = 12;
              const from = (page - 1) * PRODUCTS_PER_PAGE;
              const to = from + PRODUCTS_PER_PAGE - 1;
              
              const {
                productTypeId = 1,
                minPrice,
                maxPrice,
                brandIds
              } = filters;
            
           
              let query = dbClient
                .schema("dbo")
                .from('products')
                .select(`
                  *,
                  brand:brandid(
                    name
                  )
                `, { count: 'exact' })
                .eq('producttypeid', productTypeId)
                .order('name');
              
              // Add price range filters if provided
              if (minPrice !== undefined) {
                query = query.gte('price', minPrice);
              }
              
              if (maxPrice !== undefined) {
                query = query.lte('price', maxPrice);
              }
              
              // Add brand filter if specific brands are selected
              if (brandIds && brandIds.length > 0) {
                query = query.in('brandid', brandIds);
              }
              
              // Apply pagination
              query = query.range(from, to);
            
              // Execute the query
              const { data: products, error, count } = await query;
            
              if (error) {
                throw new Error(`Error fetching products: ${error.message}`);
              }
            
              const totalPages = count ? Math.ceil(count / PRODUCTS_PER_PAGE) : 0;
            
              return {
                products,
                error,
                currentPage: page,
                totalPages
              };
            }

            export async function getAllBrands({
              dbClient
            }: {
              dbClient: SupabaseClient<Database>;
            }) {
              const { data, error } = await dbClient
                .schema("dbo")
                .from('brand')
                .select('id, name')
                .order('name');
            
              if (error) {
                throw new Error(`Error fetching brands: ${error.message}`);
              }
            
              return data || [];
            }

            export const getProductDetails = async ({
              dbClient,
              productId,
            }: {
              dbClient: SupabaseClient<Database>;
              productId: string | number;
            }) => {
              const { data, error } = await dbClient
                .schema("dbo")
                .from('products')
                .select(`
                  *,
                  brand:brandid(
                    name
                  ),
                  coffeeprofile ( * )
                `)
                .eq('id', productId)
                .maybeSingle();
            
              if (error) {
                console.error("Error fetching product details:", error.message);
                return { product: null, error };
              }
            
              if (data) {
                  if (Array.isArray(data.brand)) data.brand = data.brand[0] || null;
                  if (Array.isArray(data.coffeeprofile)) data.coffeeprofile = data.coffeeprofile[0] || null;
              }
            
            
              return { product: data as ProductWithDetails | null, error: null };
            };

            export const getBrewMethodsForProduct = async ({
              dbClient,
              productId,
            }: {
              dbClient: SupabaseClient<Database>;
              productId: string | number;
            }) => {
              const { data, error } = await dbClient
                .schema("dbo")
                .from('preferredbrewmethod') // Use your exact table name
                .select('*')
                .eq('productid', productId); // Use your exact foreign key column name
            
              if (error) {
                console.error("Error fetching brew methods:", error.message);
                // Return empty array on error to avoid crashing page, but log it
                return { methods: [], error };
              }
            
              return { methods: (data || []) as BrewMethod[], error: null };
            };
            
            // --- NEW Function: Get Product Ratings ---
            export const getRatingsForProduct = async ({
              dbClient,
              productId,
            }: {
              dbClient: SupabaseClient<Database>;
              productId: string | number;
            }) => {
              const { data, error } = await dbClient
                .schema("dbo")
                .from('productratings') // Use your exact table name
                .select('*')
                .eq('productid', productId) // Use your exact foreign key column name
                .order('addedon', { ascending: false }); // Optional: order by creation date
            
              if (error) {
                console.error("Error fetching product ratings:", error.message);
                // Return empty array on error
                return { ratings: [], error };
              }
            
              return { ratings: (data || []) as ProductRating[], error: null };
            };




  