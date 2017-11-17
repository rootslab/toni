#!/usr/bin/env node

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Toni = require( '../' )
    , now = Date.now
    , p = 18
    , k = Math.pow( 2, p )
    , toni = Toni( k )
    , buf = new Buffer( p )
    , print = function ( ms, n ) {
        var avg = 1000 * n / ms;
        log( '- elements: %d.', n );
        log( '- elapsed time: %d secs.', ( ms / 1000 ).toFixed( 4 ) );
        log( '- average rate: %d Kop/sec.', ( avg / 1000 ).toFixed( 2 ) );
    }
    , i = 0
    , stime = 0
    , etime = 0
    ;

log( '- running Toni#add 2^%d times', p );

i = k;

stime = now();

for ( ; i--; ) if ( i & 1 ) toni.add( i );

etime = now() - stime;

print( etime, k );

log( '\n- running Toni#rank 2^%d times', p );

i = k;

stime = now();

for ( ; i--; ) if ( i & 1 ) toni.rank( k );

etime = now() - stime;

print( etime, k );