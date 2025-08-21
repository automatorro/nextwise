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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ai_programs_14_days: {
        Row: {
          completed_at: string | null
          created_at: string
          current_day: number
          daily_reflections: Json
          daily_tasks: Json
          final_feedback: string | null
          final_score: number | null
          id: string
          intermediate_feedback: string | null
          is_active: boolean
          is_completed: boolean
          program_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_day?: number
          daily_reflections?: Json
          daily_tasks?: Json
          final_feedback?: string | null
          final_score?: number | null
          id?: string
          intermediate_feedback?: string | null
          is_active?: boolean
          is_completed?: boolean
          program_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_day?: number
          daily_reflections?: Json
          daily_tasks?: Json
          final_feedback?: string | null
          final_score?: number | null
          id?: string
          intermediate_feedback?: string | null
          is_active?: boolean
          is_completed?: boolean
          program_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_progress_sheets: {
        Row: {
          ai_analysis: string
          created_at: string
          extracted_objective: string
          id: string
          is_saved: boolean
          next_steps: Json
          recommendations: Json
          updated_at: string
          user_id: string
          user_question: string
        }
        Insert: {
          ai_analysis: string
          created_at?: string
          extracted_objective: string
          id?: string
          is_saved?: boolean
          next_steps?: Json
          recommendations?: Json
          updated_at?: string
          user_id: string
          user_question: string
        }
        Update: {
          ai_analysis?: string
          created_at?: string
          extracted_objective?: string
          id?: string
          is_saved?: boolean
          next_steps?: Json
          recommendations?: Json
          updated_at?: string
          user_id?: string
          user_question?: string
        }
        Relationships: []
      }
      ai_recommendations: {
        Row: {
          action_items: Json | null
          created_at: string
          expires_at: string | null
          id: string
          is_applied: boolean | null
          priority: number | null
          recommendation_text: string
          source_id: string | null
          source_type: string
          user_id: string
        }
        Insert: {
          action_items?: Json | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_applied?: boolean | null
          priority?: number | null
          recommendation_text: string
          source_id?: string | null
          source_type: string
          user_id: string
        }
        Update: {
          action_items?: Json | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_applied?: boolean | null
          priority?: number | null
          recommendation_text?: string
          source_id?: string | null
          source_type?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_simulations: {
        Row: {
          ai_feedback: string | null
          clarity_score: number | null
          completed_at: string | null
          conversation_log: Json
          conviction_score: number | null
          created_at: string
          empathy_score: number | null
          id: string
          is_completed: boolean
          overall_score: number | null
          simulation_type: string
          structure_score: number | null
          updated_at: string | null
          user_id: string
          user_responses: Json
        }
        Insert: {
          ai_feedback?: string | null
          clarity_score?: number | null
          completed_at?: string | null
          conversation_log?: Json
          conviction_score?: number | null
          created_at?: string
          empathy_score?: number | null
          id?: string
          is_completed?: boolean
          overall_score?: number | null
          simulation_type: string
          structure_score?: number | null
          updated_at?: string | null
          user_id: string
          user_responses?: Json
        }
        Update: {
          ai_feedback?: string | null
          clarity_score?: number | null
          completed_at?: string | null
          conversation_log?: Json
          conviction_score?: number | null
          created_at?: string
          empathy_score?: number | null
          id?: string
          is_completed?: boolean
          overall_score?: number | null
          simulation_type?: string
          structure_score?: number | null
          updated_at?: string | null
          user_id?: string
          user_responses?: Json
        }
        Relationships: []
      }
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
          last_validation_check: string | null
          milestone_order: number
          resources: Json | null
          target_date: string | null
          title: string
          updated_at: string
          validation_status: Json | null
        }
        Insert: {
          career_path_id: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          last_validation_check?: string | null
          milestone_order?: number
          resources?: Json | null
          target_date?: string | null
          title: string
          updated_at?: string
          validation_status?: Json | null
        }
        Update: {
          career_path_id?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          last_validation_check?: string | null
          milestone_order?: number
          resources?: Json | null
          target_date?: string | null
          title?: string
          updated_at?: string
          validation_status?: Json | null
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
          ai_insights: Json | null
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
          ai_insights?: Json | null
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
          ai_insights?: Json | null
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
      resource_validation_logs: {
        Row: {
          checked_at: string
          created_at: string
          error_message: string | null
          id: string
          is_active: boolean
          milestone_id: string | null
          resource_url: string
          status_code: number | null
        }
        Insert: {
          checked_at?: string
          created_at?: string
          error_message?: string | null
          id?: string
          is_active?: boolean
          milestone_id?: string | null
          resource_url: string
          status_code?: number | null
        }
        Update: {
          checked_at?: string
          created_at?: string
          error_message?: string | null
          id?: string
          is_active?: boolean
          milestone_id?: string | null
          resource_url?: string
          status_code?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resource_validation_logs_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "career_milestones"
            referencedColumns: ["id"]
          },
        ]
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
          name_en: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          name_en?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          name_en?: string | null
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
          description_en: string | null
          estimated_duration: number
          id: string
          name: string
          name_en: string | null
          questions_count: number
          subscription_required: Database["public"]["Enums"]["subscription_type"]
        }
        Insert: {
          category_id: string
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          estimated_duration?: number
          id?: string
          name: string
          name_en?: string | null
          questions_count?: number
          subscription_required?: Database["public"]["Enums"]["subscription_type"]
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          estimated_duration?: number
          id?: string
          name?: string
          name_en?: string | null
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
      user_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          note_type: string
          tags: Json | null
          test_result_id: string | null
          test_type: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          note_type?: string
          tags?: Json | null
          test_result_id?: string | null
          test_type?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          note_type?: string
          tags?: Json | null
          test_result_id?: string | null
          test_type?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress_tracking: {
        Row: {
          achievement_description: string | null
          created_at: string
          id: string
          milestones_reached: number
          steps_completed: number
          tests_retaken: number
          tracking_date: string
          user_id: string
        }
        Insert: {
          achievement_description?: string | null
          created_at?: string
          id?: string
          milestones_reached?: number
          steps_completed?: number
          tests_retaken?: number
          tracking_date?: string
          user_id: string
        }
        Update: {
          achievement_description?: string | null
          created_at?: string
          id?: string
          milestones_reached?: number
          steps_completed?: number
          tests_retaken?: number
          tracking_date?: string
          user_id?: string
        }
        Relationships: []
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
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_tests_taken: {
        Args: { p_user_id: string }
        Returns: undefined
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
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      subscription_status: ["active", "inactive", "cancelled", "past_due"],
      subscription_type: ["basic", "professional", "premium"],
    },
  },
} as const
