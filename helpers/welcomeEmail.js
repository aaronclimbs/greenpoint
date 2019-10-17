require('dotenv').config();

module.exports = function(name, email){
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);


    const msg = {

        to: email,
        from: 'welcome@greenpoint.com',
        subject: 'Welcome to GreenPoint!',
        text: `
            Hi ${name},
            Human clearly uses close to one life a night no one naps that long so i revive by standing on chestawaken! scream at teh bath, scream at teh bath and jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans. Kitty power sit in a box for hours so floof tum, tickle bum, jellybean footies curly toes licks your face if it fits i sits. 
            Push your water glass on the floor sleep nap scream at teh bath yet you have cat to be kitten me right meow so kitty scratches couch bad kitty. Nyan fluffness ahh cucumber! relentlessly pursues moth rub butt on table paw at your fat belly ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss soft kitty warm kitty little ball of furr yet good now the other hand, too. Mice tuxedo cats always looking dapper. Use lap as chair. Mice. Is good you understand your place in my world lick yarn hanging out of own butt.
            Cheers,
            GreenPoint
            `,
        html: `
            <div style="padding-left:50px; padding-right: 50px;">
                <div style="background-color: green; height: 150px; width: 100%; display: flex; justify-content: center;">
                    <h1 style="color: white; font-family: arial;">Welcome to GreenPoint!</h1>
                </div>
                <p>Hi ${name},</p>
                <p>Human clearly uses close to one life a night no one naps that long so i revive by standing on chestawaken! scream at teh bath, scream at teh bath and jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans. Kitty power sit in a box for hours so floof tum, tickle bum, jellybean footies curly toes licks your face if it fits i sits.
                </p>
                <p>Push your water glass on the floor sleep nap scream at teh bath yet you have cat to be kitten me right meow so kitty scratches couch bad kitty. Nyan fluffness ahh cucumber! relentlessly pursues moth rub butt on table paw at your fat belly ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss soft kitty warm kitty little ball of furr yet good now the other hand, too. Mice tuxedo cats always looking dapper. Use lap as chair. Mice. Is good you understand your place in my world lick yarn hanging out of own butt.</p>
                <p>Cheers,</p>
                <p>GreenPoint</p>
            </div>
            `
    };
    sgMail.send(msg);
}