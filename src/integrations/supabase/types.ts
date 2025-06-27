export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      career_chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          message_type: string
          session_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          message_type: string
          session_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          message_type?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      career_milestones: {
        Row: {
          career_path_id: string
          completed_at: string | null
          created_at: string
          description: string | null
          id: string
          is_completed: boolean
          milestone_order: number
          target_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          career_path_id: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          milestone_order?: number
          target_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          career_path_id?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          milestone_order?: number
          target_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_milestones_career_path_id_fkey"
            columns: ["career_path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      career_paths: {
        Row: {
          created_at: string | null
          description: string | null
          generated_by_ai: boolean | null
          id: string
          milestones: Json | null
          progress_percentage: number | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          generated_by_ai?: boolean | null
          id?: string
          milestones?: Json | null
          progress_percentage?: number | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          generated_by_ai?: boolean | null
          id?: string
          milestones?: Json | null
          progress_percentage?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      career_plan_templates: {
        Row: {
          category: string
          created_at: string
          description: string
          difficulty_level: string
          estimated_duration_months: number
          id: string
          is_active: boolean
          required_skills: Json | null
          target_roles: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          difficulty_level?: string
          estimated_duration_months?: number
          id?: string
          is_active?: boolean
          required_skills?: Json | null
          target_roles?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          difficulty_level?: string
          estimated_duration_months?: number
          id?: string
          is_active?: boolean
          required_skills?: Json | null
          target_roles?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      career_recommendations: {
        Row: {
          action_data: Json | null
          action_text: string
          action_type: string | null
          based_on_test_ids: string[] | null
          category: string | null
          created_at: string
          description: string
          estimated_time_minutes: number | null
          id: string
          is_dismissed: boolean
          priority: number
          recommendation_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          action_data?: Json | null
          action_text: string
          action_type?: string | null
          based_on_test_ids?: string[] | null
          category?: string | null
          created_at?: string
          description: string
          estimated_time_minutes?: number | null
          id?: string
          is_dismissed?: boolean
          priority: number
          recommendation_type: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          action_data?: Json | null
          action_text?: string
          action_type?: string | null
          based_on_test_ids?: string[] | null
          category?: string | null
          created_at?: string
          description?: string
          estimated_time_minutes?: number | null
          id?: string
          is_dismissed?: boolean
          priority?: number
          recommendation_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      career_template_milestones: {
        Row: {
          created_at: string
          description: string | null
          estimated_duration_weeks: number
          id: string
          milestone_order: number
          required_skills: Json | null
          resources: Json | null
          template_id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          estimated_duration_weeks?: number
          id?: string
          milestone_order?: number
          required_skills?: Json | null
          resources?: Json | null
          template_id: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          estimated_duration_weeks?: number
          id?: string
          milestone_order?: number
          required_skills?: Json | null
          resources?: Json | null
          template_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_template_milestones_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "career_plan_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          is_admin_override: boolean | null
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_type: Database["public"]["Enums"]["subscription_type"]
          tests_taken_this_month: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          is_admin_override?: boolean | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_type?: Database["public"]["Enums"]["subscription_type"]
          tests_taken_this_month?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          is_admin_override?: boolean | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_type?: Database["public"]["Enums"]["subscription_type"]
          tests_taken_this_month?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      test_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      test_questions: {
        Row: {
          created_at: string | null
          id: string
          options: Json
          options_en: Json | null
          question_order: number
          question_text_en: string | null
          question_text_ro: string
          question_type: string
          scoring_weights: Json | null
          test_type_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          options: Json
          options_en?: Json | null
          question_order: number
          question_text_en?: string | null
          question_text_ro: string
          question_type?: string
          scoring_weights?: Json | null
          test_type_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          options?: Json
          options_en?: Json | null
          question_order?: number
          question_text_en?: string | null
          question_text_ro?: string
          question_type?: string
          scoring_weights?: Json | null
          test_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_questions_test_type_id_fkey"
            columns: ["test_type_id"]
            isOneToOne: false
            referencedRelation: "test_types"
            referencedColumns: ["id"]
          },
        ]
      }
      test_results: {
        Row: {
          ai_analysis: string | null
          answers: Json
          completed_at: string | null
          id: string
          recommendations: string | null
          score: Json
          test_type_id: string
          user_id: string
        }
        Insert: {
          ai_analysis?: string | null
          answers: Json
          completed_at?: string | null
          id?: string
          recommendations?: string | null
          score: Json
          test_type_id: string
          user_id: string
        }
        Update: {
          ai_analysis?: string | null
          answers?: Json
          completed_at?: string | null
          id?: string
          recommendations?: string | null
          score?: Json
          test_type_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_results_test_type_id_fkey"
            columns: ["test_type_id"]
            isOneToOne: false
            referencedRelation: "test_types"
            referencedColumns: ["id"]
          },
        ]
      }
      test_types: {
        Row: {
          category_id: string
          created_at: string | null
          description: string | null
          estimated_duration: number
          id: string
          name: string
          questions_count: number
          subscription_required: Database["public"]["Enums"]["subscription_type"]
        }
        Insert: {
          category_id: string
          created_at?: string | null
          description?: string | null
          estimated_duration?: number
          id?: string
          name: string
          questions_count?: number
          subscription_required?: Database["public"]["Enums"]["subscription_type"]
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          estimated_duration?: number
          id?: string
          name?: string
          questions_count?: number
          subscription_required?: Database["public"]["Enums"]["subscription_type"]
        }
        Relationships: [
          {
            foreignKeyName: "test_types_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "test_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_career_plan_progress: {
        Args: { plan_id: string }
        Returns: number
      }
      can_take_test: {
        Args: { _user_id: string }
        Returns: boolean
      }
      get_user_test_limit: {
        Args: { _user_id: string }
        Returns: number
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      subscription_status: "active" | "inactive" | "cancelled" | "past_due"
      subscription_type: "basic" | "professional" | "premium"
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
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      subscription_status: ["active", "inactive", "cancelled", "past_due"],
      subscription_type: ["basic", "professional", "premium"],
    },
  },
} as const
