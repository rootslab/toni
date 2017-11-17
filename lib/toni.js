/*
 * Toni, a simple and efficient bitmap implementation for positive integer sets
 * (max 32 bits), with no element repetition, using bitwise operations and a Buffer.
 * Modifying a single bit instead of an entire byte, obviously saves 87.5% of Buffer
 * space, but it also implies a gain greater than 200% in performances, when it was
 * used with big integer ranges.
 *
 * http://en.wikipedia.org/wiki/Bit_array
 *
 * Copyright(c) 2014-present Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.Toni = ( function () {
    var log = console.log
        , abs = Math.abs
        , ceil = Math.ceil
        , max = Math.max
        , min = Math.min
        // table of powers
        , bpower = new Buffer( [ 128, 64, 32, 16, 8, 4, 2, 1 ] )
        // count the number of bits set to 1 for every 1-byte number
        , cbits = function ( b ) {
           // divide et impera method for 8 bits
            var v = b - ( ( b >>> 1 ) & 0x55 );
            v = ( v & 0x33 ) + ( ( v >>> 2 ) & 0x33 );
            return v + ( v >>> 4 ) & 0x0f;
        }
        , bctable = ( function () {
            var i = 0
                , table = new Buffer( 256 )
                , v = -1
                ;
            for ( ; i < 256; ++i ) table[ i ] = cbits( i );
            return table;
        } )()
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
                // bytes needed
                me.bmlen = bytes << 3 >>> 0;
                me.items = 0;
                me.range = r;
                // bit count table for 1 byte
                me.bctable = bctable;
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
        if ( ( v >= me.bmlen ) || ( v >= range ) ) return -1;
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

    // get/access the bit at a given index i, b = B[i]
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

    // it returns the occurrences of bit 1 until index i
    tproto.rank = function ( i ) {
        var me = this
            , bitmap = me.bitmap
            , bmlen = me.bmlen
            , buck = null 
            , boff = -1
            , bshift = -1
            , b = 0
            , bcnt = 0
            , index = min( i >>> 0, me.bmlen )
            ;
        if ( index > bmlen ) return -1;
            // last bucket to count with btable
            buck = index >>> 3;
            // bits remaining to count
            boff = 1 + ( index - ( buck << 3 ) );
            bshift = 8 - boff;

        if ( buck ) {
            // log( ' - bytes to count: %d', buck );
            for ( b = 0; b < buck ; ++b )
                bcnt += bctable[ bitmap[ b ] ];
        }
        bcnt += bctable[ bitmap[ b ] >>> bshift ];
        return bcnt;    
    };

    // it returns the position of the i-th occurrence of bit 1
    // tproto.select = function ( index ) {
    //    var me = this
    //        ;
    //    return;
    // };

    return Toni;

} )();