const pack = require('./dist/main');

console.log(pack.style(' ? ',
{
    fg      : 'red',
    attr    : ['bold', 'underline'],

    prefix  : { val: '[', fg: '#222' },
    suffix  : { val: ']', fg: '#222' },

    padding : { top: 1, bottom: 1, right: 2, left: 2 },
    border  : { width: 2, fg: [255, 255, 0]},

    width   : 25,
    align   : 'center'
}));

{
    const pat = pack.pattern
    (
        [
            { name: 'firstName',    style: { prefix: { val: 'Name: ', fg: '#222' }, fg: 'green' } },
            { name: 'lastName',     style: { fg: 'green' }, endWithNewLine: true },
            { name: 'Age',          style: { prefix: { val: 'Age: ', fg: '#222' }, fg: [255, 255, 0], attr: ['bold'] } }
        ]
    )

    const val =
    {
        'firstName' : 'Maysara',
        'lastName'  : 'Elshewehy',
        'Age'       : 24
    }

    console.log(pack.design(pat, val))
}

{
    const pat = pack.pattern
    (
        { name: 'firstName',    style: { prefix: { val: 'Name: ', fg: '#222' }, fg: 'green' } }
    )

    const val = 'Maysara'

    console.log(pack.design(pat, val))
}