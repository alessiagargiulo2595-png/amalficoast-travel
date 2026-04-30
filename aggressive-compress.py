#!/usr/bin/env python3
from PIL import Image
import os
from pathlib import Path

def compress_aggressive(input_path, output_path, quality=75, max_width=1920):
    """Aggressively compress image"""
    try:
        img = Image.open(input_path)

        # Resize more aggressively for hero images
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

        # Convert RGBA to RGB
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img

        # Save with aggressive compression
        img.save(output_path, 'JPEG', quality=quality, optimize=True)
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

def get_size(filepath):
    return os.path.getsize(filepath) / (1024 * 1024)

# Only compress hero images (the largest ones)
images_dir = Path('public/images')
hero_files = list(images_dir.glob('*-hero.jpg'))

print(f"Compressing {len(hero_files)} hero images aggressively...\n")

total_before = 0
total_after = 0

for jpg_file in sorted(hero_files):
    before = get_size(jpg_file)
    total_before += before

    compress_aggressive(jpg_file, jpg_file, quality=72, max_width=1920)

    after = get_size(jpg_file)
    total_after += after
    reduction = ((before - after) / before) * 100 if before > 0 else 0

    print(f"OK {jpg_file.name}: {before:.1f}MB -> {after:.1f}MB (-{reduction:.0f}%)")

print(f"\n{'='*60}")
print(f"Hero images: {total_before:.1f}MB -> {total_after:.1f}MB")
saved = total_before - total_after
percent = (saved / total_before * 100) if total_before > 0 else 0
print(f"Saved: {saved:.1f}MB ({percent:.1f}%)")
