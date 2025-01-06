#!/bin/bash

line_count=$(grep -vE '^(#|$)' .env | wc -l | tr -d '[:space:]')
echo "⏱️ Timing \`op read\` parsing ${line_count} individual .env file references"

real_time=$( (time while IFS= read -r line; do
  if [[ $line =~ ^# ]]; then
    continue
  fi

  if [[ $line =~ op://(.+) ]]; then
    op_reference="${BASH_REMATCH[1]}"
    op read "op://${op_reference}" > /dev/null
  fi
done < .env) 2>&1 | grep real | awk '{print $2}')

echo "ℹ️ Took ${real_time}"
