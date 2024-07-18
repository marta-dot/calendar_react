create table table_name
(
    date          date not null,
    title         text not null,
    description   text,
    selectedColor enum ('green', 'red', 'blue', 'yellow') not null
);



insert into events (title, date, selectedcolor, description) values ('The Big Event', '2024-01-01', 'green', 'The biggest event of the year');

select * from events;
