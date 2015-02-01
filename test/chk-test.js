/*
 * Toni#check test.
 */

exports.test  = function ( done, assertions ) {
    var log = console.log
        , exit = typeof done === 'function' ? done : function () {}
        , assert = assertions || require( 'assert' )
        , Toni = require( '../' )
        , n = 128
        , toni = Toni( n )
        , i = 0
        ;

    log( '- created an empty buffer bitmap ( capacity: %d )', n );

    log( '- add some elements..' );

    toni.add( 1 );
    toni.add( 23 );
    toni.add( 34 );
    toni.add( 13 )
    toni.add( 0 )
    toni.add( 85 )

    log( '- check for items presence..' );

    assert.ok( toni.chk( 1 ) === 1 );
    assert.ok( toni.chk( 23 ) === 1 );
    assert.ok( toni.chk( 34 ) === 1 );
    assert.ok( toni.chk( 13 ) === 1 );
    assert.ok( toni.chk( 0 ) === 1 );
    assert.ok( toni.chk( 85 ) === 1 );

    log( '- check for items out of range..' );

    assert.ok( toni.chk( 564 ) === 0 );

    log( '- check for negative items..' );

    assert.ok( toni.chk( -1 ) === toni.chk( 1 ) );
    assert.ok( toni.chk( -2 ) === toni.chk( 2 ) );

    exit();
};

// single test execution with node
if ( process.argv[ 1 ] === __filename  ) exports.test = exports.test();