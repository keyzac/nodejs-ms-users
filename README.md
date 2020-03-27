# Microservicio Users

Microservicio basado en NodeJS.

### Prerequisitos

    * Docker
    * Docker Compose
    * Make

### Instalación

Pasos para la instalación

#### Aplicación

```
Servicio
* make build
* make yarn-install-local
* make up

Base de datos
* make build-db
* make up-db
* make prepare-db
```

#### Documentación Swagger
- [Doc Swagger](http://34.68.140.251/v1/users/doc)

#### Recursos del servicio
###### Post
- http://34.68.140.251/v1/users/creacliente

###### Get
- http://34.68.140.251/v1/users/kpideclientes
- http://34.68.140.251/v1/users/listclientes
