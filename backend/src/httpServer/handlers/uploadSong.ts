import { createUploadHanlder } from './uploadHandler';
import { getSuffix, suffixToLowerCase } from '@/utils/fileUtil';
import { audioPath, lyricPath } from '@/utils/constants';
import { FileInfo } from 'busboy';
import { singleUpdateSongsInfo } from '@/dataManager/song';


export const uploadSong = createUploadHanlder(
    {
        action: (info: FileInfo): boolean => {
            return true;
        },
        failedHint: 'upload failed!',
    },
    (info: FileInfo) => {
        singleUpdateSongsInfo(info.filename);
        return {
            path: getSuffix(info.filename) === 'lrc' ? 
                                                lyricPath :
                                                audioPath,
            name: suffixToLowerCase(info.filename),
        }
    }
);