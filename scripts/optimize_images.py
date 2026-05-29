from __future__ import annotations

from pathlib import Path

from PIL import Image


ROOT_DIR = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT_DIR / "images"
OUTPUT_DIR = ROOT_DIR / "images_optimized"
MAX_WIDTH = 960
QUALITY = 82


def main() -> int:
    if not SOURCE_DIR.is_dir():
        print(f"Source image directory is missing: {SOURCE_DIR}")
        return 1

    total_before = 0
    total_after = 0

    for source_path in sorted(SOURCE_DIR.glob("*/image.png"), key=_image_sort_key):
        image_id = source_path.parent.name
        output_path = OUTPUT_DIR / image_id / "image.webp"
        output_path.parent.mkdir(parents=True, exist_ok=True)

        with Image.open(source_path) as image:
            optimized = _resize_for_menu(image)
            optimized.save(output_path, "WEBP", quality=QUALITY, method=6)

        before = source_path.stat().st_size
        after = output_path.stat().st_size
        total_before += before
        total_after += after
        print(f"{image_id}: {before // 1024} KB -> {after // 1024} KB")

    if total_before:
        saved = 100 - (total_after / total_before * 100)
        print(
            "Total: "
            f"{total_before // 1024} KB -> {total_after // 1024} KB "
            f"({saved:.1f}% smaller)"
        )

    return 0


def _resize_for_menu(image: Image.Image) -> Image.Image:
    normalized = image.convert("RGB")
    width, height = normalized.size

    if width <= MAX_WIDTH:
        return normalized

    target_height = round(height * MAX_WIDTH / width)
    return normalized.resize((MAX_WIDTH, target_height), Image.Resampling.LANCZOS)


def _image_sort_key(path: Path) -> tuple[int, str]:
    return (int(path.parent.name), path.parent.name) if path.parent.name.isdigit() else (0, path.parent.name)


if __name__ == "__main__":
    raise SystemExit(main())
