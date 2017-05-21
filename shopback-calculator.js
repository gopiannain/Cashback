var async = require('async');
var _ = require('underscore');

var myArgs = process.argv.slice(2);

var signup = {"www.shopback.sg":"SGD 5","www.shopback.my":"MYR 10","www.shopback.co.id":"IDR 25.000","www.shopback.com.tw":"TWD 1000","www.myshopback.co.th":"THB 500","www.myshopback.com":"USD 5"};
var redeem = {"www.shopback.sg":"http://www.shopback.sg","www.shopback.my":"http://www.shopback.my","www.shopback.co.id":"http://www.shopback.co.id","www.shopback.com.tw":"http://www.shopback.com.tw","www.myshopback.co.th":"http://www.myshopback.co.th","www.myshopback.com":"http://www.myshopback.com"};


async.series([
    checkfn(myArgs),
    cashback
], function (error, result) {
    if (error) { console.log(result[0]); }
    if (result) { console.log('Award cashback: ', result[1]); }
});

// Only run if the argument "SPEND"
function cashback (callback) {

       var cashback = "No CashBack";

       var arrayOfNumbers = myArgs.map(parseFloat)

       var min_spend = _.min(arrayOfNumbers);
       var max_spend = _.max(arrayOfNumbers);

       if(min_spend >= 50)
        cashback = (max_spend * 20)/100;
       else if(min_spend >=20)
        cashback = (max_spend * 15)/100;
       else if(min_spend >=10)
        cashback = (max_spend * 10)/100;
       else if(min_spend > 0)
        cashback = (max_spend * 5)/100;

       callback(false, cashback);
}


// check function - Find first parameter and call Signup or spend or Redeem function
function checkfn (req) {
    return function (callback) {

        switch (myArgs[0]) {
          case 'signup':
            var Bonus = signup[myArgs[1]];
            err = true;
            if(Bonus)
              result = "Award Bonus "+ Bonus;
            else
              result = "Signup Cashback not applied for this website. Kindly check the value or contact admin."
            break;
          case 'spend':
              err = false;
              result = "SPEND";
            break;
          case 'redeem':
            var redeem = signup[myArgs[1]];
            err = true;
            if(redeem)
              result  = "Visit "+redeem+" to start earning cashback!";
            else
              result = "Redeem not applied for this website. Kindly check the value or contact admin."
            break; 
          default:
            console.log('Wrong Input. Kindly check your parameter');
        }
        callback(err, result);
   }
}