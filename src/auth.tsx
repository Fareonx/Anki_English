import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getProfile, listStudents, type Profile } from './lib/db';
import { resolveConfig } from './lib/scheduler/config';
import type { SchedConfig } from './lib/scheduler/types';
import { supabase } from './lib/supabase';

interface AuthState {
  loading: boolean;
  userId: string | null;
  profile: Profile | null;
  isAdmin: boolean;
  /** For an admin: every student. For a student: just themselves. */
  students: Profile[];
  /** Whose words and progress are on screen. */
  student: Profile | null;
  config: SchedConfig;
  selectStudent: (id: string) => void;
  reload: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

const STUDENT_KEY = 'selectedStudent';

function readStoredStudent(): string | null {
  try {
    return localStorage.getItem(STUDENT_KEY);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [students, setStudents] = useState<Profile[]>([]);
  const [studentId, setStudentId] = useState<string | null>(readStoredStudent);

  const load = useCallback(async (uid: string | null) => {
    if (!uid) {
      setProfile(null);
      setStudents([]);
      setLoading(false);
      return;
    }
    try {
      const p = await getProfile(uid);
      setProfile(p);
      setStudents(p?.role === 'admin' ? await listStudents() : p ? [p] : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const uid = data.session?.user.id ?? null;
      setUserId(uid);
      void load(uid);
    });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        const uid = session?.user.id ?? null;
        setUserId(uid);
        setLoading(true);
        // Defer: Supabase recommends not awaiting other calls inside this callback.
        setTimeout(() => void load(uid), 0);
      }
    });
    return () => data.subscription.unsubscribe();
  }, [load]);

  const value = useMemo<AuthState>(() => {
    const student = students.find((s) => s.id === studentId) ?? students[0] ?? null;
    return {
      loading,
      userId,
      profile,
      isAdmin: profile?.role === 'admin',
      students,
      student,
      config: resolveConfig(student?.settings),
      selectStudent: (id) => {
        setStudentId(id);
        try {
          localStorage.setItem(STUDENT_KEY, id);
        } catch {
          // Storage may be unavailable (private mode); the choice just won't persist.
        }
      },
      reload: () => load(userId),
      signOut: async () => {
        await supabase.auth.signOut();
      },
    };
  }, [loading, userId, profile, students, studentId, load]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
