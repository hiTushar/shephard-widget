import spokeSvg from './spoke.svg';
import rightSvg from './chevron_right.svg';
import dividerSvg from './divider.svg';
import appleSvg from './apple.svg';
import iosSvg from './ios.svg';
import androidSvg from './android.svg';
import windowsSvg from './windows.svg';
import linuxSvg from './linux.svg';
import addSvg from './add.svg';
import minusSvg from './minus.svg';
import leftSvg from './chevron_left.svg';
import emblemSvg from './emblem.svg';
import error from './error.png';
import noData from './no_data.png';

interface PlatformIconMap {
    [key: string]: string;
}

const PLATFORMS_ICON_MAP: PlatformIconMap = {
    'macos': appleSvg,
    'ios': iosSvg,
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
    PLATFORMS_ICON_MAP,
    addSvg,
    minusSvg,
    leftSvg,
    emblemSvg,
    error,
    noData
}
