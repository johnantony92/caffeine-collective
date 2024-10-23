import type { SupabaseClient } from "@supabase/supabase-js";
import { CafeLocations } from "~/types/cafe";
import type { Database } from "~/types/database.types";


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
              page
            }: {
              dbClient: SupabaseClient<Database>;
              page:number
            }) {
              const PRODUCTS_PER_PAGE = 12;
              const from = (page - 1) * PRODUCTS_PER_PAGE;
              const to = from + PRODUCTS_PER_PAGE - 1;
            

              const { data: products, error, count } = await dbClient
              .schema("dbo")
              .from('products')
              .select(`
                *,
                brand:brandid(
                  name
                )
              `, { count: 'exact' })
              .eq('producttypeid', 1) 
              .range(from, to)
              .order('name');
          
            if (error) {
              throw new Error(`Error fetching products: ${error.message}`);
            }

            const totalPages = count ? Math.ceil(count / PRODUCTS_PER_PAGE) : 0;

            return{ products,
              error,
              currentPage: page,
              totalPages}
              
            }




  