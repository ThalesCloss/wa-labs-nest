# Aplicação
Aplicação desenvolvida para o teste utiliza o framework Nestjs.

Considerando as necessidades e poucas regras de negócio não realizei a modelagem de um domínio, utilizei entidades anémicas e as regras de negócio em uma camada de serviços. Há um acoplamento proposital entre a camada de negócio e os repositórios do Typeorm, no entanto a camada de negócios e persistência pode ser desacoplada facilmente da estrutura do framework.

As regras de negócio verificadas impedem a adição ou remoção de um exame de qualquer laboratório inativo e também impedem a adição ou remoção de um exame inativo de qualquer laboratório ativo. Ao inativar um exame a associação com o laboratório é mantida.





# Executando a aplicação via Docker
A aplicação possui um arquivo de configuração docker-compose que provisiona os containers necessários para o seu funcionamento.

Para iniciar a aplicação utilize o comando, em um terminal dentro da pasta do projeto.

`docker-compose up`

A aplicação estará disponível no endereço http://localhost:3000.

A documentação dos endpoints estará disponível no endereço http://localhost:3000/docs.

Um administrador de banco de dados estará disponível em http://localhost:8081. As credenciais de acesso são as mesmas do arquivo ormconfig.json.

Para executar os testes e2e utilize `docker exec -it wa_labs_api yarn test:e2e`


# Executando a aplicação localmente 

No diretório da aplicação faça a instalação das dependências com o comando `yarn install` ou `npm install`.

Configure a conexão do banco de dados local que será utilizado no arquivo ormconfig.json.

Execute o comando para build da aplicação `yarn build` ou `npm run build` e inicie a aplicação com `yarn start:prod` ou `npm run start:prod`.
