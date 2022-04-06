const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const User = require('../../../models/User')

module.exports = {
    purchase: async (req, res) => {

        //this is gonna be removed once the template is ready
        const token = await Stripe.tokens.create({
          card: {
            number: '4242424242424242',
            exp_month: 3,
            exp_year: 2023,
            cvc: '314',
          },
        });
        
      //actual payment
        try {
          Stripe.customers
            .create({
              name: req.body.name,
              email: req.body.email,
              source: token.id
            })
            .then(customer =>
              Stripe.charges.create({
                amount: req.body.amount * 100,
                currency: "usd",
                customer: customer.id
               
              })
            )
            .then(async () => {
              console.log('Charge created successfully')
              const filter = { name: 'Jean-Luc Picard' };
              const update = { accType: 'PREMIUM' };
              const user = await User.findOneAndUpdate(filter, update);
              res.send(user.email+' is premium user now')
            }) 
            
            .catch(err => console.log(err));
        } catch (err) {
          res.send(err.message);
        }
      }

}