#!/bin/bash

line_count=$(grep -vE '^(#|$)' .env | wc -l | tr -d '[:space:]')
echo "⏱️ Timing \`op inject\` parsing all ${line_count} references in .env file"

real_time=$( (time op inject --in-file=".env" > /dev/null) 2>&1 | grep real | awk '{print $2}')

echo "ℹ️ Took ${real_time}"
