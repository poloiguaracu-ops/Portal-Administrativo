# Portal Administrativo — operação do D1

## Banco oficial

O Worker usa o binding `DB` apontado para o banco D1 `portal-administrativo`.

## Ordem para um banco existente

1. Garanta que `database/schema.sql` represente a estrutura desejada.
2. Para um banco que já foi criado com a estrutura anterior, aplique `migrations/0002_sessions.sql`.
3. Aplique `migrations/0003_enrollment_terms.sql` para adicionar os dados financeiros da matrícula.
4. Aplique `migrations/0004_timestamp_fields.sql` para habilitar atualização de turmas e aulas.

## Banco novo

Em uma criação do zero, `database/schema.sql` já contém as tabelas e colunas dessas migrations. Nesse caso, não aplique 0003 e 0004 novamente depois do schema completo.

## Primeira utilização

A rota `GET /api/auth/status` informa se ainda é necessário criar o primeiro administrador. O próprio portal mostra a tela de primeiro acesso quando a tabela `users` estiver vazia.

## Módulos cobertos pelo backend

Autenticação e sessões, usuários e perfis, dashboard, alunos, professores, funcionários, cursos, matrículas, financeiro, turmas, aulas, documentos, vínculo professor-curso e auditoria.

## Segurança

As senhas são derivadas com PBKDF2 no Worker. A sessão usa cookie `HttpOnly`, `Secure` e `SameSite=Lax`. O token persistido no D1 é armazenado apenas como hash SHA-256.

## Documentos

O módulo de documentos atualmente registra metadados e uma `storage_key`/referência. O upload físico de arquivos requer uma camada de armazenamento própria, como R2, que ainda não está declarada no `wrangler.jsonc`.

## Publicação

Este arquivo documenta o código do repositório. A aplicação das migrations no D1 e a publicação do Worker são operações separadas da alteração do código-fonte e precisam ser executadas no ambiente Cloudflare.
