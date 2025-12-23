# Nano Banana Slides Prompter

Generate optimized prompts for Nano Banana Pro Slides - Generate slides using AI.

![App Screenshot](./docs/samples/Screenshot.png)

## Sample Slides

Slides generated using prompts from this tool:

<p>
  <img src="./docs/samples/sample6.jpeg" width="240" alt="Sample 1"/>
  <img src="./docs/samples/sample8.jpeg" width="240" alt="Sample 2"/>
  <img src="./docs/samples/sample3.jpeg" width="240" alt="Sample 3"/>
</p>
<p>
  <img src="./docs/samples/sample4.jpeg" width="240" alt="Sample 4"/>
  <img src="./docs/samples/sample5.jpeg" width="240" alt="Sample 5"/>
  <img src="./docs/samples/sample1.jpeg" width="240" alt="Sample 6"/>
</p>
<p>
  <img src="./docs/samples/sample7.jpeg" width="240" alt="Sample 7"/>
  <img src="./docs/samples/sample2.jpeg" width="240" alt="Sample 8"/>
</p>

## Features

- Multiple visual styles (Professional, Technical, Creative, Educational, and more)
- Configurable color palettes and layouts
- Collapsible slide previews with individual copy buttons
- URL content extraction for automatic content generation
- Configurable LLM backend (OpenAI, OpenRouter, Ollama, etc.)

## Quick Start

### Prerequisites

- Node.js 18+
- Bun runtime (for backend)
- OpenAI-compatible API key

### Installation

```sh
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && bun install && cd ..
```

### Configuration

Create `/server/.env` from the example:

```sh
cp server/.env.example server/.env
```

Edit the `.env` file with your LLM configuration:

```env
OPENAI_API_BASE=https://api.openai.com/v1
OPENAI_API_KEY=your-api-key
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=16384
OPENAI_TEMPERATURE=0.7
PORT=3001
```

### Development

```sh
# Run both frontend and backend
npm run dev
```

- Frontend: http://localhost:8080
- Backend: http://localhost:3001

## Docker Deployment

You can run the entire stack locally using Docker Compose.

### Prerequisites

- Docker
- Docker Compose

### Running with Docker

1.  **Build and Run**:
    ```sh
    docker-compose up --build
    ```

2.  **Access the Application**:
    - Open [http://localhost:8080](http://localhost:8080) in your browser.

The `docker-compose.yml` orchestrates:
- **Frontend**: Served via Nginx on port 8080.
- **Backend**: Hono server running on internal port 3001.

### Deploy from Images (Production)

To deploy using the pre-built images from GitHub Container Registry (GHCR), create a `docker-compose.yml` file on your server:

```yaml
services:
  frontend:
    image: ghcr.io/nomie7/nano-banana-slides-prompter-frontend:latest
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always

  backend:
    image: ghcr.io/nomie7/nano-banana-slides-prompter-backend:latest
    environment:
      - PORT=3001
      - OPENAI_API_BASE=${OPENAI_API_BASE:-https://api.openai.com/v1}
      - OPENAI_API_KEY=your-api-key-here
      - OPENAI_MODEL=gpt-4o
      - OPENAI_MAX_TOKENS=16384
      - OPENAI_TEMPERATURE=0.7
    restart: always
```

Then run:

```sh
docker-compose up -d
```


## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Bun, Hono, OpenAI SDK
- **UI Components**: Radix UI primitives

## Version

v1.0.1
