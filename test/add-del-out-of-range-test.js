/*
 * Toni add, del values out of range.
 */

exports.test  = function ( done, assertions ) {
    var log = console.log
        , exit = typeof done === 'function' ? done : function () {}
        , assert = assertions || require( 'assert' )
        , Toni = require( '../' )
        , n = 10
        , toni = Toni( n )
        , i = 0
        ;

    log( '- created an empty buffer bitmap ( capacity: %d )', n );

    log( '- add elements out of range.' );

    toni.add( 10 );
    toni.add( 11 );
    toni.add( 12 );
    toni.add( 13 )
    toni.add( 14 )
    toni.add( 15 )

    log( '- check bitmap, should be empty [0x00, 0x00].' );

    assert.equal( toni.items, 0 );
    assert.deepEqual( toni.bitmap, new Buffer( [ 0x0, 0x0 ] ) );

    log( '- fill bitmap, try to del values out of range.' );

    toni.bitmap.fill( 0xff );
    toni.items = 10;

    toni.del( 10 )
    toni.del( 11 )
    toni.del( 12 )
    toni.del( 13 )
    toni.del( 14 )
    toni.del( 15 )

    log( '- check bitmap, should be full [0xff, 0xff].' );

    assert.equal( toni.items, 10 );
    assert.deepEqual( toni.bitmap, new Buffer( [ 0xff, 0xff ] ) );

    exit();
};

// single test execution with node
if ( process.argv[ 1 ] === __filename  ) exports.test = exports.test();