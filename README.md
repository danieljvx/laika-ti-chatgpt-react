<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://laikamascotas.cl/logos/laika-logo-white.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A component reactjs for <a href="http://laika.com.co" target="_blank">Laika</a> chat assistant connecting by socket to consume chat-gpt api rest.</p>
    <p align="center">
[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]
</p>

## Dependencies

|  |
| ------ |
| [React Js](https://react.dev/) |
| [Material UI](https://mui.com/) |
| [Socket IO](https://socket.io/) |
| [swiper](https://swiperjs.com/react) |
| [moment](https://momentjs.com/) |
| [classnames](https://github.com/JedWatson/classnames#readme) |


## Installation

```bash
$ npm install laika-ti-chatgpt-react
```
or
```bash
$ yarn add laika-ti-chatgpt-react
```

## Usage

Add `LaikaChatGPT` to your component:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import LaikaChatGPT from 'laika-ti-chatgpt-react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
      <LaikaChatGPT
        host=""
        user={{
          id: 0,
          userId: 0,
          avatar: '',
          email: '',
          fullname: '',
          tokenAuth: '',
          socketId: '',
        }}
      />
    </React.StrictMode>,
)
```

## License

Laika is [MIT licensed](LICENSE).

Author - [Daniel Villanueva](jose.villanueva@laika.pet)