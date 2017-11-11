#!/usr/bin/env node

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Toni = require( '../' )
    , p = 16
    , k = Math.pow( 2, p )
    , toni = Toni( k )
    , buf = new Buffer( p )
    , print = function ( ms, n ) {
        var avg = 1000 * n / ms;
        log( '- elements: %d.', n );
        log( '- elapsed time: %d secs.', ( ms / 1000 ).toFixed( 4 ) );
        log( '- average rate: %d Mop/sec.', ( avg / 1000 / 1000 ).toFixed( 2 ) );
    }
    , i = 0
    , stime = 0
    , etime = 0
    ;

log( '- running Toni#add 2^%d times', p );

i = k;

stime = Date.now();

for ( ; i--; ) {
    toni.add( i );
};

etime =  Date.now() - stime;

print( etime, k );

log( '\n- now filling an entire buffer with 2^%d 1\'s', p );

i = k;

stime = Date.now();

for ( ; i--; ) {
    buf[ i ] = 1;
};

etime =  Date.now() - stime;

print( etime, k );