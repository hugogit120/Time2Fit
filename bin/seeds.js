const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const Routine = require('../models/Routine');


mongoose.connect(`mongodb://localhost/projectT2F`, { useNewUrlParser: true, useUnifiedTopology: true });
Exercise.collection.drop(); //para borrar las collectiones anteriores


const exercises = [
    {
        title: "Squats",
        image: "https://fitnessexpertawards.com/wp-content/uploads/2019/06/female-squat-form.jpg",
        description: "first stand with your feet either hip-or shoulder-width apart, then drive the hips back as if you were going to sit down on a seat behind you. As the hips drive back, bend your knees until you reach your desired depth, when your knees begin to shift forward, that is your end range.",
        categories: ["legs", "quads", "glutes"]

    },

    {
        title: "Jump Squats",
        image: "https://cdn1.coachmag.co.uk/sites/coachmag/files/styles/insert_main_wide_image/public/2017/08/jump-squat.jpg?itok=nIwJK85m",
        description: "Your feet should be shoulder-width apart when standing, next lower down into a squat with your thighs parallel to the floor, then jump as hard as you can, land in a squat position, and repeat",
        categories: ["legs", "quads", "glutes"]

    },
    {
        title: "Lunges",
        image: "https://s3.amazonaws.com/wodstarmedia/wp-content/uploads/2015/05/lunge-zapoli.jpg",
        description: "stand straight, core tight, and step one leg back and bend both knees to a 90º angle. Then shin on your front leg is vertical, and your knee should not pass the toe. next, when you're ready to switch legs, drive the heel of the front foot into the ground and stand up",
        categories: ["legs", "quads", "glutes"]

    }, {
        title: "Forearm Plank",
        image: "https://www.wellandgood.com/wp-content/uploads/2019/02/GettyImages-plank-LightFieldStudios.jpg",
        description: "Place your forearms on the floor, elbows directly underneath your shoulders, hands facing forward so that your arms are parallel. Extend your legs behind you, feet hip- width apart. Tuck your tailbone and engage your core, butt, and quads. Hold here for a set amount of time",
        categories: ["core", "glutes"]

    }, {
        title: "Plank",
        image: "https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2016/03/Extended-arm-plank-1.jpg",
        description: "Place your palms flat on the floor, hands shoulder-width apart, shoulders stacked directly above your wrists. Extend your legs behind you, feet hip-width apart. Tuck your tailbone and engage your core, butt, and quads. Hold there for a set amout of time",
        categories: ["core", "glutes"]

    }, {
        title: "Side Plank",
        image: "https://upl.stack.com/wp-content/uploads/2016/02/12101932/High-Side-Plank-STACK-654x367.jpg",
        description: "Lie on your right side with your hand directly underneath your right shouler. Extend your legs and stack your left foot on top of your right, and then squeeze your abds and glutes to lift your hips off the floor. Extend your left hand straight up toward the ceiling. Hold there for a set amount of time",
        categories: ["core", "deltoids"]

    }, {
        title: "Standing Dumbbell Curl",
        image: "http://www.trainbodyandmind.com/wp-content/uploads/2010/10/Biceps-Workout-Dumbbell-Curls-01.jpg",
        description: "Stand holding a dumbell in each hand with your arms hanging by your sides. ensure your elbows are close to your torso and your palms facing towards. Keeping your arms stationary, exhale as you curl the weights up to shoulder level while contracting your biceps",
        categories: ["arms", "biceps"]

    }, {
        title: "Hammer Curl",
        image: "http://www.all-musculation.com/AM-v6/images/20180319-5-erreurs-curl-marteau.jpg",
        description: "Let a pair of dumbbells hand at arm's lenght next to your sides with your palm facing your tights. Don't move your arms, instead, bend your elbows and curl the dumbbells as close to your shoulders as posible. Pause at the top -remember to squeeze- before slowly lowering the weight back to the starting position",
        categories: ["arms", "biceps"]

    }, {
        title: "Chin-up",
        image: "https://media.self.com/photos/5bad13813f15b979ec0368eb/4:3/w_728,c_limit/woman-doing-chin-up.jpg",
        description: "Grab the bar with your palms facing towards you and a grip that is narrows than shoulder width. Pull yourself up until your head is above the bar. Slowly lower back to the start position",
        categories: ["arms", "back", "biceps"]

    }, {
        title: "Dips",
        image: "http://upl.stack.com/wp-content/uploads/2017/06/01143659/Dips-Form-Mistake-STACK-654x414.jpg",
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