/*
 * Toni fill, re-fill, delete, stress.. test.
 */

exports.test  = function ( done, assertions ) {
    var log = console.log
        , exit = typeof done === 'function' ? done : function () {}
        , assert = assertions || require( 'assert' )
        , Toni = require( '../' )
        , n = 1024
        , toni = Toni( n )
        , i = 0
        ;

    log( '- created an empty buffer bitmap ( capacity: %d )', n );

    // ADD
    log( '- fill the entire buffer bitmap, adding %d elements', n );
    for ( ; i < toni.range; toni.add( i++ ) );

    log( '- check if all bytes are equal to %d', 0xff );
    for ( i = 0; i < toni.bitmap.length; i++ ) assert.equal( toni.bitmap[ i ], 0xff, 'Something goes wrong with add function!' );

    log( '- check item counter, should be %d', n );
    assert.equal( toni.items, n, 'wrong value for item counter!' );

    log( '- try to re-add all elements, it should always return %d', -1 );
    for ( i = 0; i < toni.range; ) assert.equal( toni.add( i++ ), -1, 'Something goes wrong with add function' );

    log( '- check if all bytes are equal to %d', 0xff );
    for ( i = 0; i < toni.bitmap.length; i++ ) assert.equal( toni.bitmap[ i ], 0xff, 'Something goes wrong with add function!' );

    log( '- check item counter, should be %d', n );
    assert.equal( toni.items, n, 'wrong value for item counter!' );

    log( '- try to add %d elements, out of range (>=%d), it should always return %d', n * 2, n, -1 );
    for ( i = n; i < toni.range + n + n; ) assert.equal( toni.add( i++ ), -1, 'Something goes wrong with add function' );

    log( '- check item counter, should be %d', n );
    assert.equal( toni.items, n, 'wrong value for item counter!' );

    log();

    // DEL

    log( '- try to del %d elements, out of range (>=%d), it should always return %d', n * 2, n, -1 );
    for ( i = n; i < toni.range + n + n; ) assert.equal( toni.del( i++ ), -1, 'Something goes wrong with del function' );

    log( '- check item counter, should be %d', n );
    assert.equal( toni.items, n, 'wrong value for item counter!' );

    log( '- empty buffer bitmap, removing %d elements', n );
    for ( i = 0; i < toni.range; toni.del( i++ ) );

    log( '- check if all bytes are equal to %d', 0x00 );
    for ( i = 0; i < toni.bitmap.length; i++ ) assert.equal( toni.bitmap[ i ], 0x00, 'Something goes wrong with del function!' );

    log( '- check item counter, should be %d', 0 );
    assert.equal( toni.items, 0, 'wrong value for item counter!' );

    log( '- try to re-delete all elements, it should always return %d', -1 );
    for ( i = 0; i < toni.range; ) assert.equal( toni.del( i++ ), -1, 'Something goes wrong with del function' );

    log( '- check if all bytes are equal to %d', 0x00 );
    for ( i = 0; i < toni.bitmap.length; i++ ) assert.equal( toni.bitmap[ i ], 0x00, 'Something goes wrong with del function!' );

    log( '- check item counter, should be %d', 0 );
    assert.equal( toni.items, 0, 'wrong value for item counter!' );

    log( '- try to del %d elements, out of range (>=%d), it should always return %d', n * 2, n, -1 );
    for ( i = n; i < toni.range + n + n; ) assert.equal( toni.del( i++ ), -1, 'Something goes wrong with del function' );

    log( '- check item counter, should be %d', 0 );
    assert.equal( toni.items, 0, 'wrong value for item counter!' );

    log();

    // CLEAR
    log( '- manually fill entire Buffer with %d\'s', 0x01 );
    toni.bitmap.fill( 0x01 );

    log( '- manually set items to %d', n );
    toni.items = n;

    log( '- now #clear() bitmap' );
    toni.clear();

    log( '- bitmap should be empty' );
    for ( i = 0; i < toni.bitmap.length; i++ ) assert.equal( toni.bitmap[ i ], 0x00, 'Something goes wrong with clear function!' );

    log( '- check item property, should be %d', 0 );
    assert.equal( toni.items, 0, 'Something goes wrong with clear function, wrong value for item counter!!' );

    exit();
};

// single test execution with node
if ( process.argv[ 1 ] === __filename  ) exports.test = exports.test();