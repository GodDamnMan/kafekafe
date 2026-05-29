from __future__ import annotations

import json
import os
from pathlib import Path

from flask import Flask, abort, jsonify


DEFAULT_MENU_FILE = Path("/app/data/menu_seed.json")


def create_app() -> Flask:
    app = Flask(__name__)

    @app.get("/health")
    def health():
        _load_menu()
        return {"status": "ok"}

    @app.get("/api/menu")
    def menu():
        return jsonify(_load_menu())

    return app


def _menu_file() -> Path:
    return Path(os.environ.get("MENU_FILE", DEFAULT_MENU_FILE))


def _load_menu() -> list[dict]:
    menu_file = _menu_file()

    try:
        return json.loads(menu_file.read_text(encoding="utf-8"))
    except FileNotFoundError:
        abort(500, description=f"Menu file not found: {menu_file}")
    except json.JSONDecodeError as exc:
        abort(500, description=f"Menu file is not valid JSON: {exc}")


app = create_app()
