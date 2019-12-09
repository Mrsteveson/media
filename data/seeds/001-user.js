exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'Patrick',
          password: 'pass', 
          email: 'patrick@gmail.com'
        }
      ]);
    });
};
