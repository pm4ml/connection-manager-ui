.PHONY: build run

NAME = mojaloop-payment-manager-ui

default: build

build:
	docker build -t $(NAME) API_BASE_URL=${API_BASE_URL}.

run:
	docker run --rm -p 8080:8080 --name $(NAME) $(NAME) 