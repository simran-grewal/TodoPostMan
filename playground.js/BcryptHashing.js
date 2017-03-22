const bcrypt =  require('bcryptjs');

var password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});


// This is to compare the password enter by the user with the hashed store in dataBase

// var  hashedPassword = '$2a$10$TpRuTssLaweM7NOqqre7y.tnZYy..mXkhkjvmlYjslRRInMarbxPO';
// bcrypt.compare(password, hashedPassword, (err, res) => {
//   console.log(res);
// });
