// src/store/index.ts
// CINEVISION AI — ZUSTAND STORE

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Generation, Style } from '../types';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AUTH STORE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      login: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'cinevision-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDITOR STORE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface EditorState {
  // Input
  inputImage: string | null;
  inputFile: File | null;
  // Style
  selectedStyle: Style | null;
  customPrompt: string;
  // Settings
  platform: string;
  resolution: string;
  // Processing
  isProcessing: boolean;
  progress: number;
  // Output
  generatedImages: string[];
  currentGeneration: Generation | null;
  // Actions
  setInputImage: (image: string | null, file?: File | null) => void;
  setSelectedStyle: (style: Style | null) => void;
  setCustomPrompt: (prompt: string) => void;
  setPlatform: (platform: string) => void;
  setResolution: (resolution: string) => void;
  setProcessing: (processing: boolean, progress?: number) => void;
  setGeneratedImages: (images: string[]) => void;
  setCurrentGeneration: (generation: Generation | null) => void;
  reset: () => void;
}

const initialEditorState = {
  inputImage: null,
  inputFile: null,
  selectedStyle: null,
  customPrompt: '',
  platform: 'instagram',
  resolution: '1024x1024',
  isProcessing: false,
  progress: 0,
  generatedImages: [],
  currentGeneration: null,
};

export const useEditorStore = create<EditorState>()((set) => ({
  ...initialEditorState,
  setInputImage: (inputImage, inputFile = null) => set({ inputImage, inputFile }),
  setSelectedStyle: (selectedStyle) => set({ selectedStyle }),
  setCustomPrompt: (customPrompt) => set({ customPrompt }),
  setPlatform: (platform) => set({ platform }),
  setResolution: (resolution) => set({ resolution }),
  setProcessing: (isProcessing, progress = 0) => set({ isProcessing, progress }),
  setGeneratedImages: (generatedImages) => set({ generatedImages }),
  setCurrentGeneration: (currentGeneration) => set({ currentGeneration }),
  reset: () => set(initialEditorState),
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UI STORE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface UIState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  theme: 'dark' | 'light';
  toggleSidebar: () => void;
  setMobileMenu: (open: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileMenuOpen: false,
      theme: 'dark',
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setMobileMenu: (mobileMenuOpen) => set({ mobileMenuOpen }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'cinevision-ui',
    }
  )
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GENERATION HISTORY STORE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface HistoryState {
  generations: Generation[];
  isLoading: boolean;
  addGeneration: (generation: Generation) => void;
  removeGeneration: (id: string) => void;
  setGenerations: (generations: Generation[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useHistoryStore = create<HistoryState>()((set) => ({
  generations: [],
  isLoading: false,
  addGeneration: (generation) => set((state) => ({
    generations: [generation, ...state.generations]
  })),
  removeGeneration: (id) => set((state) => ({
    generations: state.generations.filter((g) => g.id !== id)
  })),
  setGenerations: (generations) => set({ generations }),
  setLoading: (isLoading) => set({ isLoading }),
}));
