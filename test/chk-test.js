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

    assert.ok( toni.get( 1 ) );
    assert.ok( toni.get( 23 ) );
    assert.ok( toni.get( 34 ) );
    assert.ok( toni.get( 13 ) );
    assert.ok( toni.get( 0 ) );
    assert.ok( toni.get( 85 ) );

    log( '- check for items out of range..' );

    assert.ok( toni.get( 564 ) === -1 );

    log( '- check for negative items..' );

    assert.ok( toni.get( -1 ) === toni.get( 1 ) );
    assert.ok( toni.get( -2 ) === toni.get( 2 ) );

    exit();
};

// single test execution with node
if ( process.argv[ 1 ] === __filename  ) exports.test = exports.test();