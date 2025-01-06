#!/bin/bash

for i in {1..50}
do
  op item create --title="API Credential $i" --category="API Credential" "secret[password]=Secret $i"
done
