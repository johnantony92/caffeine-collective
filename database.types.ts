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
          id?: never
          imageurl?: string | null
          link: string
          name: string
        }
        Update: {
          googlelink?: string | null
          id?: never
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
          id?: never
          imageurl?: string | null
          locationname: string
        }
        Update: {
          id?: never
          imageurl?: string | null
          locationname?: string
        }
        Relationships: []
      }
      coffeeprofile: {
        Row: {
          brew_approach: string | null
          flavour_profile: string | null
          id: string
          preferred_brew_method: string | null
          product_id: string | null
          roast_type: string | null
        }
        Insert: {
          brew_approach?: string | null
          flavour_profile?: string | null
          id?: string
          preferred_brew_method?: string | null
          product_id?: string | null
          roast_type?: string | null
        }
        Update: {
          brew_approach?: string | null
          flavour_profile?: string | null
          id?: string
          preferred_brew_method?: string | null
          product_id?: string | null
          roast_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coffeeprofile_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      posttype: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: never
          type: string
        }
        Update: {
          id?: never
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
          username: string | null
        }
        Insert: {
          addedon?: string
          comment?: string | null
          id?: string
          productid: string
          ratingvalue: number
          userid: string
          username?: string | null
        }
        Update: {
          addedon?: string
          comment?: string | null
          id?: string
          productid?: string
          ratingvalue?: number
          userid?: string
          username?: string | null
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
          reviewbyname: string | null
          reviewedon: string
        }
        Insert: {
          averagerating: number
          id?: string
          imageurl?: string | null
          productid: string
          reviewby: string
          reviewbyname?: string | null
          reviewedon?: string
        }
        Update: {
          averagerating?: number
          id?: string
          imageurl?: string | null
          productid?: string
          reviewby?: string
          reviewbyname?: string | null
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
          id?: never
          type: string
        }
        Update: {
          id?: never
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
          id?: never
          tag: string
        }
        Update: {
          id?: never
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  dbo: {
    Enums: {},
  },
} as const
