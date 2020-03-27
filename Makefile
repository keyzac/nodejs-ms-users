.DEFAULT_GOAL	:= help
.PHONY: deploy

## GENERAL ##
OWNER        = keyzac
SERVICE_NAME = users
VERSION      = v1

## DEV ##
TAG_DEV      = dev
USER_ID     ?= $(shell id -u)
GROUP_ID    ?= $(shell id -g)
TAG_MYSQL    = mysql

## DEPLOY ##
ENV              ?= dev

## RESULT_VARS ##
PROJECT_NAME         = $(OWNER)-$(ENV)-$(SERVICE_NAME)
DOCKER_NETWORK 		?= backend-network
CONTAINER_NAME       = $(PROJECT_NAME)_backend
IMAGE_DEV            = $(PROJECT_NAME):$(TAG_DEV)
PREFIX_PATH          = /$(VERSION)/$(SERVICE_NAME)
IMAGE_MYSQL		     = ${PROJECT_NAME}:${TAG_MYSQL}

build: ## build image to dev and cli: make build
	docker build -f docker/dev/Dockerfile --build-arg UID=$(USER_ID) --build-arg GID=$(GROUP_ID) -t $(IMAGE_DEV) docker/dev/

build-db: ## build image to dev and cli: make build
	docker build -f docker/mysql/Dockerfile -t ${IMAGE_MYSQL} docker/mysql/

yarn-install-local: ## yarn install on local: make yarn-install-local
	docker run --rm -u node -t -v $(PWD)/app:/home/node/app/ --entrypoint="yarn" $(IMAGE_DEV) install

prepare-db:
	docker exec -it ${CONTAINER_NAME} npx sequelize-cli db:create
	docker exec -it ${CONTAINER_NAME} npx sequelize-cli db:migrate
	docker exec -it ${CONTAINER_NAME} npx sequelize-cli db:seed:all

up: ## up docker containers: make up
	@make verify_network &> /dev/null
	@IMAGE_DEV=$(IMAGE_DEV) \
	DOCKER_NETWORK=$(DOCKER_NETWORK) \
    PREFIX_PATH=$(PREFIX_PATH) \
	CONTAINER_NAME=$(CONTAINER_NAME) \
	docker-compose -p $(SERVICE_NAME) up -d
	make attach

down: ## Stops and removes the docker containers: make down
	@IMAGE_DEV=$(IMAGE_DEV) \
	DOCKER_NETWORK=$(DOCKER_NETWORK) \
	CONTAINER_NAME=$(CONTAINER_NAME) \
	docker-compose -p $(SERVICE_NAME) down

verify_network: ## Verify the local network was created in docker, normaly created before up container service: make verify_network
	@if [ -z $$(docker network ls | grep $(DOCKER_NETWORK) | awk '{print $$2}') ]; then\
		(docker network create $(DOCKER_NETWORK));\
	fi

attach: ## attach log to console: make attach
	docker attach --sig-proxy=false $(CONTAINER_NAME)

up-db:
	IMAGE_MYSQL=$(IMAGE_MYSQL) \
	CONTAINER_NAME=$(PROJECT_NAME)_mysql \
	DOCKER_NETWORK=$(DOCKER_NETWORK) \
	docker-compose -f docker-compose.db.yml -p $(PROJECT_NAME)_mysql up -d
