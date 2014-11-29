var log = console.log
    , Toni = require( '../' )
    , toni = Toni( {
        // values from 0 to range - 1
        range : 1024 * 64
    } )
    , el = 13
    ;

log( '\n- created an empty bitmap, Buffer size is %d bytes', toni.btable.length );

if ( ~ toni.add( el ) ) log( '- added an item/value (%d)', el );
if ( ~ toni.add( el * el ) ) log( '- added an item/value (%d)', el * el );

log( '- current items in the set: %d', toni.items );

if ( ~ toni.add( el ) ) log( '- let\'s gamble!' );
else log( '- item/value (%d) already exists or is out of current range (>=%d)', el, toni.options.range );

log();