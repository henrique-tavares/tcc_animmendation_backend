#!/usr/bin/env bash

if [ -f "package.json" ]; then
  pnpm i
  # pnpm prisma migrate dev
fi

fish -c "fisher install pure-fish/pure"

exec "$@"