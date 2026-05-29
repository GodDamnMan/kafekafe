#!/usr/bin/env sh
set -eu

BASE_URL="${1:-http://127.0.0.1:8080}"
TMP_MENU="$(mktemp)"
TMP_IMAGE_HEADERS="$(mktemp)"
TMP_WEBP_HEADERS="$(mktemp)"

cleanup() {
  rm -f "$TMP_MENU" "$TMP_IMAGE_HEADERS" "$TMP_WEBP_HEADERS"
}
trap cleanup EXIT

curl -fsS "$BASE_URL/" >/dev/null
curl -fsS "$BASE_URL/healthz" >/dev/null
curl -fsS "$BASE_URL/api/menu" -o "$TMP_MENU"

python3 - "$TMP_MENU" <<'PY'
import json
import sys

menu = json.loads(open(sys.argv[1], encoding="utf-8").read())
assert isinstance(menu, list) and menu, "menu must be a non-empty list"
first_item = menu[0]["items"][0]
assert first_item["picture"].startswith("/api/image/"), "picture must be relative"
print(f"menu ok: {len(menu)} sections")
PY

curl -fsSI "$BASE_URL/api/image/1" -o "$TMP_IMAGE_HEADERS"
grep -qi "content-type: image/png" "$TMP_IMAGE_HEADERS"

curl -fsSI -H "Accept: image/webp" "$BASE_URL/api/image/1" -o "$TMP_WEBP_HEADERS"
grep -qi "content-type: image/webp" "$TMP_WEBP_HEADERS"

echo "smoke test passed: $BASE_URL"
