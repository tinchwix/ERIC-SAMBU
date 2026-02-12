#!/usr/bin/env python3
"""
Cloudinary Migration Script for Author Portfolio
Uploads all images and documents to Cloudinary and updates HTML/CSS/JS references
"""

import os
import sys
import json
import re
from pathlib import Path
from typing import Dict, List, Tuple

# Load environment variables from .env file
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # dotenv is optional

# Check if cloudinary is installed
try:
    import cloudinary
    import cloudinary.uploader
    import cloudinary.api
except ImportError:
    print("ERROR: Cloudinary SDK not installed!")
    print("Please install it with: pip install cloudinary")
    sys.exit(1)

# Configuration
WEBSITE_DIR = Path(__file__).parent
ASSET_DIRS = ["Images", "Docs"]
CLOUDINARY_FOLDER = "author-portfolio"

HTML_FILES = [
    "index.html",
    "collection.html",
    "book-detail.html"
]

CSS_FILES = [] # Handled by Tailwind CDN in this project mostly, but keeping for completeness

def setup_cloudinary():
    """Setup Cloudinary configuration from environment variables"""
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
    api_key = os.getenv("CLOUDINARY_API_KEY")
    api_secret = os.getenv("CLOUDINARY_API_SECRET")
    
    if not all([cloud_name, api_key, api_secret]):
        print("\n" + "="*60)
        print("CLOUDINARY CREDENTIALS REQUIRED")
        print("="*60)
        sys.exit(1)
    
    cloudinary.config(
        cloud_name=cloud_name,
        api_key=api_key,
        api_secret=api_secret,
        secure=True
    )
    
    return cloud_name

def get_all_assets() -> List[Tuple[Path, str, str]]:
    """Get all asset files, their relative paths, and original directory"""
    assets = []
    
    for base_dir_name in ASSET_DIRS:
        base_dir = WEBSITE_DIR / base_dir_name
        if not base_dir.exists():
            continue
            
        for asset_path in base_dir.rglob("*"):
            if asset_path.is_file():
                # Get relative path including the base directory name
                rel_path = asset_path.relative_to(WEBSITE_DIR)
                
                # Determine resource type
                ext = asset_path.suffix.lower()
                if ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.jfif', '.svg']:
                    res_type = "image"
                else:
                    res_type = "raw"
                
                assets.append((asset_path, str(rel_path).replace("\\", "/"), res_type))
    
    return assets

def upload_assets(dry_run=False) -> Tuple[Dict, Dict]:
    """Upload all assets to Cloudinary"""
    assets = get_all_assets()
    results = {
        'uploaded': [],
        'skipped': [],
        'errors': []
    }
    url_mapping = {}
    
    print(f"\n[UPLOAD] Found {len(assets)} assets to upload")
    
    for asset_path, rel_path, res_type in assets:
        # Create public_id: author-portfolio/Images/ericpics/Eric Pic 1.jpg
        public_id = f"{CLOUDINARY_FOLDER}/{rel_path}"
        
        # Remove extension for images in public_id (Cloudinary convention)
        if res_type == "image":
            public_id_without_ext = os.path.splitext(public_id)[0]
        else:
            public_id_without_ext = public_id
        
        try:
            if dry_run:
                print(f"[DRY RUN] Would upload: {rel_path} ({res_type}) -> {public_id}")
                cloudinary_url = f"https://res.cloudinary.com/CLOUD_NAME/{res_type}/upload/{public_id}"
                results['uploaded'].append(rel_path)
            else:
                # Upload to Cloudinary
                upload_result = cloudinary.uploader.upload(
                    str(asset_path),
                    public_id=public_id_without_ext,
                    folder="",  # Folder is already in public_id
                    overwrite=True,
                    resource_type=res_type
                )
                
                cloudinary_url = upload_result['secure_url']
                print(f"[OK] Uploaded: {rel_path}")
                results['uploaded'].append(rel_path)
            
            # Store mapping for URL replacement
            url_mapping[rel_path] = cloudinary_url
            
        except Exception as e:
            error_msg = f"Error uploading {rel_path}: {str(e)}"
            print(f"[ERROR] {error_msg}")
            results['errors'].append(error_msg)
    
    return results, url_mapping

def update_files(url_mapping: Dict[str, str], dry_run=False) -> Dict:
    """Update asset references in website files"""
    results = {
        'updated': [],
        'errors': []
    }
    
    for filename in HTML_FILES:
        file_path = WEBSITE_DIR / filename
        
        if not file_path.exists():
            results['errors'].append(f"File not found: {filename}")
            continue
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            changes_count = 0
            
            # Sort local paths by length (longest first) to avoid partial replacements
            sorted_local_paths = sorted(url_mapping.keys(), key=len, reverse=True)
            # Replace all asset references using placeholders to avoid double-replacement
            # (where a local path is a substring of a Cloudinary URL)
            placeholders = {}
            temp_content = content
            
            for i, local_path in enumerate(sorted_local_paths):
                placeholder = f"__CLOUDINARY_PLACEHOLDER_{i}__"
                placeholders[placeholder] = url_mapping[local_path]
                
                # Replace local path and its URL-encoded version
                encoded_path = local_path.replace(" ", "%20")
                
                # Use string replacement - sorting by length descending ensures 
                # longer paths are replaced before their parent directories
                temp_content = temp_content.replace(local_path, placeholder)
                if encoded_path != local_path:
                    temp_content = temp_content.replace(encoded_path, placeholder)
            
            # Now replace all placeholders with actual Cloudinary URLs
            final_content = temp_content
            changes_count = 0
            for placeholder, cloudinary_url in placeholders.items():
                if placeholder in final_content:
                    count = final_content.count(placeholder)
                    final_content = final_content.replace(placeholder, cloudinary_url)
                    changes_count += count
            
            content = final_content
            
            if content != original_content:
                if dry_run:
                    print(f"[DRY RUN] Would update {filename}: {changes_count} references")
                    results['updated'].append((filename, changes_count))
                else:
                    # Create backup
                    backup_path = file_path.with_suffix(file_path.suffix + '.backup')
                    with open(backup_path, 'w', encoding='utf-8') as f:
                        f.write(original_content)
                    
                    # Write updated content
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    
                    print(f"[OK] Updated {filename}: {changes_count} references")
                    results['updated'].append((filename, changes_count))
            else:
                print(f"[INFO] No references found in {filename}")
        
        except Exception as e:
            results['errors'].append(f"Error updating {filename}: {str(e)}")
    
    return results

def save_migration_report(upload_results, update_results, url_mapping):
    """Save migration report to JSON file"""
    report = {
        'upload': upload_results,
        'updates': {
            'files': [{'file': f, 'changes': c} for f, c in update_results['updated']],
            'errors': update_results['errors']
        },
        'url_mapping': url_mapping
    }
    
    report_path = WEBSITE_DIR / "migration_report.json"
    with open(report_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)
    
    print(f"\n[REPORT] Migration report saved to: migration_report.json")

def main():
    """Main execution function"""
    dry_run = "--dry-run" in sys.argv
    upload_only = "--upload-only" in sys.argv
    update_only = "--update-urls" in sys.argv
    
    if dry_run:
        print("[DRY RUN] MODE - No changes will be made\n")
    else:
        print("[EXECUTE] CLOUDINARY MIGRATION\n")
    
    cloud_name = setup_cloudinary()
    print(f"[CONFIG] Connected to Cloudinary: {cloud_name}\n")
    
    url_mapping = {}
    upload_results = {'uploaded': [], 'skipped': [], 'errors': []}
    
    if not update_only:
        print("[UPLOAD] Starting asset upload to Cloudinary...")
        upload_results, url_mapping = upload_assets(dry_run)
    else:
        report_path = WEBSITE_DIR / "migration_report.json"
        if report_path.exists():
            with open(report_path, 'r') as f:
                report = json.load(f)
                url_mapping = report.get('url_mapping', {})
        else:
            print("[ERROR] No migration report found. Run upload first.")
            sys.exit(1)
    
    update_results = {'updated': [], 'errors': []}
    
    if not upload_only:
        print("\n[UPDATE] Updating website files...")
        update_results = update_files(url_mapping, dry_run)
    
    if not dry_run and url_mapping:
        save_migration_report(upload_results, update_results, url_mapping)
    
    print("\n" + "="*60)
    print("MIGRATION SUMMARY")
    print("="*60)
    print(f"Uploaded: {len(upload_results['uploaded'])}")
    print(f"Files Updated: {len(update_results['updated'])}")
    print(f"Errors: {len(upload_results['errors']) + len(update_results['errors'])}")
    print("="*60)

if __name__ == "__main__":
    main()
