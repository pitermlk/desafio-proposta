# Desafio: Problemas com propostas

## Requititos

[Documentação do NodeJS](https://nodejs.org/en/)

[Documentação do Yarn](https://yarnpkg.com/getting-started/install)

## Instalar os pacotes

`$ yarn install`

## Para executar

`$ yarn start`

## Para acessar os endpoints

`http://localhost:3003/api/proposta/validar`

### Body do endpoint

```
{
    "propostas": [
        {
            "propostaId": 53498884,
            "produto": {
                "produtoId": 1176,
                "nrVersaoOferta": 8
            },
            "dataInicioVigencia": "2021-01-21 00:00:00",
            "dataFimVigencia": "2025-03-18 00:00:00"
        },
        {
            "propostaId": 54069650,
            "produto": {
                "produtoId": 1221,
                "nrVersaoOferta": 2
            },
            "dataInicioVigencia": "2021-04-07 00:00:00",
            "dataFimVigencia": "2026-04-07 00:00:00"
        }
    ]
}
```
