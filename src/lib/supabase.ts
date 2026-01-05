export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      gameInstances: {
        Row: {
          createdAt: string
          gameGen: number
          id: string
          instanceName: string
          lastPlayed: string
          owner: string
          pkmnGameName: string
          playerThree: string | null
          playerTwo: string | null
        }
        Insert: {
          createdAt?: string
          gameGen: number
          id?: string
          instanceName: string
          lastPlayed?: string
          owner: string
          pkmnGameName: string
          playerThree?: string | null
          playerTwo?: string | null
        }
        Update: {
          createdAt?: string
          gameGen?: number
          id?: string
          instanceName?: string
          lastPlayed?: string
          owner?: string
          pkmnGameName?: string
          playerThree?: string | null
          playerTwo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gameInstances_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gameInstances_playerThree_fkey"
            columns: ["playerThree"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gameInstances_playerTwo_fkey"
            columns: ["playerTwo"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      monsterLinks: {
        Row: {
          id: number
          slotOne: number
          slotThree: number | null
          slotTwo: number
        }
        Insert: {
          id?: number
          slotOne: number
          slotThree?: number | null
          slotTwo: number
        }
        Update: {
          id?: number
          slotOne?: number
          slotThree?: number | null
          slotTwo?: number
        }
        Relationships: [
          {
            foreignKeyName: "monsterLinks_slotOne_fkey"
            columns: ["slotOne"]
            isOneToOne: true
            referencedRelation: "monsters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monsterLinks_slotThree_fkey"
            columns: ["slotThree"]
            isOneToOne: true
            referencedRelation: "monsters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monsterLinks_slotTwo_fkey"
            columns: ["slotTwo"]
            isOneToOne: true
            referencedRelation: "monsters"
            referencedColumns: ["id"]
          },
        ]
      }
      monsters: {
        Row: {
          ability: string | null
          dateCaught: string
          dateFainted: string | null
          gameInstance: string
          gender: string | null
          heldItem: string | null
          id: number
          level: number
          moveFour: string | null
          moveOne: string
          moveThree: string | null
          moveTwo: string | null
          nature: string
          nickname: string
          owner: string
          speciesId: number
          status: string
        }
        Insert: {
          ability?: string | null
          dateCaught?: string
          dateFainted?: string | null
          gameInstance?: string
          gender?: string | null
          heldItem?: string | null
          id?: number
          level?: number
          moveFour?: string | null
          moveOne: string
          moveThree?: string | null
          moveTwo?: string | null
          nature: string
          nickname: string
          owner: string
          speciesId: number
          status?: string
        }
        Update: {
          ability?: string | null
          dateCaught?: string
          dateFainted?: string | null
          gameInstance?: string
          gender?: string | null
          heldItem?: string | null
          id?: number
          level?: number
          moveFour?: string | null
          moveOne?: string
          moveThree?: string | null
          moveTwo?: string | null
          nature?: string
          nickname?: string
          owner?: string
          speciesId?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "monsters_gameInstance_fkey"
            columns: ["gameInstance"]
            isOneToOne: false
            referencedRelation: "gameInstances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monsters_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      parties: {
        Row: {
          createdAt: string
          gameInstance: string | null
          id: string
          modifiedAt: string
          owner: string
          slotFive: number | null
          slotFour: number | null
          slotOne: number
          slotSix: number | null
          slotThree: number | null
          slotTwo: number | null
        }
        Insert: {
          createdAt?: string
          gameInstance?: string | null
          id?: string
          modifiedAt?: string
          owner: string
          slotFive?: number | null
          slotFour?: number | null
          slotOne: number
          slotSix?: number | null
          slotThree?: number | null
          slotTwo?: number | null
        }
        Update: {
          createdAt?: string
          gameInstance?: string | null
          id?: string
          modifiedAt?: string
          owner?: string
          slotFive?: number | null
          slotFour?: number | null
          slotOne?: number
          slotSix?: number | null
          slotThree?: number | null
          slotTwo?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "parties_gameInstance_fkey"
            columns: ["gameInstance"]
            isOneToOne: false
            referencedRelation: "gameInstances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parties_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          createdAt: string
          displayName: string
          id: string
          lastLoggedIn: string | null
        }
        Insert: {
          createdAt: string
          displayName: string
          id: string
          lastLoggedIn?: string | null
        }
        Update: {
          createdAt?: string
          displayName?: string
          id?: string
          lastLoggedIn?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
