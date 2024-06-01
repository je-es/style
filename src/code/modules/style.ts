/**
 * @name                                    style.ts
 * @description                             style module
*/


/* ---------------------------------------- PACK ----------------------------------------  */

    import * as ansi                        from '@je-es/ansi';

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- TYPE ----------------------------------------  */

    export type                             t_padding =
    {
        top             ?: number,
        bottom          ?: number,
        left            ?: number,
        right           ?: number,
    };

    export type                             t_prefix =
    {
        val              : string,
        fg              ?: ansi.t_color,
        bg              ?: ansi.t_color,
    }

    export type                             t_border =
    {
        width           ?: number,
        fg              ?: ansi.t_color,
        bg              ?: ansi.t_color,
    };

    export type                             t_borderDimensions =
    {
        topBeg     : string,
        topEnd     : string,

        botBeg     : string,
        botEnd     : string,

        char       : string,
        side       : string,
    };

    export type                             t_align =
    'center' | 'right' | 'left';

    export interface                        i_style
    {
        // foreground/background/attributes
        fg              ?: ansi.t_color,
        bg              ?: ansi.t_color,
        attr            ?: ansi.t_attr,

        // padding/border
        padding         ?: t_padding,
        border          ?: t_border,

        // prefix/suffix
        prefix          ?: t_prefix,
        suffix          ?: t_prefix,

        // alignment/width
        width           ?: number,
        align           ?: t_align,
    }

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- CORE ----------------------------------------  */

    /**
     * Applies various styles to a given string based on the provided options.
     *
     * @param {string}  str                 - The string to apply styles to.
     * @param {i_style} options             - The options object containing the styles to apply.
     *
     * @return {string} The string with the applied styles.
    */
    export const style
    = (str : string, options : i_style)
    : string =>
    {
        let     res             = '';
        let     originalLength  = str.length + (options.prefix?.val?.length || 0) + (options.suffix?.val?.length || 0);

        // Apply Prefix
        if(options.prefix)
        {

            if(options?.bg && !(options.prefix?.bg))
            options.prefix.bg = options.bg;

            if(options?.fg && !(options.prefix?.fg))
            options.prefix.fg = options.fg;

            res += Helpers.ApplyPrefix(options.prefix);
        }

        // Apply ANSI styles
        if (options.bg || options.fg || options.attr)
            res += Helpers.ApplyStyle(str, options);
        else
            res += str;

        // Apply Suffix
        if(options.suffix)
        {
            if(options?.bg && !(options.suffix?.bg))
            options.suffix.bg = options?.bg;

            if(options?.fg && !(options.suffix?.fg))
            options.suffix.fg = options?.fg;

            res += Helpers.ApplySuffix(options.suffix);
        }

        // Apply Width
        if (options.width && options.width > originalLength)
        {
            // Apply Alignment
            {
                if(options.align === 'center')
                {
                    const left = Math.floor((options.width - originalLength) / 2);
                    const right = options.width - originalLength - left;
                    res = ' '.repeat(left) + res + ' '.repeat(right);
                }
                else if(options.align === 'right')
                {
                    const left = options.width - originalLength;
                    res = ' '.repeat(left) + res;
                }
                else
                {
                    const right = options.width - originalLength;
                    res += ' '.repeat(right);
                }
            }

            // Save original length
            originalLength = options.width;
        }

        // Apply padding
        if (options.padding)
            res = Helpers.ApplyPadding(res, options);

        // Apply border
        if (options.border)
            res = Helpers.ApplyBorder(res, options, originalLength);

        return res;
    }

/* ---------------------------------------- ---- ----------------------------------------  */

/* ---------------------------------------- HELP ----------------------------------------  */

    const Helpers =
    {
        ApplyPrefix
        : (options: t_prefix)
        : string =>
        {
            const { val, bg, fg } = options;
            return ansi.style(val, { bg, fg });
        },

        ApplySuffix
        : (options: t_prefix)
        : string =>
        {
            const { val, bg, fg } = options;
            return ansi.style(val, { bg, fg });
        },

        ApplyStyle
        : (str: string, options: i_style)
        : string =>
        {
            const { fg, bg, attr } = options;
            return ansi.style(str, { fg, bg, attr });
        },

        ApplyPadding
        : (str: string, options: i_style)
        : string =>
        {
            if (options.padding?.left)
            {
                str = ' '.repeat(options.padding.left) + str;
            }

            if (options.padding?.right)
            {
                str = str + ' '.repeat(options.padding.right);
            }

            if (options.padding?.top)
            {
                str = '\n'.repeat(options.padding.top) + str;
            }

            if (options.padding?.bottom)
            {
                str = str + '\n'.repeat(options.padding.bottom);
            }

            return str;
        },

        ApplyBorder
        : (str: string, options: i_style, originalLength: number)
        : string =>
        {
            const   Bwidth              : number                = options.border?.width || 1;
            const   fg                  : ansi.t_color          = options.border?.fg || '';
            const   bg                  : ansi.t_color          = options.border?.bg || '';
            const   _paddingWidth       : number                = Helpers.More.__GetPaddingWidth(options);
            const   width               : number                = Math.max(originalLength + _paddingWidth + 2, 0);
            let     chars               : t_borderDimensions    = { topBeg: '', topEnd: '', botBeg: '', botEnd: '', char: '', side: '' };
            const   styleIT             : boolean               = fg || bg ? true : false;

            switch (Bwidth)
            {
                case 2:
                    chars = { topBeg: '╔', topEnd: '╗', botBeg: '╚', botEnd: '╝', char: '═', side: '║' };
                    break;
                case 3:
                    chars = { topBeg: '┏', topEnd: '┓', botBeg: '┗', botEnd: '┛', char: '━', side: '┃' };
                    break;
                case 4:
                    chars = { topBeg: '╭', topEnd: '╮', botBeg: '╰', botEnd: '╯', char: '─', side: '│' };
                    break;
                case 5:
                    chars = { topBeg: '╭', topEnd: '╮', botBeg: '╰', botEnd: '╯', char: '═', side: '║' };
                    break;
                default:
                    chars = { topBeg: '┌', topEnd: '┐', botBeg: '└', botEnd: '┘', char: '─', side: '│' };
                    break;
            }

            // Calculate total width for each line including padding and border
            const totalWidth = originalLength + _paddingWidth + 2;

            // Ensure the width is not negative
            const paddedWidth = Math.max(totalWidth, 0);

            // Sides (add char to start/end of each line)
            str = str.split('\n').map(line =>
            {
                const lineWidth = line.length;

                if (lineWidth)
                {
                    // Ensure each line is padded correctly
                    const n = ((paddedWidth - lineWidth - 2) + 1)
                    const x = n && n > 0 ? n : 1;
                    const c = styleIT ? ansi.style(chars.side, { fg, bg }) : chars.side;
                    return c + ' ' + line + ' '.repeat(x) + c;
                }

                else
                {
                    const c = ansi.style(chars.side, { fg, bg });
                    return c + ' '.repeat(paddedWidth) + c;
                }
            }).join('\n');

            // First line
            const firstLine_C = chars.topBeg + chars.char.repeat(paddedWidth) + chars.topEnd
            const firstLine = styleIT ? ansi.style(firstLine_C, { fg, bg }) : firstLine_C;
            str = firstLine + '\n' + str;

            // Last line
            const lastLine_C = chars.botBeg + chars.char.repeat(paddedWidth) + chars.botEnd
            const lastLine = styleIT ? ansi.style(lastLine_C, { fg, bg }) : lastLine_C;
            str = str + '\n' + lastLine;

            return str;
        },

        More :
        {
            __GetPaddingWidth
            : (options: i_style)
            : number =>
                {
                return (options.padding?.left || 0) + (options.padding?.right || 0);
            },
        }
    };

/* ---------------------------------------- ---- ----------------------------------------  */