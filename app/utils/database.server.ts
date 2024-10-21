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




  