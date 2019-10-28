const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const Routine = require('../models/Routine');


mongoose.connect(`mongodb://localhost/projectT2F`, { useNewUrlParser: true, useUnifiedTopology: true });
Exercise.collection.drop(); //para borrar las collectiones anteriores


const exercises = [
    {   
        title: "Squats",
        image: "https://gethealthyu.com/wp-content/uploads/2014/09/Basic-Squat_Exercise.jpg",
        description: "first stand with your feet either hip-or shoulder-width apart, then drive the hips back as if you were going to sit down on a seat behind you. As the hips drive back, bend your knees until you reach your desired depth, when your knees begin to shift forward, that is your end range.",
        categories: ["legs" ,"quads", "glutes"]

    },

    {
        title: "Jump Squats",
        image: "https://media1.popsugar-assets.com/files/thumbor/_gsXN6w15Fm3hLGdCX-rRUAv5vs/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2014/01/31/901/n/1922729/1545977b1743e558_Jump-Squat.jpg",
        description: "Your feet should be shoulder-width apart when standing, next lower down into a squat with your thighs parallel to the floor, then jump as hard as you can, land in a squat position, and repeat",
        categories: ["legs", "quads", "glutes"]

    },
    {
        title: "Lunges",
        image: "https://cdn.cnn.com/cnnnext/dam/assets/130524113647-7minlunge-horizontal-large-gallery.jpg",
        description: "stand straight, core tight, and step one leg back and bend both knees to a 90º angle. Then shin on your front leg is vertical, and your knee should not pass the toe. next, when you're ready to switch legs, drive the heel of the front foot into the ground and stand up",
        categories: ["legs", "quads", "glutes"]

    }, {
        title: "Forearm Plank",
        image: "http://www.divinitymagazine.com/wp-content/uploads/2015/04/forearm-plank-yoga-pose.jpg",
        description: "Place your forearms on the floor, elbows directly underneath your shoulders, hands facing forward so that your arms are parallel. Extend your legs behind you, feet hip- width apart. Tuck your tailbone and engage your core, butt, and quads. Hold here for a set amount of time",
        categories: ["core", "glutes"]

    }, {
        title: "Plank",
        image: "https://media.self.com/photos/57d5f882f71ce8751f6b41af/4:3/w_728/plank-challenge-feat.jpg",
        description: "Place your palms flat on the floor, hands shoulder-width apart, shoulders stacked directly above your wrists. Extend your legs behind you, feet hip-width apart. Tuck your tailbone and engage your core, butt, and quads. Hold there for a set amout of time",
        categories: ["core", "glutes"]

    }, {
        title: "Side Plank",
        image: "https://i2.wp.com/www.runsociety.com/wp-content/uploads/2014/06/sideplank-thumb.jpg?fit=960%2C540&ssl=1",
        description: "Lie on your right side with your hand directly underneath your right shouler. Extend your legs and stack your left foot on top of your right, and then squeeze your abds and glutes to lift your hips off the floor. Extend your left hand straight up toward the ceiling. Hold there for a set amount of time",
        categories: ["core", "deltoids"]

    }, {
        title: "Standing Dumbbell Curl",
        image: "http://static.wixstatic.com/media/faad25_72933982c1e54f0280b9f53f0d73e084~mv2.jpg",
        description: "Stand holding a dumbell in each hand with your arms hanging by your sides. ensure your elbows are close to your torso and your palms facing towards. Keeping your arms stationary, exhale as you curl the weights up to shoulder level while contracting your biceps",
        categories: ["arms", "biceps"]

    }, {
        title: "Hammer Curl",
        image: "https://cdn.prod.openfit.com/uploads/2017/12/06160253/1Open_Fit_Hammer_Curl_0506-770.jpg",
        description: "Let a pair of dumbbells hand at arm's lenght next to your sides with your palm facing your tights. Don't move your arms, instead, bend your elbows and curl the dumbbells as close to your shoulders as posible. Pause at the top -remember to squeeze- before slowly lowering the weight back to the starting position",
        categories: ["arms", "biceps"]

    }, {
        title: "Chin-up",
        image: "https://qph.fs.quoracdn.net/main-qimg-f5345d3f47dbad96b07c5145486f9449.webp",
        description: "Grab the bar with your palms facing towards you and a grip that is narrows than shoulder width. Pull yourself up until your head is above the bar. Slowly lower back to the start position",
        categories: ["arms", "back", "biceps"]

    }, {
        title: "Dips",
        image: "https://oldtowncrier.files.wordpress.com/2019/02/fromthetrainer_stock3-1.jpg",
        description: "Grab the parallel bars and jump up, straighten your arms. lower your body by bending your arms while leaning forward. Dip down until your shoulders are below your elbows. Lift your body up by straightening your arms. Lock your elbows at the top",
        categories: ["arms", "triceps"]
    }
]
 



Exercise.create(exercises)
    .then(exercise => {
        console.log(exercise);
    })
    .catch(err => {
        return err
    })


