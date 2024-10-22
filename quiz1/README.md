Here, I used a frankAPI function to pull the data from the latest endpoint and sent it to a php file that stored that data in the weather database the was made in lab3. The useFrankData function pulls the data from the SQL database using fetch that asks the created frankdata.php to return the data from the database. Then using this data, I dynamically created a table in the HTML using insertAdjacentHTML. I copied over all the files from lab3 to use a starting point and integrated the frankfurt API to include all the foriegn currency exchange rates using a Euro base.

I then used GSAP to animate the table rows to come up based on when you scroll to it. (When it enters the viewport)
Resources:
https://www.w3schools.com/html/html_tables.asp
https://www.w3schools.com/html/html_symbols.asp
https://coreui.io/blog/how-to-round-a-number-to-two-decimal-places-in-javascript/
