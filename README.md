## Dronetracker

This is an assignment submission for Reaktor Developer Trainee position. It is built using React and p5.js.

### `Functionality`

This web application is built to list all the pilots who recently violated the NDZ perimeter of endangered Monadikuikka.

The list the app creates:
- Persist the pilot information for 10 minutes since their drone was last seen by the equipment
- Display the closest confirmed distance to the nest
- Contain the pilot name, email address and phone number
- Immediately show the information from the last 10 minutes to anyone opening the application
- Not require the user to manually refresh the view to see up-to-date information
- Develop the application as if it was always operational. However, for the sake of staying within free tiers of some hosting providers, it's OK if your application is suspended and loses data after it has not received traffic for a while. It'll be given a moment to warm up and gather new data before being evaluated.

Tip: You may find it helpful to also visualize the drone positions in some way, but doing so is not a requirement.

### `Evaluation and priorities`

- The quality of your code, such as readability, structure and correctness
- How well you understood and matched the objectives in this brief
- Keep in mind how good the UI looks is secondary in the evaluation of this assignment and only producing the list is required. Focus on solving the objectives first, as bending or omitting some of the objectives may trivialize the challenges we are interested to see you solve.

Note to self:
missing things
- prio 3 dealing with errors (429 in both, 400 in second -> inform on html DOM that something is wrong(Red text box under radar, size max 290 with margins etc))
- prio 2 hosting (working on it)
- prio 4 suspension of hosting
- prio 5 code cleaning
- prio 1 single closest distance in last 10 m (done, check that it also updates if drone is no longer in system)