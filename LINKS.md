# Links oficiais

## Site público
https://portal-administrativo.polo-iguaracu.workers.dev/site-publico/

## Portal Administrativo
https://portal-administrativo.polo-iguaracu.workers.dev/portal-administrativo/

### Rotas principais internas
- Site público: `/instituto`
- Portal Administrativo: `/portal`

As pastas `/site-publico/` e `/portal-administrativo/` foram adicionadas ao projeto como entradas estáveis e redirecionam automaticamente para as interfaces oficiais.

Os domínios personalizados `institutocanogrande.com.br` e `portal.institutocanogrande.com.br` continuam previstos no Worker, mas dependem da configuração de DNS/domínio personalizado na Cloudflare.

**Importante:** alterar o código no GitHub não publica automaticamente uma nova versão no Worker, a menos que exista uma integração de deploy configurada. Portanto, os links acima passam a funcionar no endereço do Worker depois que a versão atualizada do projeto estiver publicada no Cloudflare Worker `portal-administrativo`.
