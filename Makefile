all: lint test build

test:
	go mod tidy
	go test -timeout=10s -race -benchmem ./...

build:
	go build -o bloco main.go

lint: bin/golangci-lint
	go fmt ./...
	go vet ./...
	bin/golangci-lint -c .golangci.yml run ./...

bin/golangci-lint:
	mkdir -p bin
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s v1.50.1

setup: bin/golangci-lint
	go mod download
