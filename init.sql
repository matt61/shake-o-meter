

-- DROP TABLE events;

CREATE TABLE events
(
  id serial NOT NULL,
  name character varying,
  CONSTRAINT events_pkey PRIMARY KEY (id)
)

DROP TABLE responses;

CREATE TABLE responses
(
  id serial NOT NULL,
  event_id int NOT NULL,
  response_time int NOT NULL,
  response_count int NOT NULL,
  CONSTRAINT responses_pkey PRIMARY KEY (id)
);

-- DROP TABLE participants;

CREATE TABLE participants
(
  id serial NOT NULL,
  event_id int NOT NULL,
  uid varchar NOT NULL,
  CONSTRAINT participants_pkey PRIMARY KEY (id)
);
