/**
 * Custom hook for improved number input UX
 * - Selects all text on focus for easy replacement
 * - Allows empty string while editing
 * - Applies default value on blur if empty
 */

import { useState, useCallback } from 'react';

interface UseNumberInputOptions {
  value: number;
  onChange: (value: number) => void;
  defaultValue?: number;
  min?: number;
  max?: number;
}

export function useNumberInput({ value, onChange, defaultValue = 0, min, max }: UseNumberInputOptions) {
  // Track if we're currently editing (allows empty string)
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text for easy replacement
    e.target.select();
    setIsEditing(true);
    setEditValue(value.toString());
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow any input while editing (including empty string)
    setEditValue(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);

    // Parse the value
    const numValue = parseFloat(editValue);

    // If empty or invalid, use default
    if (editValue === '' || isNaN(numValue)) {
      onChange(defaultValue);
      return;
    }

    // Apply min/max clamping if specified
    let finalValue = numValue;
    if (min !== undefined && finalValue < min) {
      finalValue = min;
    }
    if (max !== undefined && finalValue > max) {
      finalValue = max;
    }

    onChange(finalValue);
  }, [editValue, onChange, defaultValue, min, max]);

  return {
    value: isEditing ? editValue : value,
    onFocus: handleFocus,
    onChange: handleChange,
    onBlur: handleBlur,
  };
}
