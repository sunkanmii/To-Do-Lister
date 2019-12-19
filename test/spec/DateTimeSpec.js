"use strict";
// describe("DateTime", function() {
//     it("returns the current time when called with no arguments", function() {
//       var lowerLimit = new Date().getTime(),
//         offset = DateTime().offset,
//         upperLimit = new Date().getTime();
//       expect(offset).not.toBeLessThan(lowerLimit);
//       expect(offset).not.toBeGreaterThan(upperLimit);
//     });
    
//     it("matches the passed in Date when called with one argument", function() {
//         var dates = [new Date(), new Date(0), new Date(864e13), new Date(-864e13)];
//         for (var i = 0; i < dates.length; i++) {
//           expect(DateTime(dates[i]).offset).toEqual(dates[i].getTime());
//         }
//       });
//   });

// describe("DateTime", function(){
//     it("returns the current date and time when called with no arguments", function(){
//         let lowerLimit = new Date().getTime(),
//         offset = DateTime().offset,
//         upperLimit = new Date().getTime();
//         expect(offset).toEqual(lowerLimit);
//         expect(upperLimit).toEqual(lowerLimit);
//     });
// });