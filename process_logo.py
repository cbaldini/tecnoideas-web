from pathlib import Path
import shutil
import subprocess

ROOT = Path('/Users/cristianbaldini/Tecnoideas/tecnoideas-web')
SOURCE = ROOT / 'tecnoideas.png'
TARGET = ROOT / 'src' / 'tecnoideas-logo.png'


def run_command(command):
    try:
        completed = subprocess.run(
            command,
            check=True,
            capture_output=True,
            text=True,
        )
        return completed.returncode == 0
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


def ensure_logo_asset():
    if not SOURCE.exists():
        raise FileNotFoundError(f'Logo source not found: {SOURCE}')

    sips_path = shutil.which('sips')

    if sips_path:
        converted = run_command(
            [
                sips_path,
                '-s',
                'format',
                'png',
                str(SOURCE),
                '--out',
                str(TARGET),
            ],
        )
        if converted and TARGET.exists():
            return 'created with sips'

    shutil.copy2(SOURCE, TARGET)
    return 'copied original as fallback'


if __name__ == '__main__':
    result = ensure_logo_asset()
    print(f'{result}: {TARGET}')
