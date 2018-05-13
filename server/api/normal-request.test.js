const normalRequest = require('./normal-request');

test('check router number',()=>{
    expect(normalRequest.length).toBe(3);
});

// test('check first load route', ()=>{
//     expect(normalRequest.stack[0].route.path).toBe('/first-load');
// });

// test('check gainers load', ()=>{
//     expect(normalRequest.stack[1].route.path).toBe('/gainers-load');
// });
// test('check losers load', ()=>{
//     expect(normalRequest.stack[2].route.path).toBe('/losers-load');
// });