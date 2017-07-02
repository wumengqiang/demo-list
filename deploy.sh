#! /bin/bash
base_dir=$(dirname $0)
cd $base_dir
git push  origin master
pm2 deploy demo.config.js production
