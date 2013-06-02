BIN = ./node_modules/.bin

.PHONY: tests

tests:
	$(BIN)/mocha
