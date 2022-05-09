#!/bin/bash

# from project root directory

# below line clears coverage directory prior to generating new coverage
rm -rf ./coverage

# below line runs tests in parallel (default to num of CPUs available) w/ coverage
deno test --allow-env --config ./deno.jsonc --jobs --coverage=./coverage ./test
