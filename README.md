# Codex Frontend

A frontend for codex made with Flutter.

## Features

- Upload file
- View file Uploaded
- Download file

## Planned Features

- Upload to codex nodes
- Download with correct file name and extension
- Settings for the connection
- Persist the state (save recent upload list)
- Dockerize frontend
- Add support for marketplace endpoints
- Show status of locally running codex node
- Show status of connection to codex peers

## How To Run It

```console
git clone https://github.com/Kayvon-Martinez/codex-frontend
cd codex-frontend
docker build -f Dockerfile.api -t codex-frontend-api .
docker build -f Dockerfile.client -t codex-frontend-client .
docker compose up
```

Go to [localhost:3000](http://localhost:3000)

## Screenshots

![Data page: Upload](https://github.com/Kayvon-Martinez/codex-frontend/blob/master/screenshots/upload-page.png)
![Data page: Upload (with uploads)](https://github.com/Kayvon-Martinez/codex-frontend/blob/master/screenshots/upload-page-uploads.png)
![Data page: Download](https://github.com/Kayvon-Martinez/codex-frontend/blob/master/screenshots/download-page.png)
