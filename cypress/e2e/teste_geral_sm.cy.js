describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://sm-hkm.docker.local:8080')

    cy.get('input[name="username"]').type('administrador')

    cy.get('input[name="password"]').type('789123')

    cy.get('button[type="submit"]').click()
  })
})
