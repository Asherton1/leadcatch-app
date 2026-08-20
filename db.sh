#!/bin/bash
# Query Supabase tables from Terminal via PostgREST.
# Usage:
#   ./db.sh leads "select=name,email&limit=5"
#   ./db.sh leads "select=*&client_id=eq.c49043b0-134a-4931-9463-7c5d658dd001"
#   ./db.sh leads "select=id" PATCH '{"status":"contacted"}'
set -e
URL=$(grep '^NEXT_PUBLIC_SUPABASE_URL=' .env.local | cut -d= -f2- | tr -d '"' | tr -d "'" | tr -d '\r')
KEY=$(grep '^SUPABASE_SERVICE_ROLE_KEY=' .env.local | cut -d= -f2- | tr -d '"' | tr -d "'" | tr -d '\r')
TABLE="$1"; QUERY="$2"; METHOD="${3:-GET}"; BODY="${4:-}"
python3 - "$URL" "$KEY" "$TABLE" "$QUERY" "$METHOD" "$BODY" <<'PYEOF'
import sys, json, urllib.request, urllib.error
url, key, table, query, method, body = sys.argv[1:7]
full = f"{url.rstrip('/')}/rest/v1/{table}?{query}"
h = {'apikey': key, 'Authorization': 'Bearer ' + key,
     'Content-Type': 'application/json', 'Prefer': 'return=representation, count=exact'}
data = body.encode() if body else None
req = urllib.request.Request(full, data=data, headers=h, method=method)
try:
    with urllib.request.urlopen(req) as r:
        cr = r.headers.get('content-range')
        out = r.read().decode()
        if cr: print(f"[rows: {cr}]")
        try: print(json.dumps(json.loads(out), indent=2)[:5000])
        except Exception: print(out[:2000])
except urllib.error.HTTPError as e:
    print("HTTP", e.code, e.read().decode()[:900])
PYEOF
