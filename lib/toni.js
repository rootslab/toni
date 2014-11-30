/*
 * Toni, a simple and efficient bitmap implementation for integer sets,
 * using bitwise operations and a Buffer. Modifying a single bit instead of an
 * entire byte, obviously saves 87.5% of Buffer space, but it also implies a gain
 * of ~30% in performances for accessing values, when it was used with big integer
 * ranges.
 *
 * http://en.wikipedia.org/wiki/Bit_array
 *
 * Copyright(c) 2014 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Toni = ( function () {
    var Bolgia = require( 'bolgia' )
        , abs = Math.abs
        , ceil = Math.ceil
        , max = Math.max
        , floor = Math.floor
        , clone = Bolgia.clone
        , improve = Bolgia.improve
        // toni default opt
        , toni_opt = {
            range : 8
        }
        // table of powers
        , bpower = [ 128, 64, 32, 16, 8, 4, 2, 1 ]
        , Toni = function ( opt ) {
            var me = this
                , is = me instanceof Toni
                ;
            if ( ! is ) return new Toni( opt );

            var cfg = improve( clone( opt ), toni_opt )
                , range = cfg.range = max( abs( + cfg.range ), 8 )
                , bytes = ceil( range / 8 )
                , btable = new Buffer( bytes )
                ;

                btable.fill( 0x00 );
                me.options = cfg;
                me.btable = btable;
                me.items = 0;
        }
        , tproto = Toni.prototype
        ;

    tproto.clear = function () {
        var me = this
            ;
        me.btable.fill( 0x00 );
        me.items = 0;
        return me;
    };

    tproto.add = function ( value ) {
        var me = this
            , v = abs( value )
            , btable = me.btable
            ;
        // check value range
        if ( ( btable.length << 3 >>> 0 ) <= v ) return -1;

        var buck = floor( v / 8 )
            , mask = bpower[ v % 8 ]
            , up = mask & btable[ buck ]
            ;
        return up ? -1 : ++me.items | ( btable[ buck ] |= mask );
    };

    tproto.del = function ( value ) {
        var me = this
            , v = value
            , btable = me.btable
            ;
        // check value range
        if ( ( btable.length << 3 >>> 0 ) <= v ) return -1;

        var buck = floor( v / 8 )
            , mask = bpower[ v % 8 ]
            , up = mask & btable[ buck ]
            ;
        return up ? --me.items | ( btable[ buck ] ^= mask ) : -1;
    };

    return Toni;

} )();