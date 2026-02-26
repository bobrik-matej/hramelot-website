import nextVitals from 'eslint-config-next/core-web-vitals';
import eslintConfigPrettier from 'eslint-config-prettier';

const config = [
  ...nextVitals,
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  {
    rules: {
      // This enforces the spaces in imports: { Reservation }
      'object-curly-spacing': ['error', 'always'],
    },
  },
  eslintConfigPrettier,
];

export default config;
