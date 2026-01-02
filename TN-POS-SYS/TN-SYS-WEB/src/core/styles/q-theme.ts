// 🎨 Q-Theme Utility Classes - Colors, Typography
// 🇻🇳 Bộ utility classes chuyên cho theme (colors, typography), sử dụng CSS variables từ :root.
// 🇺🇸 Theme utility classes for colors and typography, using CSS variables from :root.

import { css } from 'lit';

export const qThemeStyles = css`
  /* ============================================
     Q-THEME UTILITY CLASSES
     CSS Variables được định nghĩa ở :root level (q-theme-global.css)
     ============================================ */

  /* ============================================
     COLORS - Background
     ============================================ */
  .q-bg-primary {
    background-color: var(--q-color-bg-primary);
  }

  .q-bg-secondary {
    background-color: var(--q-color-bg-secondary);
  }

  .q-bg-hover {
    background-color: var(--q-color-bg-hover);
  }

  .q-bg-error {
    background-color: var(--q-color-bg-error);
  }

  /* ============================================
     COLORS - Text
     ============================================ */
  .q-text-primary {
    color: var(--q-color-text-primary);
  }

  .q-text-secondary {
    color: var(--q-color-text-secondary);
  }

  .q-text-muted {
    color: var(--q-color-text-muted);
  }

  .q-text-white {
    color: var(--q-color-text-white);
  }

  .q-text-error {
    color: var(--q-color-error);
  }

  .q-text-success {
    color: var(--q-color-success);
  }

  .q-text-warning {
    color: var(--q-color-warning);
  }

  .q-text-info {
    color: var(--q-color-info);
  }

  /* ============================================
     COLORS - Border
     ============================================ */
  .q-border {
    border-color: var(--q-color-border);
  }

  .q-border-light {
    border-color: var(--q-color-border-light);
  }

  /* ============================================
     TYPOGRAPHY - Font Family
     ============================================ */
  .q-font {
    font-family: var(--q-font-family);
  }

  /* ============================================
     TYPOGRAPHY - Font Sizes
     ============================================ */
  .q-text-xs {
    font-size: var(--q-font-size-xs);
  }

  .q-text-sm {
    font-size: var(--q-font-size-sm);
  }

  .q-text-base {
    font-size: var(--q-font-size-base);
  }

  .q-text-lg {
    font-size: var(--q-font-size-lg);
  }

  .q-text-xl {
    font-size: var(--q-font-size-xl);
  }

  .q-text-2xl {
    font-size: var(--q-font-size-2xl);
  }

  /* ============================================
     TYPOGRAPHY - Font Weights
     ============================================ */
  .q-font-normal {
    font-weight: var(--q-font-weight-normal);
  }

  .q-font-medium {
    font-weight: var(--q-font-weight-medium);
  }

  .q-font-semibold {
    font-weight: var(--q-font-weight-semibold);
  }

  .q-font-bold {
    font-weight: var(--q-font-weight-bold);
  }

  /* ============================================
     TYPOGRAPHY - Line Heights
     ============================================ */
  .q-leading-tight {
    line-height: var(--q-line-height-tight);
  }

  .q-leading-normal {
    line-height: var(--q-line-height-normal);
  }

  .q-leading-relaxed {
    line-height: var(--q-line-height-relaxed);
  }
`;

