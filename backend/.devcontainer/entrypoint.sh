#!/bin/bash

if [ -f "package.json" ]; then
  pnpm i
  pnpm prisma migrate dev
fi

exec "$@"