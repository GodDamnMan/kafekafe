from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT_DIR = Path(__file__).resolve().parents[1]
MENU_PATH = ROOT_DIR / "data" / "menu_seed.json"
IMAGES_DIR = ROOT_DIR / "images"
OPTIMIZED_IMAGES_DIR = ROOT_DIR / "images_optimized"
PICTURE_RE = re.compile(r"^/api/image/([1-9][0-9]*)$")


def main() -> int:
    errors: list[str] = []

    try:
        menu = json.loads(MENU_PATH.read_text(encoding="utf-8"))
    except FileNotFoundError:
        print(f"Menu file is missing: {MENU_PATH}", file=sys.stderr)
        return 1
    except json.JSONDecodeError as exc:
        print(f"Menu JSON is invalid: {exc}", file=sys.stderr)
        return 1

    if not isinstance(menu, list):
        errors.append("Menu root must be a list of sections.")
    else:
        _validate_menu(menu, errors)

    if errors:
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("Menu check passed.")
    return 0


def _validate_menu(menu: list[Any], errors: list[str]) -> None:
    seen_ids: set[str] = set()

    if not menu:
        errors.append("Menu must contain at least one section.")
        return

    for section_index, section in enumerate(menu, start=1):
        if not isinstance(section, dict):
            errors.append(f"Section #{section_index} must be an object.")
            continue

        title = section.get("title")
        if not isinstance(title, str) or not title.strip():
            errors.append(f"Section #{section_index} has an empty title.")

        items = section.get("items")
        if not isinstance(items, list) or not items:
            errors.append(f"Section {title!r} must contain a non-empty items list.")
            continue

        for item_index, item in enumerate(items, start=1):
            _validate_item(
                item=item,
                item_label=f"{title or section_index} item #{item_index}",
                seen_ids=seen_ids,
                errors=errors,
            )


def _validate_item(
    item: Any,
    item_label: str,
    seen_ids: set[str],
    errors: list[str],
) -> None:
    if not isinstance(item, dict):
        errors.append(f"{item_label} must be an object.")
        return

    item_id = item.get("id")
    if not isinstance(item_id, str) or not item_id.isdigit():
        errors.append(f"{item_label} has invalid id: {item_id!r}.")
        return

    if item_id in seen_ids:
        errors.append(f"Duplicate item id: {item_id}.")
    seen_ids.add(item_id)

    for field in ("name", "description"):
        value = item.get(field)
        if not isinstance(value, str) or not value.strip():
            errors.append(f"Item {item_id} has empty {field}.")

    price = item.get("price")
    if not isinstance(price, int) or price <= 0:
        errors.append(f"Item {item_id} has invalid price: {price!r}.")

    picture = item.get("picture")
    if not isinstance(picture, str):
        errors.append(f"Item {item_id} must have a picture string.")
        return

    match = PICTURE_RE.fullmatch(picture)
    if not match:
        errors.append(f"Item {item_id} picture must look like /api/image/{item_id}.")
        return

    picture_id = match.group(1)
    if picture_id != item_id:
        errors.append(f"Item {item_id} picture points to image {picture_id}.")

    image_path = IMAGES_DIR / item_id / "image.png"
    if not image_path.is_file():
        errors.append(f"Item {item_id} is missing source image: {image_path}.")

    optimized_path = OPTIMIZED_IMAGES_DIR / item_id / "image.webp"
    if OPTIMIZED_IMAGES_DIR.exists() and not optimized_path.is_file():
        errors.append(f"Item {item_id} is missing optimized image: {optimized_path}.")


if __name__ == "__main__":
    raise SystemExit(main())
