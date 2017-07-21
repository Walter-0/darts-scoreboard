# Darts
A web-based ranking system for a darts league.

JS

Like that you used ES6, but because you didn’t include babel as a preprocessor it isn’t particularly friendly with a wide variety of browsers

Also there is no handling in your code for if the result is “NaN” so your code breaks there and breaks sorting entirely

Line 52 You do not account for more than a two-way tie in your logic

Line 53 Instead of creating elements and appending them you just inserted the HTML

Line 65 clearRankings does not actually clear the stored rankings – it clears the scores DOM but not from session memory

Pressing ‘Enter’ on keyboard does not submit the form
