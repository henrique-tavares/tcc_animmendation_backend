#!/usr/bin/env bash

if [ -f "package.json" ]; then
  pnpm i
  pnpm prisma migrate dev
fi

sudo chown -R animmendation datasets

fish -c "fisher install pure-fish/pure"

exec "$@"