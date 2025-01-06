# 🍎 One Stack

>fast way to prototype full stack apps with Next.js, React, Tailwind, and Drizzle ORM

## What's in the box?

- Next.js 15
- React 19
- Tailwind CSS
- Drizzle ORM
- Auth.js
- Bun

## First steps

Before you start, you need to create a `.env` file in the root of the project and add the following variables:

```
//turso database connection
TURSO_DATABASE_URL=""
TURSO_AUTH_TOKEN=""

//auth.js config
AUTH_DRIZZLE_URL=http://localhost:3000/api/auth/callback/google
AUTH_SECRET=""

//google auth config
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
```

## Development

**Database**

To start the database, you need to run the following command:

```bash
turso dev
```

This will start the database in development mode. To more details about turso, you can check the [turso documentation](https://docs.turso.tech/introduction).


**Database generation and migration**

To generate the database schema and run the migration, you need to run the following command:

Generation
```bash
bun run generate
```

Migration
```bash
bun run migrate
```

The commands are abstraction of drizzle-kit commands, you can check the [drizzle-kit documentation](https://orm.drizzle.team/docs/kit-overview) for more details.

**Server**

To start the server, you need to run the following command:

```bash
bun run dev
```

---

Carlos Costa @ 2025
