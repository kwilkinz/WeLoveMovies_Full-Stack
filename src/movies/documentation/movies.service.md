## Terms and Definitions for KNEX

---

**_SELECT_**
: select all rows from the table.

```
knex.from('cars')
    .select("*")
    ...
// returns all cars
```

**_WHERE({ })_**
: the sql where clause is used to define the condition to be met for rows returned.

```
knex.from('cars')
    .select("name", "price")
    .where('price', '>', '50000')
    ...
// returns only cars higher than 50K
```

**_.join()_**
: xx

```
Example
```

**_.groupBy()_**
: groups rows that have the same value into summary rows. Used often with aggregate functions (`count(), max(), min(), sum(), avg()`)

```
return knex("customers")
    .count(customerId)
    .select(country)
    .groupBy(country)
    ...
// returns # of customers in each country
```

---

## Queries Made:

1. listIfShowing:
   - JOINs movies + movie_theater
   - Where is making sure it will only return the ones in the join table with is_showing true.
2. list:
   - searches all movies
   - returns the specific movieId
3. read:
   - takes in the param of movieId
   - searches within movies and selects all
   - returns only the movie_id as MovieId
4. listTheaters:
   - takes in the param of movieId
   - searches in table movies_theaters
   - joins theater to movie_theater
   - returining the movieId and only if is_showing
5. listReviews:
   - takes in the param of movieId
   - knex() = searches within movies
   - create table called reviews and merges movie ids and review movie ids
   - create another table called critic and mergers critics ids and reviews ids.
   - select all
   - return only reviews ids signed as movieId
   - run a forEach: create empty list and insert addCritic into the movieList.
