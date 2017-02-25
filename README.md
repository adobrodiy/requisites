# requisites
Пакет для генерации и валидации тестовых ОГРН

Подключаем
```
const generatorFactory = require( 'generator' );
```

Конфигурируем
```
const generator = generatorFactory( null, {
	initVals: [ "1", "5" ]
} );
```

Генерируем
```
const ogrn = generator.generate();
```

Валидируем
```
const validation = generator.validate( ogrn );
const valid = Object.keys( validation ).reduce( ( valid, key ) => {
    return valid && validation[ key ];
}, true );

console.log( `ogrn is valid: ${ valid }` );
```

