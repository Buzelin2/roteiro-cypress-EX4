// cypress/e2e/spec.cy.js

describe('TODOMvc App', () => {
  // 1) apenas checa se a página está servida sem erros
  it('Verifica se app está abrindo', () => {
    // baseUrl já está configurado para 'http://localhost:7001'
    cy.visit('/');
    // Confirma que o campo de input existe
    cy.get('[data-cy=todo-input]').should('exist');
  });

  // 2) insere uma nova tarefa e verifica se ela aparece na lista
  it('Insere uma tarefa', () => {
    cy.visit('/');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    // A lista de tarefas deve ter exatamente 1 item
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software');
  });

  // 3) insere e depois deleta essa tarefa, conferindo que a lista fica vazia
  it('Insere e deleta uma tarefa', () => {
    cy.visit('/');

    // inserir
    cy.get('[data-cy=todo-input]')
      .type('Tarefa a ser removida{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    // o botão de remoção só aparece quando o item é hoverable, então forçamos a visibilidade
    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    // agora a lista deve estar vazia
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  // 4) insere duas tarefas, marca a primeira como concluída, e verifica os filtros:
  //    - apenas completas
  //    - apenas ativas
  //    - todas
  it('Filtra tarefas completas, ativas e todas', () => {
    cy.visit('/');

    // inserir duas tarefas distintas
    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    // confere que existem 2 itens agora
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);

    // marca a primeira como "completed" (checkbox)
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .check(); // Check marca como concluído

    // 4.1) filtra apenas as tarefas completadas
    cy.get('[data-cy=filter-completed-link]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    // 4.2) filtra apenas as tarefas ativas (não concluídas)
    cy.get('[data-cy=filter-active-link]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    // 4.3) volta a listar todas as tarefas
    cy.get('[data-cy=filter-all-link]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
});
