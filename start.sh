#!/bin/bash

base_dir=$(dirname $0)
echo $base_dir
export PORT=10010
gulp demo-info
node $base_dir/server.js
