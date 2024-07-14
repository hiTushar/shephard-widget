import spokeSvg from './spoke.svg';
import rightSvg from './chevron_right.svg';
import dividerSvg from './divider.svg';
import appleSvg from './apple.svg';
import androidSvg from './android.svg';
import windowsSvg from './windows.svg';
import linuxSvg from './linux.svg';

interface PlatformIconMap {
    [key: string]: string;
}

const PLATFORMS_ICON_MAP: PlatformIconMap = {
    'macos': appleSvg,
    'ios': appleSvg,
    'android': androidSvg,
    'windows': windowsSvg,
    'linux': linuxSvg
}

export {
    spokeSvg,
    rightSvg,
    dividerSvg,
    appleSvg,
    androidSvg,
    windowsSvg,
    linuxSvg,
    PLATFORMS_ICON_MAP
}
