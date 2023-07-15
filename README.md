# 🙈 MoniTech 👨‍💻

<br/>

## 🏛️ Arquitectura del proyecto

Este proyecto es un monorepo administrado por [NX](https://nx.dev).
Esta herramienta nos permite, entre otras, compartir dependencias, configuraciones de linting y código entre varias apps.

Hay dos carpetas principales:

- `apps`: aquí van las aplicaciones. 
- `packages`: aquí va el código compartido.

Dentro de `apps` tenemos:

- `frontend`: el cliente, hecho  con Next.js.
- `backend`: la API, hecha con NestJS.

Dentro de `packages` tenemos las siguientes carpetas:

- `types`: aquí ponemos todos los tipos de TypeScript
que se comparten a través de la app. Por ejemplo, una interface `User`, se define dentro de esta carpeta y se importa desde `frontend` o `backend`.
- `db`: dedicada a menejar el esquema de la base de datos. Incluye los modelos de aplicación y lo necesario para ejecutar migraciones.`

<br/>

## 👩‍💻 Desarollo

### Pasos para correr localmente

Para poder correr el proyecto, el primer paso es instalar dependencias.

```
npm install
```

Esto instala las dependencias para todas las apps.

Luego, para desarrollar:

```
npm run dev
```

Este comando inicia todas las aplicaciones en modo desarrollo.

Para correr sólo el `frontend`:

```
npm run dev:frontend
```

Para correr sólo el `backend`:

```
npm run dev:backend
```


<br/>

###  📦 Dependencias

Las dependencias se comparten globalmente en el proyecto.Por lo tanto si usás varias en dos apps, sólo se instalan una vez.
Por lo tanto:

> Siempre que se agregue una dependencia se debe hacer desde la carpeta raíz del proyecto y no dentro de las carpetas de las apps.
