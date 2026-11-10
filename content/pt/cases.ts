import type { CaseStudy } from "../types";

export const cases: CaseStudy[] = [
  {
    slug: "telabrasil",
    index: "01",
    title: "TelaBrasil",
    chapter: "Da necessidade à funcionalidade validada",
    problemType: "Construir um produto",
    question: "Como transformar uma necessidade institucional em uma funcionalidade que o time consegue construir, testar e entregar?",
    summary:
      "Plataforma pública e gratuita de streaming desenvolvida em colaboração com o Ministério da Cultura. Atuei na estruturação funcional da plataforma como um todo, da concepção ao lançamento: participei do discovery e do refinamento do backlog apoiando o PO e homologuei mais de 130 histórias. Três módulos ficaram inteiramente sob minha responsabilidade.",
    emphasis: ["produto", "tecnologia"],
    highlight: { value: "130+", label: "histórias de usuário homologadas" },
    cover: {
      src: "/images/telabrasil-lancamento.jpg",
      alt: "Arte de divulgação do lançamento da TelaBrasil pelo Ministério da Cultura, com o painel do evento em Brasília e o logotipo da plataforma no telão.",
      width: 1672,
      height: 941,
    },
    features: { label: "Destaque · módulos sob minha responsabilidade", items: ["Minha Área", "Busca avançada", "Modo offline"] },
    seoDescription:
      "Estudo de caso: estruturação funcional do TelaBrasil, plataforma pública de streaming. Atuação na plataforma como um todo, mais de 130 histórias homologadas e os módulos Minha Área, Busca avançada e Modo offline sob minha responsabilidade.",
    meta: [
      { label: "Papel", value: "Engenheiro de Requisitos" },
      { label: "Organização", value: "NEES/UFAL" },
      { label: "Período", value: "06/2024 – 09/2026" },
      { label: "Time", value: "", pending: "Tamanho e composição do time." },
    ],
    sections: [
      {
        kind: "text",
        id: "contexto",
        title: "Contexto",
        paragraphs: [
          "O TelaBrasil é uma plataforma pública e gratuita de streaming, desenvolvida em colaboração com o Ministério da Cultura. Um produto assim responde a muitas vozes ao mesmo tempo: objetivos institucionais, áreas de negócio, equipes técnicas e, no fim da linha, o público que vai assistir.",
          "Entrei na concepção, acompanhei a plataforma até o lançamento e segui na evolução do produto até 09/2026.",
        ],
      },
      {
        kind: "text",
        id: "lancamento",
        title: "Lançamento",
        paragraphs: [],
        pending: "Data de lançamento, URL pública e o que pode ser dito sobre o público da plataforma.",
      },
      {
        kind: "text",
        id: "problema",
        title: "O desafio",
        paragraphs: [
          "Necessidades institucionais costumam chegar amplas, como objetivos e não como funcionalidades. Um objetivo, sozinho, não dá para construir nem para testar.",
          "Meu trabalho foi atravessar essa distância sem que o significado se perdesse entre a reunião com stakeholders e o código, e depois confirmar que o que foi entregue era o que tinha sido combinado.",
        ],
      },
      {
        kind: "split",
        id: "contribuicao",
        title: "Contribuição",
        mine: [
          "Analisei requisitos funcionais e não funcionais com stakeholders institucionais, áreas de negócio e equipes técnicas, e participei do discovery apoiando o PO.",
          "Apoiei o PO no refinamento do backlog, na priorização de demandas e no planejamento de releases.",
          "Escrevi histórias de usuário, critérios de aceite em BDD e a documentação funcional que alimentava a homologação.",
          "Homologuei funcionalidades e validei em produção: mais de 130 histórias.",
          "Apoiei o QA na criação e execução de testes E2E com Playwright.",
          "Organizei o repositório de documentação na Wiki.js e criei o dicionário de erros da plataforma.",
          "Fui o único responsável pela especificação e homologação dos módulos Minha Área, Busca avançada e Modo offline.",
        ],
        team: [
          "Desenvolvimento e operação da plataforma.",
          "Criação e manutenção dos testes automatizados, conduzidas pelo QA.",
          "Condução do discovery, do refinamento e das decisões de prioridade, pelo PO com as áreas responsáveis pelo produto.",
        ],
      },
      {
        kind: "modules",
        id: "modulos",
        title: "Destaque: módulos sob minha responsabilidade",
        intro:
          "Atuei na especificação e homologação da plataforma como um todo. Estes três módulos, porém, ficaram inteiramente comigo: fui o único responsável pelos requisitos, pelas histórias e critérios de aceite e pela homologação de cada entrega.",
        role: "Módulos sob minha responsabilidade exclusiva",
        items: [
          { name: "Minha Área", pending: "O que o módulo Minha Área oferece ao usuário, em uma frase." },
          { name: "Busca avançada", pending: "O que a Busca avançada permite fazer, em uma frase." },
          { name: "Modo offline", pending: "O que o Modo offline resolve para o usuário, em uma frase." },
        ],
      },
      {
        kind: "artifacts",
        id: "artefatos",
        title: "Artefatos são meios",
        intro:
          "Nenhum desses documentos é o objetivo. Cada um existe para tirar um tipo específico de dúvida do caminho.",
        items: [
          { name: "Histórias de usuário", why: "Mantêm a conversa no usuário e no valor, e não na tela." },
          {
            name: "Critérios de aceite em BDD",
            why: "Tornam o pronto verificável. Dev, QA e negócio leem a mesma frase e chegam à mesma conclusão.",
          },
          {
            name: "BPMN",
            why: "Alinha o fluxo antes do código. Discutir uma seta custa menos do que refazer uma funcionalidade.",
          },
          {
            name: "Homologação",
            why: "Fecha o ciclo e confirma que o que foi entregue é o que foi combinado.",
          },
          {
            name: "Dicionário de erros",
            why: "Dá nome e significado a cada erro da plataforma, para que suporte, QA e desenvolvimento falem da mesma coisa.",
          },
          {
            name: "Wiki.js",
            why: "Reúne a documentação num lugar só, onde quem chega ao projeto consegue encontrar o que precisa.",
          },
        ],
      },
      {
        kind: "decisions",
        id: "decisoes",
        title: "Decisões",
        items: [],
        pending:
          "Uma ou duas decisões concretas em que você teve participação direta (o contexto, a pergunta, as alternativas consideradas e o que foi escolhido).",
      },
      {
        kind: "results",
        id: "resultados",
        title: "Resultados",
        items: [
          {
            value: "130+",
            label: "histórias de usuário homologadas",
            note: "Entre 06/2024 e 09/2026, cada uma validada contra os critérios de aceite.",
            scope: "individual",
          },
          {
            value: "3",
            label: "módulos sob minha responsabilidade exclusiva",
            note: "Minha Área, Busca avançada e Modo offline, da especificação à homologação, além da atuação na plataforma como um todo.",
            scope: "individual",
          },
          {
            label: "Repositório de documentação na Wiki.js",
            note: "Organizado por mim e usado como fonte de consulta do projeto.",
            scope: "individual",
          },
          {
            label: "Dicionário de erros da plataforma",
            note: "Criado por mim como referência comum para suporte, QA e desenvolvimento.",
            scope: "individual",
          },
          {
            label: "Plataforma lançada",
            note: "Resultado do time inteiro. Minha parte foi a estruturação funcional, as histórias com critérios de aceite, o apoio ao PO no refinamento e a homologação.",
            scope: "team",
          },
        ],
      },
      {
        kind: "text",
        id: "aprendizados",
        title: "Aprendizados",
        paragraphs: [],
        pending: "Aprendizados do projeto, na sua voz.",
      },
    ],
  },
  {
    slug: "cultbr",
    index: "02",
    title: "CultBR",
    chapter: "Investigar antes de corrigir",
    problemType: "Evoluir um produto em operação",
    question: "Isto é um bug, um erro de uso, um comportamento esperado ou uma regra que nunca foi bem definida?",
    summary:
      "Plataforma ligada à execução de políticas públicas de cultura, incluindo a Política Nacional Aldir Blanc. Sou a referência de requisitos na sustentação: investigo cada chamado contra as regras de negócio e especifico a correção. Foi nessa rotina que concebi o Oráculo.",
    emphasis: ["tecnologia", "negocio"],
    highlight: { value: "50+", label: "chamados de sustentação resolvidos" },
    seoDescription:
      "Estudo de caso: sustentação e evolução do CultBR, plataforma de políticas públicas de cultura. Análise de chamados, regras de negócio, BPMN e especificação de correções.",
    meta: [
      { label: "Papel", value: "Engenheiro de Requisitos" },
      { label: "Organização", value: "NEES/UFAL" },
      { label: "Período", value: "01/2026 – atual" },
      { label: "Foco", value: "Sustentação e evolução" },
    ],
    sections: [
      {
        kind: "text",
        id: "contexto",
        title: "Contexto",
        paragraphs: [
          "O CultBR apoia a execução de políticas públicas de cultura, incluindo a Política Nacional Aldir Blanc. É uma plataforma em operação, com regras de negócio densas e usuários que dependem dela no dia a dia.",
          "Nesse cenário, sustentar é mais do que corrigir: cada mudança precisa respeitar regras que já estão em uso por muita gente.",
        ],
      },
      {
        kind: "text",
        id: "problema",
        title: "O desafio",
        paragraphs: [
          "Um chamado raramente diz o que está errado. Ele diz o que a pessoa viu. Entre o relato e a correção existe uma pergunta que precisa ser respondida primeiro: isso é um bug, um erro de uso, um comportamento esperado ou uma regra que nunca foi bem definida?",
          "Responder errado custa caro nas duas direções: corrigir o que não estava quebrado ou fechar como erro de uso algo que era um defeito real.",
        ],
      },
      {
        kind: "text",
        id: "investigacao",
        title: "Investigação",
        paragraphs: [
          "Meu trabalho começa antes da correção. Cruzo o relato com as regras de negócio e os requisitos vigentes, avalio o impacto operacional e só então descrevo o que precisa mudar, como história com critérios de aceite.",
          "Os fluxos mais críticos ganham mapeamento em BPMN e documentação funcional, para que a próxima investigação comece de um lugar melhor do que a anterior.",
        ],
      },
      {
        kind: "split",
        id: "contribuicao",
        title: "Contribuição",
        mine: [
          "Analiso chamados, regras de negócio, requisitos e impacto operacional.",
          "Descrevo histórias de usuário, critérios de aceite e detalhamentos funcionais, alinhando stakeholders, Produto, Desenvolvimento e QA.",
          "Mapeio processos em BPMN e documento fluxos críticos.",
          "Concebi e construí o Oráculo, uma solução de triagem com RAG e busca híbrida.",
        ],
        team: [
          "Implementação das correções e evoluções pelo desenvolvimento.",
          "Testes e validação das correções.",
          "Priorização com Produto e stakeholders.",
        ],
      },
      {
        kind: "decisions",
        id: "decisoes",
        title: "Decisões",
        items: [],
        pending:
          "Um chamado ou investigação exemplar (sem dados sensíveis): o que parecia ser, o que era de fato e que decisão isso permitiu.",
      },
      {
        kind: "results",
        id: "resultados",
        title: "Resultados",
        items: [
          {
            value: "50+",
            label: "chamados de sustentação resolvidos",
            note: "Desde 01/2026, da análise do chamado à especificação da correção.",
            scope: "individual",
          },
          {
            label: "Parte da triagem automatizada",
            note: "Por meio do Oráculo, que sugere a classificação com as fontes e deixa a decisão com uma pessoa.",
            scope: "individual",
          },
          {
            label: "Correções implantadas",
            note: "Trabalho conjunto de desenvolvimento, QA e Produto. Minha parte foi a análise do chamado e a especificação da correção.",
            scope: "team",
          },
        ],
      },
      {
        kind: "bridge",
        id: "ponte",
        title: "Do padrão à solução",
        paragraphs: [
          "Boa parte da triagem é o mesmo movimento: cruzar o relato com o requisito certo. O Oráculo nasceu para apoiar exatamente esse movimento.",
        ],
        ref: { case: "oraculo" },
        cta: "Ler o caso do Oráculo",
      },
      {
        kind: "text",
        id: "aprendizados",
        title: "Aprendizados",
        paragraphs: [],
        pending: "Aprendizados do projeto, na sua voz.",
      },
    ],
  },
  {
    slug: "oraculo",
    index: "03",
    title: "Oráculo de Triagem",
    chapter: "Conhecimento disperso, decisão apoiada",
    problemType: "Aplicar IA a um problema real",
    question: "Como encontrar a regra certa para cada chamado e mostrar de onde ela veio?",
    summary:
      "Identifiquei um gargalo na triagem de chamados do CultBR e concebi e construí uma solução com RAG e busca híbrida. Ela recupera os requisitos aplicáveis, confronta com o relato e sugere uma classificação, sempre com a fonte e sempre validada por uma pessoa.",
    tag: "IA aplicada",
    emphasis: ["negocio", "tecnologia", "produto"],
    highlight: { value: "RAG", label: "busca híbrida e classificação com fonte" },
    seoDescription:
      "Estudo de caso: Oráculo, solução de triagem de chamados com RAG e busca híbrida. Classificação com evidências, tratamento de incerteza e validação humana.",
    meta: [
      { label: "Papel", value: "Concepção e desenvolvimento" },
      { label: "Contexto", value: "Sustentação do CultBR · NEES/UFAL" },
      { label: "Período", value: "2026" },
      { label: "Estágio", value: "Protótipo funcional" },
    ],
    sections: [
      {
        kind: "text",
        id: "problema",
        title: "O problema",
        paragraphs: [
          "A resposta para a maioria dos chamados está em algum lugar da documentação. O difícil é encontrá-la. Os requisitos estão espalhados, e o usuário descreve o problema com as palavras dele, não com as do documento.",
          "Quem faz a triagem precisa construir essa ponte chamado após chamado: entender o relato, achar a regra que se aplica e decidir o que aquilo é.",
        ],
      },
      {
        kind: "text",
        id: "abordagem",
        title: "Por que não bastava um chatbot",
        paragraphs: [
          "Um modelo de linguagem sozinho responderia com fluência, mas sem nenhuma garantia de que a resposta vem das regras do CultBR. Para triagem, uma resposta convincente e sem fonte é pior do que nenhuma.",
          "O problema pedia outra coisa: encontrar o trecho certo da documentação e raciocinar a partir dele. Por isso a solução usa recuperação aumentada (RAG). O modelo só trabalha sobre evidências recuperadas, e toda resposta aponta para elas.",
        ],
      },
      {
        kind: "walkthrough",
        id: "como-funciona",
        title: "Como uma triagem acontece",
        intro: "Avance pelas etapas para ver o caminho de um chamado, do relato à validação.",
        disclaimer: "Simulação ilustrativa. O chamado e os trechos são fictícios e não reproduzem dados reais.",
        steps: [
          {
            id: "relato",
            label: "Relato",
            title: "O chamado chega com as palavras do usuário",
            body: "Ninguém escreve 'não é possível selecionar a forma de execução'. A pessoa escreve que o campo está travado.",
            sample: { kind: "ticket", lines: ["“O campo da forma de execução está travado, não consigo mudar.”"] },
          },
          {
            id: "busca",
            label: "Busca híbrida",
            title: "Duas buscas, uma por palavra e outra por significado",
            body: "A busca lexical acerta termos e identificadores exatos. A semântica reconhece que 'travado' e 'não é possível selecionar' falam da mesma coisa.",
            sample: {
              kind: "search",
              lines: ["lexical → “forma de execução”", "semântica → “campo travado” ≈ “não é possível selecionar”"],
            },
          },
          {
            id: "evidencias",
            label: "Evidências",
            title: "Os trechos que importam, com a origem de cada um",
            body: "As duas buscas se combinam e trazem os requisitos mais relevantes. Cada trecho vem com o lugar de onde saiu.",
            sample: {
              kind: "evidence",
              lines: [
                "Requisito (fictício): a forma de execução não pode ser alterada após o envio.",
                "Regra (fictícia): alterações exigem reabertura pela gestão.",
              ],
            },
          },
          {
            id: "sugestao",
            label: "Sugestão",
            title: "Uma classificação, com justificativa e fonte",
            body: "O relato é confrontado com o comportamento esperado. Se a evidência é fraca ou conflitante, a análise se aprofunda antes de sugerir, ou o sistema admite que não sabe.",
            sample: {
              kind: "suggestion",
              lines: ["Sugestão: comportamento esperado", "Motivo: o bloqueio está previsto após o envio", "Fontes: 2 trechos"],
            },
          },
          {
            id: "validacao",
            label: "Validação",
            title: "Uma pessoa decide",
            body: "A sugestão é ponto de partida. O Oráculo não fecha chamados, não altera código e não muda status. Quem responde pelo atendimento confirma ou corrige.",
            sample: { kind: "human", lines: ["Validação humana obrigatória", "Confirmar · Corrigir"] },
          },
        ],
      },
      {
        kind: "decisions",
        id: "decisoes",
        title: "Decisões de produto e de engenharia",
        intro: "As escolhas que deram forma à solução, e o que cada uma resolve.",
        items: [
          {
            title: "Sugerir, não decidir",
            context: "A triagem tem consequência para quem abriu o chamado e para o time que responde.",
            question: "Quem tem a palavra final?",
            choice:
              "Toda resposta é uma sugestão que passa por validação humana. O sistema não fecha chamado, não altera código e não muda status.",
            outcome: "A ferramenta acelera a análise sem tirar a responsabilidade de quem responde pelo atendimento.",
          },
          {
            title: "Nenhuma classificação sem fonte",
            context: "Uma classificação sem origem obriga a pessoa a refazer a investigação para poder confiar nela.",
            question: "Como confiar no que o sistema sugere?",
            choice: "Cada classificação vem acompanhada dos trechos da documentação que a sustentam.",
            outcome: "Quem valida confere a evidência em vez de repetir a busca.",
          },
          {
            title: "Busca híbrida",
            context:
              "Chamados usam o vocabulário do usuário e requisitos usam o do documento. Às vezes, o que importa é um identificador exato.",
            question: "Buscar por palavra ou por significado?",
            alternatives: [
              "Só busca lexical: precisa em termos exatos, mas cega a sinônimos e paráfrases.",
              "Só busca semântica: entende paráfrases, mas pode deixar escapar identificadores exatos.",
            ],
            choice: "As duas, combinadas. Usar uma só perde os casos que a outra encontra.",
            outcome:
              "'Campo travado' encontra 'não é possível selecionar', e um identificador de requisito continua sendo encontrado pelo nome exato.",
          },
          {
            title: "Profundidade sob demanda",
            context: "Nem todo chamado precisa do mesmo nível de análise.",
            question: "Quanto esforço cada chamado merece?",
            choice:
              "Regras simples resolvem o óbvio. Uma triagem classifica com base nas evidências. A análise só se aprofunda quando o resultado sai incerto, e continua de onde parou em vez de recomeçar.",
            outcome: "O esforço, e o custo, ficam com os casos difíceis.",
          },
          {
            title: "Admitir incerteza",
            context: "Nem toda pergunta tem resposta clara na documentação.",
            question: "O que fazer quando a documentação não responde?",
            choice:
              "O sistema pode dizer que o requisito é ambíguo, que faltam dados ou que o caso é inconclusivo, em vez de forçar uma resposta.",
            outcome: "Na triagem, um 'não sei' bem fundamentado vale mais do que um palpite confiante.",
          },
          {
            title: "Chamado é dado, não instrução",
            context: "O texto de um chamado pode ser escrito por qualquer pessoa e chega até o modelo.",
            question: "Como evitar que um relato mude o comportamento da ferramenta?",
            choice: "O conteúdo do chamado e da documentação é tratado sempre como dado, nunca como instrução.",
            outcome: "A triagem continua previsível, seja qual for o texto que chega.",
          },
        ],
      },
      {
        kind: "split",
        id: "contribuicao",
        title: "Contribuição",
        mine: [
          "Identifiquei o problema operacional na rotina de sustentação.",
          "Concebi a solução e defini a abordagem: RAG, busca híbrida, classificação com evidências e validação humana.",
          "Desenvolvi o protótipo funcional, da preparação da documentação à interface de uso.",
          "Tratei rastreabilidade, incerteza e segurança como requisitos desde o início.",
        ],
        team: [
          "A documentação de requisitos do CultBR, construída pelo time ao longo do projeto, que é a base de conhecimento do Oráculo.",
          "O acesso a modelos de IA pela infraestrutura do NEES.",
        ],
      },
      {
        kind: "results",
        id: "resultados",
        title: "Resultados",
        items: [
          {
            label: "Parte da triagem automatizada",
            note: "A recuperação e a primeira classificação deixam de ser manuais. A decisão continua humana.",
            scope: "individual",
          },
          {
            label: "Rastreabilidade em toda resposta",
            note: "Cada sugestão aponta para os trechos que a sustentam.",
            scope: "individual",
          },
          {
            label: "Incerteza explícita",
            note: "Quando a documentação não basta, o sistema diz isso em vez de inventar.",
            scope: "individual",
          },
          {
            label: "Métricas de avaliação",
            note: "",
            scope: "individual",
            pending: "Se houver avaliação formal (acurácia, tempo de triagem), informe os números e a metodologia.",
          },
        ],
        footnote: "Não são apresentadas métricas de acurácia ou de redução de tempo sem avaliação formal.",
      },
      {
        kind: "text",
        id: "status",
        title: "Situação atual",
        paragraphs: [],
        pending: "Status de uso (protótipo ou em uso pela central) e autorização para nome público, diagrama e mascote.",
      },
      {
        kind: "text",
        id: "aprendizados",
        title: "Aprendizados",
        paragraphs: [],
        pending: "Aprendizados do projeto, na sua voz.",
      },
    ],
  },
];
