import os
import re
import zipfile
from pathlib import Path
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

CURRENT_TEMPLATE_NAME = r"AD_GI_EstadisticasPrestacionesEconomicas"


def unzipfile(path: str, directory_to_extract: str) -> None:
    with zipfile.ZipFile(path, "r") as zip_ref:
        zip_ref.extractall(path=directory_to_extract)


def rename_files_and_folders(
    folder_path: Path, new_name: str
) -> tuple[bool, list[str], int]:
    """
    Rename files, folders, and replace content in text files
    Returns: (success_status, list_of_messages, total_matches)
    """
    logger.info("Starting rename operation")
    messages = []
    success = True
    total_matches = 0

    try:
        # First pass: Collect all paths and count matches in names
        paths_to_rename: list[tuple[Path, str]] = []
        for root, dirs, files in os.walk(folder_path, topdown=False):
            # Collect files
            for file in files:
                file_path = Path(root) / file
                new_file_name = re.sub(CURRENT_TEMPLATE_NAME, new_name, file)
                # Count matches in file name
                matches = len(re.findall(CURRENT_TEMPLATE_NAME, file))
                total_matches += matches
                if new_file_name != file:
                    paths_to_rename.append((file_path, new_file_name))

            # Collect directories
            for dir_name in dirs:
                dir_path = Path(root) / dir_name
                new_dir_name = re.sub(CURRENT_TEMPLATE_NAME, new_name, dir_name)
                # Count matches in directory name
                matches = len(re.findall(CURRENT_TEMPLATE_NAME, dir_name))
                total_matches += matches
                if new_dir_name != dir_name:
                    paths_to_rename.append((dir_path, new_dir_name))

        # Second pass: Process content in text files
        for root, _, files in os.walk(folder_path):
            for file in files:
                file_path = Path(root) / file
                try:
                    # Except the files with .xlsx extension
                    _, extension = os.path.splitext(file_path)
                    if extension.lower().strip() == ".xlsx":
                        continue

                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()

                    # Count matches in content
                    matches = len(re.findall(CURRENT_TEMPLATE_NAME, content))
                    total_matches += matches

                    new_content = re.sub(CURRENT_TEMPLATE_NAME, new_name, content)

                    if new_content != content:
                        with open(file_path, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        messages.append(
                            f"Updated content in: {file_path} ({matches} matches)"
                        )
                except Exception as e:
                    success = False
                    messages.append(f"Failed to process {file_path}: {str(e)}")

        # Third pass: Rename files and folders
        for old_path, new_name in paths_to_rename:
            try:
                new_path = old_path.parent / new_name
                old_path.rename(new_path)
                matches = len(re.findall(CURRENT_TEMPLATE_NAME, old_path.name))
                messages.append(f"Renamed {old_path} to {new_path} ({matches} matches)")
            except Exception as e:
                success = False
                messages.append(f"Failed to rename {old_path}: {str(e)}")

        return success, messages, total_matches

    except Exception as e:
        logger.error(f"Critical error during rename operation: {str(e)}")
        return False, [f"Critical error: {str(e)}"], total_matches


def compress_file(
    folder_path: Path, output_name: str, destination_folder: Path
) -> tuple[bool, str]:
    """
    Compress the folder into a zip file
    """
    logger.info("Starting compression operation")
    try:
        output_path = destination_folder / f"{output_name}.zip"

        # Ensure output file doesn't already exist
        if output_path.exists():
            output_path.unlink()

        with zipfile.ZipFile(output_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for root, _, files in os.walk(folder_path):
                for file in files:
                    file_path = Path(root) / file
                    # Skip the output zip file itself
                    if file_path == output_path:
                        continue
                    rel_path = file_path.relative_to(folder_path)
                    zipf.write(file_path, rel_path)

        return True, f"Created zip file: {output_path}"

    except Exception as e:
        logger.error(f"Compression failed: {str(e)}")
        return False, f"Compression failed: {str(e)}"


def main():
    """Main function to orchestrate the rename and compress operations"""
    try:
        folder_path = Path(
            input("Enter the folder path where the files will be extracted: ").strip()
        )
        zip_file_path = input(
            "Type the path of the current template (.zip) (compress template): "
        )
        new_name = input(
            "Enter the process name (for renaming the files and folders): "
        ).strip()
        destination_folder = Path(
            input("Dstination folder path (where the .zip will be located): ")
        )

        print("=" * 80)

        if not folder_path.exists():
            logger.info("The current folder does not exist. It will be created")
            os.makedirs(folder_path)

        # Call the function to extract the file in a folder
        unzipfile(path=zip_file_path, directory_to_extract=str(folder_path))

        # Rename files, folders, and content
        rename_status, rename_messages, total_matches = rename_files_and_folders(
            folder_path, new_name
        )
        for msg in rename_messages:
            print(msg)

        # Print total matches
        print(f"\nTotal matches found for '{CURRENT_TEMPLATE_NAME}': {total_matches}")

        # Compress the folder
        compress_status, compress_message = compress_file(
            folder_path, new_name, destination_folder
        )
        print(compress_message)

        # Print final status
        print(f"\nRename Status: {'Success' if rename_status else 'Failed'}")
        print(f"Compress Status: {'Success' if compress_status else 'Failed'}")
        print("=" * 80)

    except KeyboardInterrupt:
        logger.info("Operation cancelled by user")
        print("\nOperation cancelled by user")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        print(f"Error: {str(e)}")


if __name__ == "__main__":
    main()  # Execute the main function
