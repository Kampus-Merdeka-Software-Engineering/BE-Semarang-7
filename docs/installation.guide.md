# indonary-backend-node

### To install dependencies:

<details open>
<summary>Using <b>npm</b></summary>
<br>

```bash
npm install
```

</details>
<details>
<summary>Using <b>pnpm</b></summary>
<br>

```bash
pnpm install
```

</details>

### To create .env file:

```bash
cp .env.example .env
```

### To setup database:

> Edit .env file to match your database configuration. Please refer to [Prisma's documentation](https://www.prisma.io/docs/concepts/database-connectors) for more information.

![Alt text](https://www.prisma.io/docs/static/a3179ecce1bf20faddeb7f8c02fb2251/663f3/mysql-connection-string.png)

### To sync database:

> Use `prisma db push` only for prototyping. You shouldn't use it in production. Please refer to [Prisma's documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push) for more information.

<details open>
<summary>Using <b>npm</b></summary>
<br>

```bash
npx prisma generate
npx prisma db push
```

</details>
<details>
<summary>Using <b>pnpm</b></summary>
<br>

```bash
pnpm dlx prisma generate
pnpm dlx prisma db push
```

</details>

### To run:

> In this project, [nodemon](https://nodemon.io/) is used to watch for changes in the source code and restart the [ts-node](https://github.com/TypeStrong/ts-node) server automatically. You can configure it in `nodemon.json` file.

<details open>
<summary>Using <b>npm</b></summary>
<br>

```bash
npm dev
```

</details>
<details>
<summary>Using <b>pnpm</b></summary>
<br>

```bash
pnpm dev
```

</details>
