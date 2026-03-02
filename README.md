# Spotify Track Search

A simple Spotify API client to search tracks and play previews. Built with Next.js and TanStack Query.

## Run locally

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). Paste your Spotify access token in the app to enable search.

## How to get a Spotify access token

### 1. Create an app

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Log in and click **Create app**.
3. Copy your **Client ID** and **Client Secret**.

### 2. Get an access token

Use the Client Credentials flow with `curl` (no manual Base64). In a terminal:

```bash
export SPOTIFY_CLIENT_ID="YOUR_CLIENT_ID"
export SPOTIFY_CLIENT_SECRET="YOUR_CLIENT_SECRET"

curl -X POST "https://accounts.spotify.com/api/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -u "$SPOTIFY_CLIENT_ID:$SPOTIFY_CLIENT_SECRET"
```

The response JSON contains `access_token`. Copy that value into the app.

## Deploy

The project is deployed using [Vercel](https://vercel.com). Live URL: https://react-spotify-client-kappa.vercel.app/
