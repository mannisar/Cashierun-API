-- Table: account

-- DROP TABLE account;

CREATE TABLE account
(
    id serial NOT NULL,
    name character varying(25) COLLATE pg_catalog."default" NOT NULL,
    email character varying(25) COLLATE pg_catalog."default" NOT NULL,
    password character varying(256) COLLATE pg_catalog."default" NOT NULL,
    salt character varying(256) COLLATE pg_catalog."default" NOT NULL,
    id_role integer NOT NULL,
    image text COLLATE pg_catalog."default",
    date_added timestamp without time zone NOT NULL DEFAULT now(),
    date_updated timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT account_pkey PRIMARY KEY (id)
);


TABLESPACE pg_default;

INSERT INTO account(
	id, name, email, password, salt, id_role, image, date_added, date_updated)
	VALUES (1, 'admin', 'admin@cashierun.id', '163972ee5b67650895eb67f542c217cddbe6687baf443a756c50dbbd883130d2281a5f1481da69c72bf6b4acb390465f14631d363f2d9cf3db35d8b772ff7ae2', '797f8ab8ef4c568fe9', 1, 'http://localhost:3004/upload/Ava-Man.png', '2020-12-11 00:45:10.301817', '2020-12-11 00:45:10.301817');

ALTER TABLE account
    OWNER to postgres;

-- Table: category

-- DROP TABLE category;

CREATE TABLE category
(
    id serial NOT NULL,
    name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT category_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE category
    OWNER to postgres;

-- Table: product

-- DROP TABLE product;

CREATE TABLE product
(
    id serial NOT NULL,
    name character varying(25) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    available integer NOT NULL,
    id_category integer NOT NULL,
    image text COLLATE pg_catalog."default",
    date_added timestamp without time zone NOT NULL DEFAULT now(),
    date_updated timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT product_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE product
    OWNER to postgres;

-- Table: purchase

-- DROP TABLE purchase;

CREATE TABLE purchase
(
    id character varying(55) COLLATE pg_catalog."default" NOT NULL,
    id_account integer NOT NULL,
    total integer NOT NULL,
    date timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT purchase_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE purchase
    OWNER to postgres;

-- Table: purchase_detail

-- DROP TABLE purchase_detail;

CREATE TABLE purchase_detail
(
    id serial NOT NULL,
    id_purchase character varying(55) COLLATE pg_catalog."default" NOT NULL,
    id_product integer NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT purchase_detail_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE purchase_detail
    OWNER to postgres;

-- Table: role

-- DROP TABLE role;

CREATE TABLE role
(
    id serial NOT NULL,
    name character varying(25) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT role_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

INSERT INTO role(
	id, name)
	VALUES (1, 'Super Admin');

ALTER TABLE role
    OWNER to postgres;