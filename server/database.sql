CREATE TABLE Test (
    TestID int NOT NULL IDENTITY,
    FirstName varchar(255),
    LastName varchar(255),
	PRIMARY KEY (TestID)
);

INSERT INTO test (FirstName, LastName)
VALUES ('Ante', 'Bašić');

