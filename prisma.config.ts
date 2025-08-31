import { defineConfig } from '@prisma/config'
import { execSync } from 'child_process'

export default defineConfig({
  // You can define a seed runner here
  seed: async () => {
    // Run tsx directly
    execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' })
  },
})
