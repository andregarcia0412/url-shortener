<div align="center">

<img src="frontend/public/favicon.svg" width="80" alt="ShortyURL" />

# ShortyURL

<p>
<img src="https://img.shields.io/badge/NestJS-12-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</p>

</div>

---

## 📌 About

**ShortyURL** is a full-stack URL shortener. The backend is a REST API built with **NestJS**, organized in layers (controller → service → use case → repository) using ports and adapters, persisting to **MongoDB**. The frontend is a **React 19 + Vite + Tailwind CSS 4** SPA with a single-screen flow: paste, shorten, copy.

Every link gets a random **8-character alphanumeric code** (62 options per position, ~2.1 × 10¹⁴ combinations), generated with `crypto.randomInt` and retried automatically on collision.

---

## ✨ Features

| | |
| --- | --- |
| 🔗 **Link shortening** | `POST /api/v1/link` generates a unique 8-character code |
| ↪️ **Redirection** | `GET /:shortCode` responds with `302` to the original URL |
| 📊 **Click counter** | Each redirect increments `clickAmount` atomically (`$inc`) |
| 🔍 **Link lookup** | `GET /api/v1/link/:shortCode` returns link data without redirecting |
| 🛡️ **Rate limiting** | Global throttler plus a dedicated 10 req/min limit on creation |
| ✅ **Two-sided validation** | `class-validator` on the server and `zod` on the client |
| 📚 **Live documentation** | Swagger UI at `/api/v1/docs` |
| 🤖 **SEO aware** | `X-Robots-Tag: noindex, nofollow` on redirects plus `robots.txt` |
| 🎨 **Custom design system** | Color tokens in Tailwind 4's `@theme`, dark theme |
| ♿ **Accessibility** | Semantic HTML, `alt` text on icons and a `<noscript>` fallback |

---

## 🧱 Stack

<table>
<tr><th align="left">Layer</th><th align="left">Technologies</th></tr>
<tr>
<td><strong>Backend</strong></td>
<td>NestJS 12 · TypeScript 6 · Mongoose 9 · MongoDB 7 · Joi · class-validator · @nestjs/throttler · @nestjs/swagger · Jest · oxlint</td>
</tr>
<tr>
<td><strong>Frontend</strong></td>
<td>React 19 (with React Compiler) · Vite 8 · Tailwind CSS 4 · Axios · Zod 4 · TypeScript 6 · oxlint</td>
</tr>
<tr>
<td><strong>Infra</strong></td>
<td>Docker Compose (MongoDB + Mongo Express)</td>
</tr>
</table>

---

## 📂 Structure

```
url-shortener/
├── backend/
│   ├── docker-compose.yaml          # MongoDB + Mongo Express
│   └── src/
│       ├── main.ts                  # bootstrap, global prefix, CORS, Swagger
│       ├── app.module.ts            # ConfigModule (Joi) + Throttler + modules
│       ├── shared/database/         # Mongoose connection
│       └── modules/link/
│           ├── controller/          # link.controller.ts · link-redirect.controller.ts
│           ├── use-case/            # create · find · resolve-url
│           ├── repository/          # Mongoose implementation
│           ├── interface/           # ports (Symbol) for service and repository
│           ├── dto/                 # create-link.dto · return-link.dto
│           ├── schema/              # Link (originalUrl, shortCode, clickAmount)
│           ├── pipe/                # ShortCodePipe — validates /^[A-Za-z0-9]{8}$/
│           └── error/               # DuplicateKeyError
└── frontend/
    └── src/
        ├── App.tsx                  # flow state: input → loading → result
        ├── api/                     # axios client + LinkService
        ├── components/              # Header · Input · Button · TextButton · ErrorMessage · ResultCard
        ├── validations/             # UrlSchema (zod)
        ├── dto/                     # types shared with the API
        └── index.css                # Tailwind design tokens
```

### `link` module architecture

```
HTTP  →  Controller  →  LinkServicePort  →  Use Case  →  LinkRepositoryPort  →  MongoDB
                        (LinkService)                     (LinkRepository)
```

Controllers depend on **interfaces** (`LinkServicePort`, `LinkRepositoryPort`), registered as providers through a `Symbol`. Swapping Mongoose for another adapter touches nothing above the repository.

---

## 🚀 Getting started

### Prerequisites

- **Node.js 20+**
- **Docker** and **Docker Compose** (or your own MongoDB instance)

### 1. Clone

```bash
git clone git@github.com:andregarcia0412/url-shortener.git
cd url-shortener
```

### 2. Backend

```bash
cd backend
cp .env.example .env      # fill in the variables (table below)
npm install
docker compose up -d      # starts MongoDB (:27017) and Mongo Express (:8081)
npm run start:dev
```

The API runs at `http://localhost:3000` and Swagger at `http://localhost:3000/api/v1/docs`.

### 3. Frontend

```bash
cd frontend
cp .env.example .env      # VITE_API_URL=http://localhost:3000/api/v1
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

---

## ⚙️ Environment variables

### `backend/.env`

All of them are validated at startup by a **Joi** schema — if anything is missing or malformed, the app will not boot.

| Variable | Description | Example |
| --- | --- | --- |
| `PORT` | API HTTP port | `3000` |
| `NODE_ENV` | `development` or `production` | `development` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins (required in production) | `https://shortyurl.com` |
| `MONGO_USER` | MongoDB user | `root` |
| `MONGO_PASSWORD` | MongoDB password | `secret` |
| `MONGO_HOST` | MongoDB host | `localhost` |
| `MONGO_PORT` | MongoDB port | `27017` |
| `MONGO_DB` | Database name | `url-shortener` |
| `MONGO_URI` | Connection string (built from the values above) | `mongodb://${MONGO_USER}:...` |
| `BASE_URL` | Base used to build the returned short link | `http://localhost:3000` |
| `THROTTLE_TTL` | Rate limit window in ms | `60000` |
| `THROTTLE_LIMIT` | Requests allowed per window | `60` |

### `frontend/.env`

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_API_URL` | API base URL | `http://localhost:3000/api/v1` |

---

## 📡 API

> Global prefix: `/api/v1` — except for the redirect route, which lives at the root.

### `POST /api/v1/link`

Creates a short link. **Rate limit: 10 requests per minute.**

<details open>
<summary><strong>Request</strong></summary>

```json
{
  "originalUrl": "https://example.com/a/very/long/path"
}
```

`originalUrl` must be an absolute URL with an `http` or `https` protocol.

</details>

<details open>
<summary><strong>Response <code>201 Created</code></strong></summary>

```json
{
  "originalUrl": "https://example.com/a/very/long/path",
  "shortCode": "http://localhost:3000/aB3xK9pQ",
  "clickAmount": 0,
  "createdAt": "2026-09-06T12:00:00.000Z",
  "updatedAt": "2026-09-06T12:00:00.000Z"
}
```

</details>

### `GET /api/v1/link/:shortCode`

Returns a link's data **without** redirecting and **without** counting a click. Responds `404` when the code does not exist or does not match `^[A-Za-z0-9]{8}$`.

### `GET /:shortCode`

Redirects (`302`) to the original URL, incrementing `clickAmount` in the same atomic operation. Responds with the `X-Robots-Tag: noindex, nofollow` header.

```bash
curl -i http://localhost:3000/aB3xK9pQ
```

---

## 🧪 Scripts

### Backend

```bash
npm run start:dev     # development with watch mode
npm run build         # production build
npm run start:prod    # runs the build (dist/main)
npm run test          # unit tests (Jest)
npm run test:cov      # coverage
npm run lint          # oxlint
npm run format        # prettier
```

### Frontend

```bash
npm run dev           # development server (Vite)
npm run build         # type-check + production build
npm run preview       # serves the build locally
npm run lint          # oxlint
```

---

<div align="center">

Made by [**@andregarcia0412**](https://github.com/andregarcia0412)

</div>
