## Technology Used

- CRUD Operations
- Express
- morgan

## Layout

1. `router.route("/")` Accesses:
   - LISTS every "is_showing" to the home page.
2. `router.route("/:movieId")` Accesses:
   - READ all the movieId's store in locals.
   - READ see if the specific movieId will be found within the database.
   - (we are passing along informtion we want KNEX to use through params)
3. `router.route("/:movieId/theaters/")`Accesses:
   - LIST theaters using the movieId, which we will be passing to KNEX within params.
4. `router.route("/:movieId/reviews")` Accesses:
   - LIST reviews linked with movieId.
