# Deployment

## Local deployment

Run this in the root folder of the project:

`docker-compose --compatibility -p docx_generation_service -f deploy/local/docker-compose.yml up --force-recreate --build`

docker-compose -p docx_generation_service -f deploy/local/docker-compose.yml up --force-recreate --build