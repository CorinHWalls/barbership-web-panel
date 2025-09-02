import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          roles: string[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          email: string;
          roles?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          roles?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      barber_invitations: {
        Row: {
          id: string;
          email: string;
          invitation_code: string;
          used: boolean;
          created_at: string;
          expires_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          invitation_code: string;
          used?: boolean;
          created_at?: string;
          expires_at: string;
        };
        Update: {
          id?: string;
          email?: string;
          invitation_code?: string;
          used?: boolean;
          created_at?: string;
          expires_at?: string;
        };
      };
    };
  };
};
