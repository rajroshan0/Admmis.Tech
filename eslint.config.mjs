import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const config = [
  {
    ignores: [
      '.next/**',
      'coverage/**',
      '.lighthouseci/**',
      'playwright-report/**',
      'test-results/**',
      'node_modules/**',
      'next-env.d.ts',
      'src/payload-types.ts',
      'src/app/(payload)/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // standards §2 boundaries and §3 rules
    rules: {
      '@typescript-eslint/no-explicit-any': 'error', // any needs an eslint-disable with a reason
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': true, 'ts-expect-error': 'allow-with-description' },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../*', '../../../*'],
              message:
                'Use the @/ alias; relative imports may climb one level at most (standards §2).',
            },
          ],
        },
      ],
    },
  },
  {
    // components receive data through props; no server code, no Payload (standards §2 boundary 2)
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['../../*', '../../../*'], message: 'Use the @/ alias.' },
            {
              group: ['@/lib/server', '@/lib/server/*'],
              message: 'Components never import server code; pass data as props.',
            },
            {
              group: ['payload', '@payloadcms/*'],
              message: 'Components never import Payload; pass data as props.',
            },
          ],
        },
      ],
    },
  },
]

export default config
