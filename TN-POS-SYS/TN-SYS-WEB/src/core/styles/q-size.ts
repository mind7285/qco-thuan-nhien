// 🎨 Q-Size Utility Classes - On-demand generation
// 🇻🇳 Bộ utility classes chuyên cho size (width, height, min-width, max-width, min-height, max-height, padding, margin, border), chỉ tạo class khi có sử dụng.
// 🇺🇸 Size utility classes with `q-` prefix, created on-demand based on actual usage.

import { css } from 'lit';

export const qSizeStyles = css`
  /* ============================================
     Q-SIZE UTILITY CLASSES
     Created on-demand based on actual usage
     ============================================ */

  /* Height */
  .q-height-18 { height: 18px; }
  .q-height-50 { height: 50px; }
  .q-height-60 { height: 60px; }
  .q-height-125 { height: 125px; }
  .q-height-150 { height: 150px; }

  /* Width */
  .q-width-18 { width: 18px; }
  .q-width-125 { width: 125px; }
  .q-width-150 { width: 150px; }
  .q-width-400 { width: 400px; }
  .q-width-450 { width: 450px; }

  /* Min-Height */
  .q-min-h-600 { min-height: 600px; }

  /* Max-Height */
  .q-max-h-720 { max-height: 720px; }

  /* Padding */
  .q-p-4 { padding: 4px; }
  .q-p-8 { padding: 8px; }
  .q-p-12 { padding: 12px; }
  .q-p-24 { padding: 24px; }
  .q-p-40 { padding: 40px; }

  /* Padding Top */
  .q-pt-24 { padding-top: 24px; }

  /* Padding Right */
  .q-pr-40 { padding-right: 40px; }
  .q-pr-80 { padding-right: 80px; }
  .q-pr-100 { padding-right: 100px; }

  /* Padding Left */
  .q-pl-12 { padding-left: 12px; }
  .q-pl-40 { padding-left: 40px; }

  /* Padding Horizontal (Left + Right) */
  .q-px-12 { padding-left: 12px; padding-right: 12px; }
  .q-px-40 { padding-left: 40px; padding-right: 40px; }

  /* Padding Vertical (Top + Bottom) */
  .q-py-12 { padding-top: 12px; padding-bottom: 12px; }

  /* Margin */
  .q-m-0 { margin: 0; }
  .q-m-4 { margin: 4px; }

  /* Margin Top */
  .q-mt-4 { margin-top: 4px; }
  .q-mt-0 { margin-top: 0; }

  /* Margin Bottom */
  .q-mb-0 { margin-bottom: 0; }

  /* Margin Left */
  .q-ml-12 { margin-left: 12px; }
  .q-ml-40 { margin-left: 40px; }

  /* Margin Right */
  .q-mr-12 { margin-right: 12px; }
  .q-mr-40 { margin-right: 40px; }

  /* Border Width */
  .q-border-1 { border-width: 1px; }
  .q-border-2 { border-width: 2px; }

  /* Border Radius */
  .q-rounded-4 { border-radius: 4px; }
  .q-rounded-8 { border-radius: 8px; }
  .q-rounded-16 { border-radius: 16px; }
  .q-rounded-24 { border-radius: 24px; }
  .q-rounded-32 { border-radius: 32px; }

  /* Position (Left/Right for absolute positioning) */
  .q-left-12 { left: 12px; }
  .q-left-40 { left: 40px; }
  .q-right-12 { right: 12px; }
  .q-right-40 { right: 40px; }
  .q-right-80 { right: 80px; }
  .q-right-100 { right: 100px; }

  /* Gap (for flex/grid) */
  .q-gap-4 { gap: 4px; }
  .q-gap-8 { gap: 8px; }
  .q-gap-16 { gap: 16px; }
`;
