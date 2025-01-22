import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Utilise ts-jest pour les fichiers .ts et .tsx
  testEnvironment: 'node', // Définir l'environnement de test sur Node.js
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transformer les fichiers .ts et .tsx avec ts-jest
  },
  verbose: true, // Active le mode détaillé dans les résultats des tests
};

export default config;