#!/usr/bin/env python3
from PIL import Image
import os
from pathlib import Path

def compress_image(input_path, output_path, quality=85, max_width=2560):
    """Compress image and reduce file size"""
    try:
        img = Image.open(input_path)

        # Resize if too large
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

        # Convert RGBA to RGB if needed
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img

        # Save with compression
        img.save(output_path, 'JPEG', quality=quality, optimize=True)
        return True
    except Exception as e:
        print(f"Error compressing {input_path}: {e}")
        return False

def get_size(filepath):
    return os.path.getsize(filepath) / (1024 * 1024)  # MB

# Compress all JPG images
images_dir = Path('public/images')
jpg_files = list(images_dir.glob('*.jpg')) + list(images_dir.glob('*.jpeg'))

print(f"Found {len(jpg_files)} JPG files to compress\n")

total_before = 0
total_after = 0

for jpg_file in sorted(jpg_files):
    before_size = get_size(jpg_file)
    total_before += before_size

    # Compress
    compress_image(jpg_file, jpg_file, quality=82)

    after_size = get_size(jpg_file)
    total_after += after_size
    reduction = ((before_size - after_size) / before_size) * 100

    print(f"OK {jpg_file.name}: {before_size:.1f}MB -> {after_size:.1f}MB (-{reduction:.0f}%)")

print(f"\n{'='*60}")
print(f"Total: {total_before:.1f}MB -> {total_after:.1f}MB")
saved = total_before - total_after
percent = (saved / total_before * 100) if total_before > 0 else 0
print(f"Saved: {saved:.1f}MB ({percent:.1f}%)")
