/**
 * @name                                    design.ts
 * @description                             design module
*/


/* ---------------------------------------- PACK ----------------------------------------  */

    import { i_style, style }               from './style';

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- TYPE ----------------------------------------  */

    export type                             t_pattern =
    [{
        name            : string,
        style           : i_style,
        endWithNewLine ?: boolean,
        begWithNewLine ?: boolean,
    }];

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- CORE ----------------------------------------  */

    /**
     * Returns the input pattern as is.
     *
     * @param {t_pattern} pat               - The pattern to be returned.
     *
     * @return {t_pattern} The input pattern.
    */
    export const pattern
    = (pat : t_pattern)
    : t_pattern => pat;

    /**
     * Generates a formatted string based on the provided pattern and input values.
     *
     * @param {t_pattern}   pat             - The pattern specifying the structure of the output string.
     * @param {any}         val             - The input values to be formatted.
     *
     * @throws {Error} If the input values are invalid or do not match the pattern length.
     *
     * @return {string} The formatted string based on the pattern and input values.
    */
    export const design
    = (pat : t_pattern, val : any)
    : string =>
    {
        if(typeof val !== 'object' || Object.keys(val).length !== pat.length)
        throw new Error('invalid input');

        let res = '';

        for (let i = 0; i < pat.length; i++)
        {
            if(pat[i].begWithNewLine)
            res += '\n';

            res += style(val[pat[i].name], pat[i].style);

            res += pat[i].endWithNewLine ? '\n' : ' ';
        }

        return res;
    }

/* ---------------------------------------- ---- ----------------------------------------  */