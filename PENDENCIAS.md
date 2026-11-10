# Pendências de conteúdo

Nada abaixo foi inventado: cada item está marcado como `pending` no código e fica oculto em produção até ser preenchido.

## Autorização (antes de publicar mais detalhes)

- [ ] **Oráculo**: autorização para nome público, diagrama da arquitetura e mascote. Depois da autorização, dá para incluir um bloco "Arquitetura detalhada" (stack, cascata, classes) com `restricted: true` em `content/*/cases.ts`. Ele foi retirado do código para não ficar exposto no repositório público.
- [ ] **Oráculo**: situação atual (protótipo ou em uso pela central) e o que "automatizei parte da triagem" significa na prática.
- [ ] **Oráculo**: métricas de avaliação, se houver avaliação formal (acurácia, tempo de triagem) e a metodologia usada.

## Estudos de caso

- [ ] **TelaBrasil**: data de lançamento, URL pública, o que pode ser dito sobre o público.
- [ ] **TelaBrasil**: tamanho e composição do time.
- [ ] **TelaBrasil**: uma frase sobre o que cada módulo faz para o usuário (Minha Área, Busca avançada, Modo offline). Os cartões já existem no caso e mostram só o nome até lá.
- [ ] **TelaBrasil**: uma ou duas decisões concretas com participação direta (contexto, pergunta, alternativas, escolha). Isso ativa o componente de decisões nesse caso.
- [ ] **CultBR**: um chamado ou investigação exemplar, sem dados sensíveis: o que parecia ser, o que era e que decisão permitiu.
- [ ] **Aprendizados** dos três casos, na sua voz.
- [ ] Revisar os textos de "por que este artefato" (TelaBrasil) e as consequências nas decisões do Oráculo: são raciocínio atribuído a você e devem soar como você.

## Experiências

- [ ] **APA**: o que é o projeto e para quem existe.
- [ ] **SPTE**: órgão ou parceiro, e o que pode ser dito publicamente.
- [ ] **KADIN e Ophtalad**: o que são e para quem foram feitos.

## Perfil e publicação

- [ ] **GitHub**: endereço (o link fica oculto enquanto `github` for `null` em `content/profile.ts`).
- [ ] **Domínio**: definir `NEXT_PUBLIC_SITE_URL`.
- [ ] **Disponibilidade**: remoto, híbrido ou mudança de cidade (pode entrar na faixa de fatos do hero).
- [ ] **CV em inglês**: hoje a versão EN aponta para o PDF em português, sinalizado como tal.
