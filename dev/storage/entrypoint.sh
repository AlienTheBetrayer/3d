#!/bin/sh
set -e

sed -e "s|\${S3_DEV_ACCESS_KEY}|${S3_DEV_ACCESS_KEY}|g" \
    -e "s|\${S3_DEV_SECRET_KEY}|${S3_DEV_SECRET_KEY}|g" \
    -e "s|\${S3_DEV_BUCKET}|${S3_DEV_BUCKET}|g" \
    /config/s3.json.template > /config/s3.json

exec weed "$@"
