--- Criando a Base de Dados ---
CREATE TABLE cliente (
	id_cliente serial not null primary key,
	nome varchar(100) not null,
	data_agenda date not null
);

insert into cliente (id_cliente, nome, data_agenda) values ('1', 'teste', '2022/01/20');
insert into cliente (id_cliente, nome, data_agenda) values ('2', 'hello world', '2022/01/20');

select * from cliente
-- =========================================================================================== --
CREATE TABLE usuario (
	id_usuario serial not null primary key,
	email varchar(100) not null,
	senha integer not null
); drop table usuario

select * from usuario
-- =========================================================================================== --