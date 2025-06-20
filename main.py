import os
import re
import zipfile
from pathlib import Path
import logging
import flet as ft

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

CURRENT_TEMPLATE_NAME = r"AD_GI_EstadisticasPrestacionesEconomicas"


# Funciones unzipfile, rename_files_and_folders y compress_file sin cambios
def unzipfile(path: str, directory_to_extract: str) -> None:
    with zipfile.ZipFile(path, "r") as zip_ref:
        zip_ref.extractall(path=directory_to_extract)


def rename_files_and_folders(
    folder_path: Path, new_name: str
) -> tuple[bool, list[str], int]:
    logger.info("Starting rename operation")
    messages = []
    success = True
    total_matches = 0

    try:
        paths_to_rename: list[tuple[Path, str]] = []
        for root, dirs, files in os.walk(folder_path, topdown=False):
            for file in files:
                file_path = Path(root) / file
                new_file_name = re.sub(CURRENT_TEMPLATE_NAME, new_name, file)
                matches = len(re.findall(CURRENT_TEMPLATE_NAME, file))
                total_matches += matches
                if new_file_name != file:
                    paths_to_rename.append((file_path, new_file_name))

            for dir_name in dirs:
                dir_path = Path(root) / dir_name
                new_dir_name = re.sub(CURRENT_TEMPLATE_NAME, new_name, dir_name)
                matches = len(re.findall(CURRENT_TEMPLATE_NAME, dir_name))
                total_matches += matches
                if new_dir_name != dir_name:
                    paths_to_rename.append((dir_path, new_dir_name))

        for root, _, files in os.walk(folder_path):
            for file in files:
                file_path = Path(root) / file
                try:
                    _, extension = os.path.splitext(file_path)
                    if extension.lower().strip() == ".xlsx":
                        continue

                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()

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
    logger.info("Starting compression operation")
    try:
        output_path = destination_folder / f"{output_name}.zip"
        if output_path.exists():
            output_path.unlink()

        with zipfile.ZipFile(output_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for root, _, files in os.walk(folder_path):
                for file in files:
                    file_path = Path(root) / file
                    if file_path == output_path:
                        continue
                    rel_path = file_path.relative_to(folder_path)
                    zipf.write(file_path, rel_path)

        return True, f"Created zip file: {output_path}"

    except Exception as e:
        logger.error(f"Compression failed: {str(e)}")
        return False, f"Compression failed: {str(e)}"


def main(page: ft.Page):
    page.title = "Rename and compress file"
    page.window.width = 600
    page.window.height = 800
    page.padding = 20
    page.window.center()
    # Disable the resize window
    page.window.maximizable = False
    page.window.resizable = False

    # Campos de entrada con valor inicial vacío para evitar None
    folder_path_input = ft.TextField(
        label="Extraction folder",
        width=500,
        hint_text="Path where the files will be extracted",
        value="",
    )
    zip_file_input = ft.TextField(
        label="ZIP File (template)",
        width=500,
        hint_text="Absolute path of the ZIP file",
        value="",
    )
    new_name_input = ft.TextField(
        label="Process name",
        width=500,
        hint_text="Process name to rename files and folders",
        value="",
    )
    destination_folder_input = ft.TextField(
        label="Destination folder",
        width=500,
        hint_text="Path where the final ZIP will be store",
        value="",
    )
    output_text = ft.Text(
        value="", width=500, height=80, selectable=True, color=ft.Colors.BLUE_GREY_300
    )

    def process_files(e):
        output_text.value = ""
        page.update()

        # Get the vaules and manage the possible None
        folder_path_str = folder_path_input.value or ""
        zip_file_path = zip_file_input.value or ""
        new_name = new_name_input.value or ""
        destination_folder_str = destination_folder_input.value or ""

        # Validations
        if (
            not folder_path_str
            or not zip_file_path
            or not new_name
            or not destination_folder_str
        ):
            output_text.value = "Error: All the fields are required."
            page.update()
            return

        try:
            folder_path = Path(folder_path_str.strip())
            destination_folder = Path(destination_folder_str.strip())

            if not folder_path.exists():
                logger.info("The folder does not exist. It will be created")
                os.makedirs(folder_path)

            # Extraer el archivo ZIP
            unzipfile(path=zip_file_path.strip(), directory_to_extract=str(folder_path))
            output_text.value += "Files extracted successfully.\n\n"

            # Rename files and folders
            rename_status, rename_messages, total_matches = rename_files_and_folders(
                folder_path, new_name.strip()
            )
            for msg in rename_messages:
                output_text.value += f"{msg}\n"
            output_text.value += (
                f"\nTotal maches found for '{CURRENT_TEMPLATE_NAME}': {total_matches}\n"
            )

            # Compress the folder
            compress_status, compress_message = compress_file(
                folder_path, new_name.strip(), destination_folder
            )
            output_text.value += f"{compress_message}\n"

            # Display the final status
            output_text.value += (
                f"\nRename status: {'Success' if rename_status else 'Failed'}\n"
            )
            output_text.value += (
                f"Estado de compresión: {'Success' if compress_status else 'Failed'}\n"
            )
            output_text.value += "=" * 80

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            output_text.value += f"Error: {str(e)}\n"

        page.update()

    # Button for start the process
    process_button = ft.ElevatedButton(
        text="Process",
        on_click=process_files,
        width=200,
        height=40,
        bgcolor=ft.Colors.BLUE_700,
        color=ft.Colors.WHITE,
    )

    # Add items to the main page
    page.add(
        ft.Column(
            [
                ft.Text(
                    "Rename, compress and generate a best practice template",
                    size=20,
                    weight=ft.FontWeight.BOLD,
                    text_align=ft.TextAlign.CENTER,
                ),
                ft.Text(
                    " ".join(
                        [
                            "This applications is made in order to generate a best practices template,",
                            "which return a .zip file and you only have to import it into the Control Room",
                            "from Automation Anywhere.",
                        ]
                    ),
                    size=12,
                    text_align=ft.TextAlign.CENTER,
                ),
                folder_path_input,
                zip_file_input,
                new_name_input,
                destination_folder_input,
                process_button,
                output_text,
                ft.Text("", height=10),
                ft.Container(
                    content=ft.Text(
                        "Developed by AND3SIL4 at Net Applications",
                        size=12,
                        color=ft.Colors.GREY_600,
                        text_align=ft.TextAlign.CENTER,
                    ),
                    padding=10,
                    width=page.window.width,
                ),
            ],
            alignment=ft.MainAxisAlignment.CENTER,
            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
            spacing=30,
        ),
    )


if __name__ == "__main__":
    ft.app(target=main)  # Execute the main function into the app
