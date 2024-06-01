/* ---------------------------------------- PACK ----------------------------------------  */

    import { style, i_style }                        from '../../dist/main';
    import * as ansi                                 from '@je-es/ansi';
/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- TEST ----------------------------------------  */

    const input = ' ? ';

    describe('foreground/background/attributes', () =>
    {
        it('fg', () =>
        {
            const res = style(input,
            {
                fg: 'red',
            });

            expect(res).toBe(ansi.style(input, { fg: 'red' }));
        });

        it('bg', () =>
        {
            const res = style(input,
            {
                bg: 'red',
            });

            expect(res).toBe(ansi.style(input, { bg: 'red' }));
        });

        it('attr', () =>
        {
            const res = style(input,
            {
                attr: 'bold',
            });

            expect(res).toBe(ansi.style(input, { attr: 'bold' }));
        });
    });

    describe('padding', () =>
    {
        it('top', () =>
        {
            const res = style(input,
            {
                padding: {
                    top: 1,
                },
            });

            expect(res).toBe(`\n${input}`);
        });

        it('bottom', () =>
        {
            const res = style(input,
            {
                padding: {
                    bottom: 1,
                },
            });

            expect(res).toBe(`${input}\n`);
        });

        it('left', () =>
        {
            const res = style(input,
            {
                padding: {
                    left: 1,
                },
            });

            expect(res).toBe(` ${input}`);
        });

        it('right', () =>
        {
            const res = style(input,
            {
                padding: {
                    right: 1,
                },
            });

            expect(res).toBe(`${input} `);
        });

        it('all', () =>
        {
            const res = style(input,
            {
                padding: {
                    top: 1,
                    bottom: 1,
                    left: 1,
                    right: 1,
                },
            });

            expect(res).toBe(`\n ${input} \n`);
        });

        it('with ansi', () =>
        {
            const res = style(input,
            {
                padding: {
                    top: 1,
                    bottom: 1,
                    left: 1,
                    right: 1,
                },
                bg: 'red',
            });

            expect(res).toBe(`\n ${ansi.style(input, { bg: 'red' })} \n`);
        });
    });

    describe('width/alignment', () =>
    {
        it('width', () =>
        {
            const res = style(input,
            {
                width: 5,
            });

            const excepted = ' ?   '

            expect(res).toBe(excepted);
        });

        it('width + align', () =>
        {
            const res = style(input,
            {
                width: 5,
                align: 'center',
            });

            const excepted = '  ?  '

            expect(res).toBe(excepted);
        });

        it('width + align left', () =>
        {
            const res = style(input,
            {
                width: 5,
                align: 'left',
            });

            const excepted = ' ?   '

            expect(res).toBe(excepted);
        });

        it('width + align right', () =>
        {
            const res = style(input,
            {
                width: 5,
                align: 'right',
            });

            const excepted = '   ? '

            expect(res).toBe(excepted);
        });

        it('width/align + padding + ansi', () =>
        {
            const res = style(input,
            {
                width: 5,
                align: 'right',
                bg: 'red',

                padding: {
                    top: 1,
                    bottom: 2,
                    left: 2,
                    right: 3,
                },
            });

            const exceptedVal = ansi.style(input, { bg: 'red' });
            const excepted = `\n    ${exceptedVal}   \n\n`;

            expect(res).toBe(excepted);
        })
    });

    describe('border', () =>
    {
        // logs fine, but test fail, why ? TODO: review it.
        it('width', () =>
        {
            const res = style(input,
            {
                border: {
                    width: 1,
                },
            });

            const excepted =
            '┌─────┐' + '\n' +
            '│  ?  │' + '\n' +
            '└─────┘'
            ;

            const len = excepted.length;
            console.log('len', len);

            expect(res).toBe(excepted);
        });
    });

/* ---------------------------------------- ---- ----------------------------------------  */