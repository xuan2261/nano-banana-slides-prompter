/**
 * usePromptOptimizer Hook
 * Provides prompt optimization functionality via API
 */
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export interface OptimizationResult {
  original: string;
  optimized: string;
  improvements: string[];
  score: {
    before: number;
    after: number;
  };
}

export interface UsePromptOptimizerState {
  isOptimizing: boolean;
  result: OptimizationResult | null;
  error: string | null;
}

export interface UsePromptOptimizerReturn extends UsePromptOptimizerState {
  optimize: (prompt: string, iterations?: number) => Promise<OptimizationResult | null>;
  reset: () => void;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Hook for optimizing slide prompts via LLM
 */
export function usePromptOptimizer(): UsePromptOptimizerReturn {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const optimize = useCallback(
    async (prompt: string, iterations = 1): Promise<OptimizationResult | null> => {
      if (!prompt.trim()) {
        toast({
          title: t('optimizer.noPrompt', 'No prompt to optimize'),
          variant: 'destructive',
        });
        return null;
      }

      setIsOptimizing(true);
      setError(null);
      setResult(null);

      try {
        const response = await fetch(`${API_BASE}/api/optimize-prompt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, iterations }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Optimization failed');
        }

        const optimizationResult = data.data as OptimizationResult;
        setResult(optimizationResult);

        toast({
          title: t('optimizer.success', 'Prompt optimized'),
          description: t('optimizer.scoreImproved', 'Score: {{before}} → {{after}}', {
            before: optimizationResult.score.before,
            after: optimizationResult.score.after,
          }),
        });

        return optimizationResult;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to optimize prompt';
        setError(errorMsg);
        toast({
          title: t('optimizer.failed', 'Optimization failed'),
          description: errorMsg,
          variant: 'destructive',
        });
        return null;
      } finally {
        setIsOptimizing(false);
      }
    },
    [toast, t]
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    isOptimizing,
    result,
    error,
    optimize,
    reset,
  };
}
