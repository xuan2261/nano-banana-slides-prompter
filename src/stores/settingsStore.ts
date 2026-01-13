import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'nano-banana-llm-settings';

export interface LLMSettings {
  apiKey: string;
  baseURL: string;
  model: string;
}

interface SettingsStore {
  settings: LLMSettings | null;
  setSettings: (settings: LLMSettings) => void;
  clearSettings: () => void;
}

/**
 * Zustand store for LLM settings with localStorage persistence.
 * Changes automatically propagate to all consuming components.
 */
export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: null,
      setSettings: (settings) => set({ settings }),
      clearSettings: () => set({ settings: null }),
    }),
    {
      name: STORAGE_KEY,
      // Only persist the settings field
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);
