/*
 * Toni, a simple and efficient bitmap implementation for positive integer sets
 * (max 32 bits), with no element repetition, using bitwise operations and a Buffer.
 * Modifying a single bit instead of an entire byte, obviously saves 87.5% of Buffer
 * space, but it also implies a gain greater than 200% in performances, when it was
 * used with big integer ranges.
 *
 * http://en.wikipedia.org/wiki/Bit_array
 *
 * Copyright(c) 2014 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Toni = ( function () {
    var abs = Math.abs
        , ceil = Math.ceil
        , max = Math.max
        // table of powers
        , bpower = [ 128, 64, 32, 16, 8, 4, 2, 1 ]
        , Toni = function ( range ) {
            var me = this
                , is = me instanceof Toni
                ;
            if ( ! is ) return new Toni( range );
            // limit range to 4 bytes, (32 bits numbers) using >>> 0
            var r = ( abs( + range ) >>> 0 ) || 1
                , bytes = max( ceil( r / 8 ), 1 )
                , bitmap = new Buffer( bytes )
                ;
                bitmap.fill( 0x00 );
                me.bitmap = bitmap;
                me.bmlen = bytes << 3 >>> 0;
                me.items = 0;
                me.range = r;
        }
        , tproto = Toni.prototype
        ;

    tproto.clear = function () {
        var me = this
            ;
        me.bitmap.fill( 0x00 );
        me.items = 0;
        return me;
    };

    tproto.add = function ( value ) {
        var me = this
            , v = abs( value )
            , bitmap = me.bitmap
            , range = me.range
            ;
        // check value range
        if ( ( me.bmlen <= v ) || ( v >= range ) ) return -1;
        /*
         * generally, bucket and mask could be calculated respectively as floor( v / 8 )
         * and bpower[ v % 8 ], but seen that values > 2^32 are not allowed, then we can
         * speed up things using bitwise shiftings.
         */
        var buck = v >>> 3
            , mask = bpower[ v & 7 ]
            , up = mask & bitmap[ buck ]
            ;
        return up ? -1 : ++me.items | ( bitmap[ buck ] |= mask );
    };

    tproto.chk = function ( value ) {
        var me = this
            , v = abs( value )
            , range = me.range
            ;
        // check value range
        if ( ( me.bmlen <= v ) || ( v >= range ) ) return 0;
        // see #add
        return bpower[ v & 7 ] & me.bitmap[ v >>> 3 ] ? 1 : 0;
    };

    tproto.del = function ( value ) {
        var me = this
            , v = value
            , range = me.range
            , bitmap = me.bitmap
            ;
        // check value range
        if ( ( me.bmlen <= v ) || ( v >= range ) ) return -1;

        var buck = v >>> 3
            , mask = bpower[ v & 7 ]
            , up = mask & bitmap[ buck ]
            ;
        return up ? --me.items | ( bitmap[ buck ] ^= mask ) : -1;
    };

    return Toni;

} )();