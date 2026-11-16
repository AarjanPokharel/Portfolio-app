#!/usr/bin/env bash
# Publish workwithaarjan.dev: back up, build clean, upload to S3, refresh CloudFront.
# Usage, from anywhere:  ./scripts/publish.sh
set -euo pipefail   # stop on any error, unset variable, or failed pipe step

cd "$(dirname "$0")/.."   # run from the repo root, wherever it's called from
export COMPOSE_FILE=compose.yaml:compose.local.yaml
API=http://localhost:8000
BACKUP_DIR="../Portfolio-backup"
REGION=us-east-1

echo "1/7 Checking AWS login..."
aws sts get-caller-identity > /dev/null || { echo "Not logged in. Run: aws login"; exit 1; }

echo "2/7 Starting Django..."
docker compose up -d postgres-db backend
for i in $(seq 1 30); do
  curl -sf -o /dev/null "$API/api/portfolio/profile/" && break
  sleep 1
done
curl -sf -o /dev/null "$API/api/portfolio/profile/" || { echo "Django didn't answer in 30s"; exit 1; }

echo "3/7 Backing up the database..."
STAMP=$(date +%Y-%m-%d-%H%M)
docker compose exec -T postgres-db sh -c 'pg_dump -U "$POSTGRES_USER" -Fc "$POSTGRES_DB"' > "$BACKUP_DIR/portfolio-$STAMP.dump"

echo "4/7 Building the site (clean, so no stale cache)..."
CONTACT_URL=$(terraform -chdir=infra output -raw contact_url)
(cd frontend && rm -rf .next out && \
  NEXT_PUBLIC_CONTACT_URL="$CONTACT_URL" INTERNAL_API_URL="$API" npm run build)

echo "5/7 Adding photos and files..."
cp -R backend/media frontend/out/media

echo "6/7 Uploading to S3..."
BUCKET=$(terraform -chdir=infra output -raw site_bucket)
# Fingerprinted files never change: browsers may keep them for a year
aws s3 sync frontend/out/_next/static "s3://$BUCKET/_next/static" --delete --region "$REGION" \
  --cache-control "public, max-age=31536000, immutable"
# Everything else: browsers re-check every time; CloudFront keeps it a day until invalidated
aws s3 sync frontend/out/ "s3://$BUCKET" --delete --region "$REGION" \
  --exclude "_next/static/*" \
  --cache-control "public, max-age=0, s-maxage=86400, must-revalidate"

echo "7/7 Refreshing CloudFront..."
DIST_ID=$(terraform -chdir=infra output -raw distribution_id)
aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" --query "Invalidation.Status" --output text

echo "Done. Live in 1-2 minutes at https://workwithaarjan.dev"
echo "Backup saved: $BACKUP_DIR/portfolio-$STAMP.dump"
echo "When you're finished editing: docker compose stop"
