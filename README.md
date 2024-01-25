# A-MAZE PROTOTYPE (WIP)

A-MAZE - простая роглайк игра, на которой тестирую разные механики.

## Как настроить проект локально

Устанавливаем **nvm**
```sh 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Обновляем конфиг, чтобы команда nvm стала доступна
```sh
# если используем bash
source ~/.bashrc
# если используем zsh
source ~/.zshrc
```

Установливаем node
```sh
nvm install 18
```

Ставим как версию по-умолчанию
```sh
nvm alias default node
```

Установливаем yarn
```sh
npm i -g yarn
```

Установливаем parcel
```sh
yarn add --dev parcel
```

Запускаем проект, откроется браузер
```sh
yarn && yarn start
```

Чтобы собрать билд запускаем. Сборка сохраняется в директорию `build``
```sh
yarn build
```
