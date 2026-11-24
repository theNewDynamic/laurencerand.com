#!/bin/sh
# Build command for Workers Builds (run through `npm run build_ci`).
# The same command runs for every branch and Cloudflare has no "this is a preview"
# variable, so the environment comes from the branch. Any other branch builds as
# staging: noindex, no analytics. ASTRO_ENV is inlined at build time, so
# `previews.vars` in wrangler.jsonc can't set it.
set -e

# "main" unless wrangler.jsonc sets PRODUCTION_BRANCH in `vars`. On a new site that isn't
# ready to launch, set it to a name no branch uses ("none"), so main builds as staging too.
PRODUCTION_BRANCH=$(sed -n 's/^[[:space:]]*"PRODUCTION_BRANCH": *"\([^"]*\)".*/\1/p' wrangler.jsonc)
PRODUCTION_BRANCH=${PRODUCTION_BRANCH:-main}

if [ "$WORKERS_CI_BRANCH" = "$PRODUCTION_BRANCH" ]; then
  export ASTRO_ENV=production
else
  export ASTRO_ENV=staging
fi
echo "Branch '$WORKERS_CI_BRANCH' (production: '$PRODUCTION_BRANCH'): ASTRO_ENV=$ASTRO_ENV"

astro build
