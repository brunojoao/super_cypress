describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://sm-hkm.docker.local:8080')

    cy.get('input[name="username"]').type('administrador')

    cy.get('input[name="password"]').type('789123')

    cy.get('button[type="submit"]').click()

    cy.wait(3000)

    cy.get('div.modal-close').then(($modal) => {
      if ($modal.length) {
        cy.wrap($modal).click()
      }
    })

    cy.get('ul.side-menu li')
      .find('i.fa-file-text-o')
      .parents('li')
      .click()
  })
})
