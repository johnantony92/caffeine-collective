export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  dbo: {
    Tables: {
      blogposts: {
        Row: {
          content: string
          createdby: string | null
          createdbyusername: string | null
          createdon: string
          header: string
          id: string
          posttype: number
          readcount: number | null
          updatedon: string | null
        }
        Insert: {
          content: string
          createdby?: string | null
          createdbyusername?: string | null
          createdon?: string
          header: string
          id?: string
          posttype: number
          readcount?: number | null
          updatedon?: string | null
        }
        Update: {
          content?: string
          createdby?: string | null
          createdbyusername?: string | null
          createdon?: string
          header?: string
          id?: string
          posttype?: number
          readcount?: number | null
          updatedon?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_posttype_fkey"
            columns: ["posttype"]
            isOneToOne: false
            referencedRelation: "posttype"
            referencedColumns: ["id"]
          },
        ]
      }
      brand: {
        Row: {
          googlelink: string | null
          id: number
          imageurl: string | null
          link: string
          name: string
        }
        Insert: {
          googlelink?: string | null
          id?: number
          imageurl?: string | null
          link: string
          name: string
        }
        Update: {
          googlelink?: string | null
          id?: number
          imageurl?: string | null
          link?: string
          name?: string
        }
        Relationships: []
      }
      cafelists: {
        Row: {
          description: string | null
          favoriteorder: string | null
          googlelink: string | null
          id: string
          imageurl: string | null
          locationsid: number
          name: string | null
        }
        Insert: {
          description?: string | null
          favoriteorder?: string | null
          googlelink?: string | null
          id?: string
          imageurl?: string | null
          locationsid: number
          name?: string | null
        }
        Update: {
          description?: string | null
          favoriteorder?: string | null
          googlelink?: string | null
          id?: string
          imageurl?: string | null
          locationsid?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cafelists_locationsid_fkey"
            columns: ["locationsid"]
            isOneToOne: false
            referencedRelation: "cafelocations"
            referencedColumns: ["id"]
          },
        ]
      }
      cafelocations: {
        Row: {
          id: number
          imageurl: string | null
          locationname: string
        }
        Insert: {
          id?: number
          imageurl?: string | null
          locationname: string
        }
        Update: {
          id?: number
          imageurl?: string | null
          locationname?: string
        }
        Relationships: []
      }
      posttype: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      preferredbrewmethod: {
        Row: {
          apparatus: string
          brewtime: string
          description: string
          id: string
          instructions: string
          productid: string
          watertemperature: string | null
        }
        Insert: {
          apparatus: string
          brewtime: string
          description: string
          id?: string
          instructions: string
          productid: string
          watertemperature?: string | null
        }
        Update: {
          apparatus?: string
          brewtime?: string
          description?: string
          id?: string
          instructions?: string
          productid?: string
          watertemperature?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "preferredbrewmethod_productid_fkey"
            columns: ["productid"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      productratings: {
        Row: {
          addedon: string
          comment: string | null
          id: string
          productid: string
          ratingvalue: number
          userid: string
        }
        Insert: {
          addedon?: string
          comment?: string | null
          id?: string
          productid: string
          ratingvalue: number
          userid: string
        }
        Update: {
          addedon?: string
          comment?: string | null
          id?: string
          productid?: string
          ratingvalue?: number
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "productratings_productid_fkey"
            columns: ["productid"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      productreviews: {
        Row: {
          averagerating: number
          id: string
          imageurl: string | null
          productid: string
          reviewby: string
          reviewedon: string
        }
        Insert: {
          averagerating: number
          id?: string
          imageurl?: string | null
          productid: string
          reviewby: string
          reviewedon?: string
        }
        Update: {
          averagerating?: number
          id?: string
          imageurl?: string | null
          productid?: string
          reviewby?: string
          reviewedon?: string
        }
        Relationships: [
          {
            foreignKeyName: "productreviews_productid_fkey"
            columns: ["productid"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          averagerating: number | null
          brandid: number
          id: string
          imageurl: string | null
          name: string
          price: number | null
          producttypeid: number
          producturl: string | null
          profile: string | null
        }
        Insert: {
          averagerating?: number | null
          brandid: number
          id?: string
          imageurl?: string | null
          name: string
          price?: number | null
          producttypeid: number
          producturl?: string | null
          profile?: string | null
        }
        Update: {
          averagerating?: number | null
          brandid?: number
          id?: string
          imageurl?: string | null
          name?: string
          price?: number | null
          producttypeid?: number
          producturl?: string | null
          profile?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_brandid_fkey"
            columns: ["brandid"]
            isOneToOne: false
            referencedRelation: "brand"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_producttypeid_fkey"
            columns: ["producttypeid"]
            isOneToOne: false
            referencedRelation: "producttypes"
            referencedColumns: ["id"]
          },
        ]
      }
      producttagmappings: {
        Row: {
          id: string
          productid: string | null
          tagid: number
        }
        Insert: {
          id?: string
          productid?: string | null
          tagid: number
        }
        Update: {
          id?: string
          productid?: string | null
          tagid?: number
        }
        Relationships: [
          {
            foreignKeyName: "producttagmapping_productid_fkey"
            columns: ["productid"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "producttags_tagid_fkey"
            columns: ["tagid"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      producttypes: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: number
          tag: string
        }
        Insert: {
          id?: number
          tag: string
        }
        Update: {
          id?: number
          tag?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
