develop:
	npx webpack serve

install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production NODE_OPTIONS=--openssl-legacy-provider npx webpack

lint:
	npx eslint .
