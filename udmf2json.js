/**
 * UDMF to JSON converter from UDMF Map Processor (UMP)
 * Copyright (c) 2018 PROPHESSOR
 * https://github.com/PROPHESSOR/udmfMapProcessor/blob/master/lib/udmf2json.js
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

window.UDMF2JSON = {
    /** Преобразовывает udmf файл в udmf.json массив
     * @param  {string} infile - Путь к исходному udmf файлу
     * @param  {string} [outfile] - Путь к файлу для сохранения
     * @returns {array} - udmf.json массив
     */
    udmf2json(input) {
        const file = '[\n' +
            input
                .replace(/(\/\/|namespace).+?\n/g, '')                                      // Remove comments
                .replace(/=/g, ': ')                                                        // = -> :
                .replace(/;/g, ',')                                                         // ; -> ,
                .replace(/(linedef|sidedef|vertex|sector|thing)\s*\n*{/g, '["$1", {')       // XXX{ -> ["XXX", {]
                .replace(/}/g, '}], ')                                                      // } -> }], 
                .replace(/\n\s*(.+?)\s*:/g, '"$1":')                                              // v1: -> "v1":
                .replace(/(:\s*)([A-Za-z_][A-Za-z0-9_]+)/g, '$1"$2"')
                .replace(/,(\s*\n*\s*})/g, '$1')                                            // Remove last "," (attributes)
                .replace(/,\s*$/, '')                                                       // Remove last "," (file)
            + '\n]';

        return JSON.parse(file);
    }
}