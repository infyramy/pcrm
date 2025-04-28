# He and She Web Application

This is a Vue 3 application with TypeScript, Vite, and TailwindCSS.

## Development Setup

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

## Deployment Instructions

This application is configured to be deployed using Docker.

### Manual Deployment

To deploy manually, follow these steps:

1. Build the Docker image:
   ```bash
   docker build -t heandshe-web .
   ```

2. Run the container:
   ```bash
   docker run -d \
     --name heandshe-web \
     -p 3100:3100 \
     -v heandshe_web_data:/usr/share/nginx/html \
     --restart unless-stopped \
     heandshe-web
   ```

### Cleaning Up

To clean up the deployment:

```bash
# Stop and remove the container
docker stop heandshe-web
docker rm heandshe-web

# Optionally remove the image
docker rmi heandshe-web
```

## Accessing the Application

Once deployed, the application will be accessible at:

- http://your-server-ip:3100
- http://heandshecoffee.com (when DNS is properly configured to point to the server:3100)

## Additional Information

The application is configured to run on port 3100.
