Database Setup Commands

# 1. Generate Prisma client (creates types!)

npx prisma generate

# 2. Create database and tables

npx prisma db push

# 3. Seed with initial data

npx prisma db seed

# 4. (Optional) Open database browser

npx prisma studio

====================
Database Management:

# View your data in browser

npm run db:studio

# Reset database (careful!)

npm run db:reset

# Re-seed from JSON

npm run db:seed
