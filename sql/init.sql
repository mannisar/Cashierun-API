PGDMP                          x            pointofsales    13.1    13.1 .    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    pointofsales    DATABASE     p   CREATE DATABASE pointofsales WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE pointofsales;
                postgres    false            �            1259    16396    account    TABLE     �  CREATE TABLE public.account (
    id integer NOT NULL,
    name character varying(25) NOT NULL,
    email character varying(25) NOT NULL,
    password character varying(256) NOT NULL,
    salt character varying(256) NOT NULL,
    id_role integer NOT NULL,
    image text,
    date_added timestamp without time zone DEFAULT now() NOT NULL,
    date_updated timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.account;
       public         heap    postgres    false            �            1259    16410    account_id_role_seq    SEQUENCE     |   CREATE SEQUENCE public.account_id_role_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.account_id_role_seq;
       public          postgres    false    200            �           0    0    account_id_role_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.account_id_role_seq OWNED BY public.account.id_role;
          public          postgres    false    202            �            1259    16401    account_id_seq    SEQUENCE     �   CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.account_id_seq;
       public          postgres    false    200            �           0    0    account_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;
          public          postgres    false    201            �            1259    16431    category    TABLE     d   CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(256) NOT NULL
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    16429    category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.category_id_seq;
       public          postgres    false    204            �           0    0    category_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;
          public          postgres    false    203            �            1259    16439    product    TABLE     w  CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(25) NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    available integer NOT NULL,
    id_category integer NOT NULL,
    image text,
    date_added timestamp without time zone DEFAULT now() NOT NULL,
    date_updated timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    16437    product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.product_id_seq;
       public          postgres    false    206            �           0    0    product_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;
          public          postgres    false    205            �            1259    16448    purchase    TABLE     �   CREATE TABLE public.purchase (
    id character varying(55) NOT NULL,
    id_account integer NOT NULL,
    total integer NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.purchase;
       public         heap    postgres    false            �            1259    16463    purchase_detail    TABLE     �   CREATE TABLE public.purchase_detail (
    id integer NOT NULL,
    id_purchase character varying(55) NOT NULL,
    id_product integer NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL
);
 #   DROP TABLE public.purchase_detail;
       public         heap    postgres    false            �            1259    16461    purchase_detail_id_seq    SEQUENCE     �   CREATE SEQUENCE public.purchase_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.purchase_detail_id_seq;
       public          postgres    false    209            �           0    0    purchase_detail_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.purchase_detail_id_seq OWNED BY public.purchase_detail.id;
          public          postgres    false    208            �            1259    16471    role    TABLE     _   CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying(25) NOT NULL
);
    DROP TABLE public.role;
       public         heap    postgres    false            �            1259    16469    role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.role_id_seq;
       public          postgres    false    211            �           0    0    role_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;
          public          postgres    false    210            B           2604    16403 
   account id    DEFAULT     h   ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);
 9   ALTER TABLE public.account ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200            C           2604    16421    account id_role    DEFAULT     r   ALTER TABLE ONLY public.account ALTER COLUMN id_role SET DEFAULT nextval('public.account_id_role_seq'::regclass);
 >   ALTER TABLE public.account ALTER COLUMN id_role DROP DEFAULT;
       public          postgres    false    202    200            F           2604    16434    category id    DEFAULT     j   ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);
 :   ALTER TABLE public.category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    203    204            G           2604    16442 
   product id    DEFAULT     h   ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
 9   ALTER TABLE public.product ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    206    206            K           2604    16466    purchase_detail id    DEFAULT     x   ALTER TABLE ONLY public.purchase_detail ALTER COLUMN id SET DEFAULT nextval('public.purchase_detail_id_seq'::regclass);
 A   ALTER TABLE public.purchase_detail ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208    209            L           2604    24587    role id    DEFAULT     b   ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);
 6   ALTER TABLE public.role ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            �          0    16396    account 
   TABLE DATA           l   COPY public.account (id, name, email, password, salt, id_role, image, date_added, date_updated) FROM stdin;
    public          postgres    false    200   �1       �          0    16431    category 
   TABLE DATA           ,   COPY public.category (id, name) FROM stdin;
    public          postgres    false    204   F3       �          0    16439    product 
   TABLE DATA           x   COPY public.product (id, name, description, price, available, id_category, image, date_added, date_updated) FROM stdin;
    public          postgres    false    206   r3       �          0    16448    purchase 
   TABLE DATA           ?   COPY public.purchase (id, id_account, total, date) FROM stdin;
    public          postgres    false    207   �3       �          0    16463    purchase_detail 
   TABLE DATA           W   COPY public.purchase_detail (id, id_purchase, id_product, price, quantity) FROM stdin;
    public          postgres    false    209   Q4       �          0    16471    role 
   TABLE DATA           (   COPY public.role (id, name) FROM stdin;
    public          postgres    false    211   �4       �           0    0    account_id_role_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.account_id_role_seq', 1, false);
          public          postgres    false    202            �           0    0    account_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.account_id_seq', 2, true);
          public          postgres    false    201            �           0    0    category_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.category_id_seq', 2, true);
          public          postgres    false    203            �           0    0    product_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.product_id_seq', 1, true);
          public          postgres    false    205            �           0    0    purchase_detail_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.purchase_detail_id_seq', 2, true);
          public          postgres    false    208            �           0    0    role_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.role_id_seq', 4, true);
          public          postgres    false    210            N           2606    16420    account account_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.account DROP CONSTRAINT account_pkey;
       public            postgres    false    200            P           2606    16436    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    204            R           2606    16447    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    206            V           2606    16468 $   purchase_detail purchase_detail_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.purchase_detail
    ADD CONSTRAINT purchase_detail_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.purchase_detail DROP CONSTRAINT purchase_detail_pkey;
       public            postgres    false    209            T           2606    16456    purchase purchase_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.purchase
    ADD CONSTRAINT purchase_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.purchase DROP CONSTRAINT purchase_pkey;
       public            postgres    false    207            X           2606    16476    role role_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public            postgres    false    211            �   b  x�}�;r1�zu�\`%��[�I�+��RF^i�U��>�$i\� ���$�~Z�֗&�����dS�T)�^	p-}t^rl1P3ӎȤ�9'�����s
	,FR<d&XEu�,MS��L�&�V�'�T��(���8Q%gQ�[A�^�0����K���rߖ���"vx�:S���M"�!�!|XrY��$�������H`WO�5��b��XJA�%l���i+^+c��cs1@ ~���HNJ�k�u:�ҫg�M\sGmR��Pe�^"��,uL5���.Y��\d��!�U曼�c��t{�[��l}}�u^�ǯ�*�����s�π1-��:~�'���~���V0�m      �      x�3�t��O�2�t)�������� 5��      �   t   x�}���  ��Q wG"	ߌ�؂F3�cpl_+p�K0�<��MO�%=aN[�s�$��<0����\�K*��-v��޵H���ф����!��c7D�8�0��:[��]N"h      �   K   x���� ��T�p�@֒�q����)�ne�7��LN�Ϊkyl�s�"��
X䂎�òZ:�D��,�      �   T   x�M˱� @�w!wID�!����OC��J�B����p���#�^V ��>�NjGI�P��nE�L�ͫf���j�}(S�      �   5   x�3�tL����2�tN,��L-�2�t��ϫ��/-�2�.-H-R������� nH     