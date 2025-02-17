up:
	docker-compose up --build

down:
	docker-compose down --volumes

restart:
	docker-compose down
	docker-compose up --build