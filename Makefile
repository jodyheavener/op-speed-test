test/all: test/read-references test/inject-env test/node-sdk

test/read-references:
	./read-references.sh

test/inject-env:
	./inject-env.sh

test/node-sdk:
	node ./test-node-sdk/index.js
