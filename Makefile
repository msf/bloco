all: hardhat lint test build

setup-hardhat:
	npm add --save-dev hardhat
	npx hardhat init
	npm add @uniswap/v3-periphery @uniswap/v3-core
	npm add @openzeppelin/contracts@3
	npm add @nomiclabs/hardhat-vyper


hardhat:
	npx hardhat compile

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
